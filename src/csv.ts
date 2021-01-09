import parse from "csv-parse";
import fs from "fs";
import path from "path";

import {byScore} from "./sort";
import {
  Company,
  CompanyIndex,
  CompanyKind,
  CompanyRank,
  CsvRecord,
  Element,
  ElementValue,
  IndexYear,
  Indicator,
  IndicatorCategory,
  IndicatorCompanyScore,
  IndicatorIndex,
  IndicatorIndexElement,
  IndicatorNested,
  IndicatorScore,
  Scores,
} from "./types";
import {
  floatOrNA,
  isIndicatorFamily,
  mapBoolean,
  mapCategory,
  mapCompanyKind,
  mapCompanyKindOrNil,
  mapElementValue,
  memoizeAsync,
  stringOrNil,
  unreachable,
} from "./utils";

type CsvTotal = {
  index: IndexYear;
  company: string;
  score: IndicatorScore;
};

type CsvCategory = {
  index: IndexYear;
  company: string;
  category: IndicatorCategory;
  score: IndicatorScore;
};

type CsvIndicator = {
  index: IndexYear;
  company: string;
  category: IndicatorCategory;
  indicator: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: IndicatorScore;
  label: string;
  description: string;
  isFamilyMember: boolean;
  indicatorFamily: string;
};

type CsvLevel = {
  index: IndexYear;
  company: string;
  category: IndicatorCategory;
  indicator: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: IndicatorScore;
  kind: string;
  service: string;
};

type CsvElement = {
  index: IndexYear;
  company: string;
  category: IndicatorCategory;
  indicator: string;
  element: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  elementNr: number;
  score: IndicatorScore;
  value: ElementValue;
  kind: string;
  service: string;
};

type CsvCompanySpec = {
  company: string;
  companyPretty: string;
  kind: CompanyKind;
  country: string;
};

type CsvIndicatorSpec = {
  category: IndicatorCategory;
  indicator: string;
  display: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  label: string;
  description: string;
  guidance: string;
  isParent: boolean;
};

type CsvElementSpec = {
  category: IndicatorCategory;
  indicator: string;
  element: string;
  indicatorNr: number;
  elementNr: number;
  label: string;
  description: string;
  excludedCompanyKind?: CompanyKind;
};

type CsvIndicatorExclude = {
  indicatorId: string;
  exclude: CompanyKind;
};

/*
 * The years we include in the data extraction.
 */
const indexYears: Set<IndexYear> = new Set(["2020"]);

/* A helper function to extract and map indicators for one category
 * from a list of indicators. This is used by the loadData function.
 */
const categoryIndicators = (
  csvIndicators: CsvIndicator[],
  specs: CsvIndicatorSpec[],
): IndicatorNested[] => {
  const iterator = (
    indicators: CsvIndicator[],
    skipFamilyMembers: boolean,
  ): IndicatorNested[] => {
    return indicators
      .sort((a, b) => {
        if (a.indicator < b.indicator) return -1;
        if (a.indicator > b.indicator) return 1;
        return 0;
      })
      .filter(({isFamilyMember}) => skipFamilyMembers === isFamilyMember)
      .map((indicator) => {
        const {label, description, guidance, display} =
          specs.find((r) => r.indicator === indicator.indicator) ||
          unreachable(`Indicator ${indicator.indicator} not found in specs.`);

        const familyMembers = csvIndicators.filter(
          ({isFamilyMember, indicatorFamily}) =>
            indicatorFamily === indicator.indicator && isFamilyMember,
        );

        const score: IndicatorScore =
          indicator.score === "NA" ? "NA" : indicator.score;

        return {
          category: indicator.category,
          indicator: indicator.indicator,
          indicatorNr: indicator.indicatorNr,
          score,
          label,
          description,
          guidance,
          display,
          familyMembers: iterator(familyMembers, true),
          ...(indicator.indicatorSuffix
            ? {indicatorSuffix: indicator.indicatorSuffix}
            : undefined),
        };
      });
  };

  return iterator(csvIndicators, false);
};

/*
 * Load Records from a CSV file and map them to a useful type.
 */
const loadCsv = <T extends Record<string, unknown>>(
  mapper: (record: CsvRecord) => T,
): ((f: string) => Promise<T[]>) => async (file: string): Promise<T[]> => {
  const data: T[] = [];

  const source = fs.createReadStream(path.join(process.cwd(), file));

  const parser = parse({columns: true});

  parser.on("readable", () => {
    let record;
    // eslint-disable-next-line no-cond-assign
    while ((record = parser.read())) {
      data.push(mapper(record));
    }
  });

  return new Promise((resolve, reject) => {
    parser.on("error", reject);
    parser.on("end", () => resolve(data));
    source.pipe(parser);
  });
};

/*
 * Load the scores for every company from a CSV.
 */
const loadTotalsCsv = loadCsv<CsvTotal>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  score: floatOrNA(record.Score),
}));

/*
 * Load the scores for every category and each company from a CSV.
 */
const loadCategoriesCsv = loadCsv<CsvCategory>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  category: mapCategory(record.Category),
  score: floatOrNA(record.Score),
}));

/*
 * Load the scores for every indicator for each category and company from a CSV.
 */
const loadIndicatorsCsv = loadCsv<CsvIndicator>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  category: mapCategory(record.Category),
  indicator: record.Indicator,
  indicatorNr: Number.parseInt(record.IndicatorNr, 10),
  indicatorSuffix: stringOrNil(record.IndicatorSuffix),
  score: floatOrNA(record.Score),
  label: record.labelLong,
  description: record.description,
  isFamilyMember: isIndicatorFamily(record.isSubindicator),
  indicatorFamily: record.IndicatorFam,
}));

/*
 * Load the all elements for each company and indicator from a CSV.
 */
const loadLevelsCsv = loadCsv<CsvLevel>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  category: mapCategory(record.Category),
  indicator: record.Indicator,
  indicatorNr: Number.parseInt(record.IndicatorNr, 10),
  indicatorSuffix: stringOrNil(record.IndicatorSuffix),
  score: floatOrNA(record.Score),
  kind: record.Class,
  service: record.Service,
}));

/*
 * Load the all elements for each company and indicator from a CSV.
 */
const loadElementsCsv = loadCsv<CsvElement>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  category: mapCategory(record.Category),
  indicator: record.Indicator,
  element: record.Element,
  indicatorNr: Number.parseInt(record.IndicatorNr, 10),
  indicatorSuffix: stringOrNil(record.IndicatorSuffix),
  elementNr: Number.parseInt(record.ElemNr, 10),
  score: floatOrNA(record.Score),
  value: mapElementValue(record.Value),
  kind: record.Class,
  service: record.Service,
}));

/*
 * Load the company specs.
 */
const loadCompanySpecsCsv = loadCsv<CsvCompanySpec>((record) => ({
  company: record.companyClean,
  companyPretty: record.company,
  kind: record.maintype === "platforms" ? "internet" : "telecom",
  country: record.country,
}));

/*
 * Load the indicator specs.
 */
const loadIndicatorSpecsCsv = loadCsv<CsvIndicatorSpec>((record) => ({
  category: mapCategory(record.Category),
  indicator: record.Indicator,
  display: record.labelShort,
  indicatorNr: Number.parseInt(record.indicatorNr, 10),
  indicatorSuffix: stringOrNil(record.indicatorSuffix),
  label: record.labelLong,
  description: record.description,
  guidance: record.guidance,
  isParent: mapBoolean(record.isParent),
}));

/*
 * Load the elements specs.
 */
const loadElementSpecsCsv = loadCsv<CsvElementSpec>((record) => ({
  category: mapCategory(record.Category),
  indicator: record.Indicator,
  element: record.Element,
  indicatorNr: Number.parseInt(record.indicatorNr, 10),
  elementNr: Number.parseInt(record.elemNr, 10),
  label: record.labelShort,
  description: record.description,
  excludedCompanies: mapCompanyKindOrNil(record.excludedCompanies),
}));

/*
 * Load a list of excluded company kinds for an indicator.
 */
const loadIndicatorExcludesCsv = loadCsv<CsvIndicatorExclude>((record) => ({
  indicatorId: record.Indicator,
  exclude: mapCompanyKind(record.exclude),
}));

/*
 * Generate a complete list of all available companies.
 */
export const companies = memoizeAsync(
  async (): Promise<Company[]> => {
    const csvCompanySpecs = await loadCompanySpecsCsv(
      "csv/2020-company-specs.csv",
    );
    return csvCompanySpecs.map(({company: id, companyPretty: name, kind}) => ({
      id,
      name,
      kind,
    }));
  },
);

/*
 * Generate a complete list of all indicators.
 */
export const indicators = memoizeAsync(
  async (): Promise<Indicator[]> => {
    const [csvIndicators, csvExcludes] = await Promise.all([
      loadIndicatorSpecsCsv("csv/2020-indicator-specs.csv"),
      loadIndicatorExcludesCsv("csv/2020-indicator-excludes.csv"),
    ]);

    return csvIndicators.map(
      ({
        indicator,
        display,
        category,
        indicatorNr,
        indicatorSuffix,
        label,
        description,
        guidance,
        isParent,
      }) => {
        let parent;

        // If there is a suffix defined we have a child indicator. Let's find
        // the parent.
        if (indicatorSuffix) {
          const parentIndicator = csvIndicators.find((row) => {
            return (
              row.isParent &&
              row.indicatorNr === indicatorNr &&
              row.category === category
            );
          });
          if (!parentIndicator)
            return unreachable(`Unable to find parent for ${display}.`);
          parent = parentIndicator.indicator;
        }

        const isExcluded = csvExcludes.find(
          ({indicatorId}) => indicatorId === indicator,
        );

        return {
          id: indicator,
          name: display,
          exclude: isExcluded?.exclude,
          category,
          isParent,
          parent,
          label,
          description,
          guidance,
        };
      },
    );
  },
);

/*
 * Generate a complete list of all elements.
 */
export const elements = memoizeAsync(
  async (): Promise<Element[]> => {
    const csvElements = await loadElementSpecsCsv("csv/2020-element-specs.csv");

    return csvElements.map(
      ({
        element,
        label,
        elementNr,
        category,
        indicator,
        description,
        excludedCompanyKind,
      }) => {
        const isTelecom = excludedCompanyKind !== "telecom";
        const isPlatform = excludedCompanyKind !== "internet";

        return {
          id: element,
          name: label,
          position: elementNr,
          indicatorId: indicator,
          category,
          description,
          isTelecom,
          isPlatform,
        };
      },
    );
  },
);

/*
 * List all companies for a single indicator.
 */
export const indicatorCompanies = memoizeAsync(
  async (indicatorId: string): Promise<Company[]> => {
    const [allCompanies, allIndicators] = await Promise.all([
      companies(),
      indicators(),
    ]);

    const indicator = allIndicators.find(({id}) => id === indicatorId);
    if (!indicator)
      return unreachable(
        `Indicator ${indicatorId} not found while listing the companies for the indicator.`,
      );

    return allCompanies.filter(({kind}) => indicator.exclude !== kind);
  },
);

/*
 * Generate scoring list for one indicator and one company kind.
 */
export const indicatorScores = memoizeAsync(
  async (indicatorId: string): Promise<IndicatorCompanyScore[]> => {
    const [allCompanies, csvIndicators] = await Promise.all([
      indicatorCompanies(indicatorId),
      loadIndicatorsCsv("csv/2020-indicators.csv"),
    ]);

    return allCompanies
      .map(({id, kind}) => {
        const indicator = csvIndicators
          .filter((i) => indexYears.has(i.index))
          .find((i) => i.company === id && i.indicator === indicatorId);

        if (!indicator) {
          return unreachable(
            `Indicator company score ${indicatorId} not found for ${id}`,
          );
        }

        return {id, kind, score: indicator.score};
      })
      .sort(byScore("desc"));
  },
);

/*
 * Load the source data and construct the company index for 2020. This
 * function is called to populate the website pages.
 */
export const companyIndices = memoizeAsync(
  async (): Promise<CompanyIndex[]> => {
    const [
      csvTotals,
      csvCategories,
      csvIndicators,
      csvCompanySpecs,
      csvIndicatorSpecs,
    ] = await Promise.all([
      loadTotalsCsv("csv/2020-totals.csv"),
      loadCategoriesCsv("csv/2020-categories.csv"),
      loadIndicatorsCsv("csv/2020-indicators.csv"),
      loadCompanySpecsCsv("csv/2020-company-specs.csv"),
      loadIndicatorSpecsCsv("csv/2020-indicator-specs.csv"),
    ]);

    // We increment the rank counters further below to set a rank based on
    // the company kind.
    let telecomRank = 0;
    let internetRank = 0;

    return (
      csvTotals
        .filter((total) => total.score && indexYears.has(total.index))
        .map((total) => {
          const companySpec =
            csvCompanySpecs.find((r) => r.company === total.company) ||
            unreachable(`Company ${total.company} not found in specs.`);

          const companyCategories = csvCategories.filter(
            (category) =>
              category.company === total.company &&
              indexYears.has(category.index),
          );
          const companyIndicators = csvIndicators.filter(
            (indicator) =>
              indicator.company === total.company &&
              indexYears.has(indicator.index),
          );

          const scores: Scores = companyCategories.reduce(
            (memo, category) =>
              category.score === undefined
                ? memo
                : Object.assign(memo, {[category.category]: category.score}),
            {
              total: total.score,
              governance: 0,
              freedom: 0,
              privacy: 0,
            } as Scores,
          );

          const governanceIndicators: IndicatorNested[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) => indicator.category === "governance",
            ),
            csvIndicatorSpecs,
          );
          const freedomIndicators: IndicatorNested[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) => indicator.category === "freedom",
            ),
            csvIndicatorSpecs,
          );
          const privacyIndicators: IndicatorNested[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) => indicator.category === "privacy",
            ),
            csvIndicatorSpecs,
          );

          return {
            id: companySpec.company,
            index: total.index,
            companyPretty: companySpec.companyPretty,
            rank: -1, // We set the real rank further below
            kind: companySpec.kind,
            scores,
            indicators: {
              governance: governanceIndicators,
              freedom: freedomIndicators,
              privacy: privacyIndicators,
            },
          };
        })
        // Set the real rank of the company after we sorted the
        // companies by score.
        .sort((a, b) => {
          if (a.scores.total < b.scores.total) return 1;
          if (a.scores.total > b.scores.total) return -1;
          return 0;
        })
        .map((company) => {
          switch (company.kind) {
            case "telecom": {
              telecomRank += 1;
              return Object.assign(company, {rank: telecomRank});
            }
            case "internet": {
              internetRank += 1;
              return Object.assign(company, {rank: internetRank});
            }
            default: {
              return unreachable(`No suitable rank found for ${company.id}`);
            }
          }
        })
    );
  },
);

/*
 * Depending on the indicator we have to include different elements for an
 * indicator.
 */
const isValidElement = (element: CsvElement): boolean => {
  // Indicators G1 and G5 only have elements of Group and OpCom (Company).
  if (["G01", "G05"].includes(element.indicator))
    return ["OpCom", "Group"].includes(element.service);

  // Indicators G2, G3 and G4x have services and Group and OpCom (Full).
  if (
    element.category === "governance" &&
    [2, 3, 4].includes(element.indicatorNr)
  )
    return true;

  // All F and P indicators, and G6x only have service elements (Services).
  return !["OpCom", "Group"].includes(element.service);
};

/*
 * Load the source data and construct the indicator index for 2020. This
 * function is called to populate the website pages.
 */
export const indicatorIndices = memoizeAsync(
  async (): Promise<IndicatorIndex[]> => {
    const [
      csvLevels,
      csvElements,
      csvIndicatorSpecs,
      csvElementSpecs,
      // allIndicators,
      allCompanies,
    ] = await Promise.all([
      loadLevelsCsv("csv/2020-levels.csv"),
      loadElementsCsv("csv/2020-elements.csv"),
      loadIndicatorSpecsCsv("csv/2020-indicator-specs.csv"),
      loadElementSpecsCsv("csv/2020-element-specs.csv"),
      // indicators(),
      companies(),
    ]);

    return csvIndicatorSpecs.map((spec) => {
      const indexElements: IndicatorIndexElement[] = csvElements
        .filter(
          (element) =>
            element.indicator === spec.indicator &&
            indexYears.has(element.index) &&
            isValidElement(element),
        )
        .map(({element, company: companyId, score, value, kind, service}) => {
          const {category, elementNr, label, description} =
            csvElementSpecs.find((e) => e.element === element) ||
            unreachable(`Element ${element} not found in element specs.`);
          return {
            id: element,
            element,
            elementNr,
            category,
            label,
            description,
            score,
            value,
            kind,
            service,
            companyId,
          };
        });

      // Filter out companies that have no elements for this indicator.
      const companyIds = allCompanies
        .filter(({id}) => {
          return !!indexElements.find(({companyId}) => id === companyId);
        })
        .map(({id}) => id);

      const services = companyIds.reduce(
        (memo, company) => ({
          [company]: [
            ...indexElements
              .filter((element) => element.companyId === company)
              .reduce((agg, {service}) => agg.add(service), new Set<string>()),
          ],
          ...memo,
        }),
        {} as Record<string, string[]>,
      );

      const averages = companyIds.reduce((memo, company) => {
        const companyAverages = (services[company] || []).reduce(
          (agg, service) => {
            const levels = csvLevels.find(
              (l) =>
                l.company === company &&
                l.service === service &&
                l.indicator === spec.indicator &&
                indexYears.has(l.index),
            );
            if (!levels)
              return unreachable(
                `No level found for ${company}/${service}/${spec.indicator}.`,
              );

            return {[service]: levels.score, ...agg};
          },
          {} as Record<string, IndicatorScore>,
        );
        return {[company]: companyAverages, ...memo};
      }, {} as Record<string, Record<string, IndicatorScore>>);

      const sortedElements = companyIds.reduce((memo, company) => {
        if (!services[company]) return memo;

        return {
          [company]: services[company].reduce(
            (agg, service) => ({
              [service]: indexElements
                .filter(
                  (element) =>
                    element.companyId === company &&
                    element.service === service,
                )
                .sort((a, b) => {
                  if (a.elementNr < b.elementNr) return -1;
                  if (a.elementNr > b.elementNr) return 1;
                  return 0;
                }),
              ...agg,
            }),
            {} as Record<string, IndicatorIndexElement[]>,
          ),
          ...memo,
        };
      }, {} as Record<string, Record<string, IndicatorIndexElement[]>>);

      return {
        id: spec.display,
        indicator: spec.indicator,
        category: spec.category,
        label: spec.label,
        description: spec.description,
        guidance: spec.guidance,
        isParent: spec.isParent,
        hasParent: /[a-z]+$/.test(spec.indicator),
        services,
        averages,
        elements: sortedElements,
      };
    });
  },
);

export const companyRanking = async (
  companyKind: CompanyKind,
): Promise<CompanyRank[]> => {
  const index = await companyIndices();

  return index
    .filter(({kind}) => kind === companyKind)
    .map(({id, companyPretty, kind, scores}) => {
      return {id, companyPretty, kind, score: scores.total};
    })
    .sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
};
