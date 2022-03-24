import cheerio from "cheerio";
import parse from "csv-parse";
import fs, {promises as fsP} from "fs";
import path from "path";

import {byCompany, byRankAndName, byScore, byTopic} from "./sort";
import {
  Company,
  CompanyIndex,
  CompanyKind,
  CompanyMeta,
  CompanyRank,
  CompanyScoreDiff,
  CompanyYear,
  CsvRecord,
  Element,
  ElementValue,
  Glossary,
  IndexYear,
  Indicator,
  IndicatorAverage,
  IndicatorAverages,
  IndicatorCategory,
  IndicatorCategoryExt,
  IndicatorCompanyScore,
  IndicatorDetails,
  IndicatorElement,
  IndicatorElements,
  IndicatorIndex,
  IndicatorIndexElement,
  IndicatorNested,
  IndicatorScore,
  IndicatorTopic,
  IndicatorTopicCompanyIndex,
  IndicatorTopicIndex,
  Scores,
  Service,
  ServiceCompanyRank,
  ServiceKind,
} from "./types";
import {
  floatOrNA,
  isIndicatorFamily,
  isValidService,
  mapBoolean,
  mapCategory,
  mapCompanyKind,
  mapCompanyKindOrNil,
  mapElementValue,
  mapExtCategory,
  mapIndicatorTopic,
  mapServiceKind,
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
  region: string;
  brand?: string;
};

type CsvCompanyMeta = {
  company: string;
  researchers: string;
  website: string;
  marketCap: string;
  marketCapDate: string;
  exchange: string;
  stockSymbol: string;
  operatingCompany?: string;
};

type CsvServiceSpec = {
  company: string;
  companyPretty: string;
  kind: ServiceKind;
  service: string;
  label: string;
};

type CsvServiceKind = {
  kind: ServiceKind;
  service: string;
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

type CsvCompanyRank = {
  company: string;
  rank: number;
  governanceRank: number;
  freedomRank: number;
  privacyRank: number;
};

type CsvYearOverYear = {
  company: string;
  category: IndicatorCategoryExt;
  diff2017: IndicatorScore;
  diff2018: IndicatorScore;
  diff2019: IndicatorScore;
  diff2020: IndicatorScore;
  diff2022: IndicatorScore;
};

type CsvCompanyServiceRank = {
  company: string;
  kind: ServiceKind;
  service: string;
  total: IndicatorScore;
  governance: IndicatorScore;
  freedom: IndicatorScore;
  privacy: IndicatorScore;
  totalRank: number;
  governanceRank: number;
  freedomRank: number;
  privacyRank: number;
};

type CsvIndicatorTopic = {
  company: string;
  topic: IndicatorTopic;
  topicName: string;
  score: number;
};

/*
 * The years we include in the data extraction.
 */
const indexYears: Set<IndexYear> = new Set(["2022"]);

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
  region: record.region,
  brand: stringOrNil(record.serviceBrand),
}));

/*
 * Load the company meta data.
 */
const loadCompanyMetaCsv = loadCsv<CsvCompanyMeta>((record) => ({
  company: record.Company,
  researchers: record.LeadResearchers,
  operatingCompany: stringOrNil(record.OperatingCompanyEvaluated),
  website: record.Website,
  marketCap: record.MarketCap,
  marketCapDate: record.MarketCapDate,
  exchange: record.Exchange,
  stockSymbol: record.StockSymbol,
}));

/*
 * Load the service specs.
 */
const loadServiceSpecsCsv = loadCsv<CsvServiceSpec>((record) => ({
  company: record.CompanyClean,
  companyPretty: record.Company,
  kind: mapServiceKind(record.Class),
  service: record.Label,
  label: record.LabelShort,
}));

/*
 * Load the service kind mapping.
 */
const loadServiceKindsCsv = loadCsv<CsvServiceKind>((record) => ({
  kind: mapServiceKind(record.ServiceType),
  service: record.ServiceLabel,
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
 * Load the rankings for each company.
 */
export const loadCompanyRanksCsv = loadCsv<CsvCompanyRank>((record) => ({
  company: record.Company,
  rank: Number.parseInt(record.Rank, 10),
  governanceRank: Number.parseInt(record.GovernanceRank, 10),
  freedomRank: Number.parseInt(record.FreedomRank, 10),
  privacyRank: Number.parseInt(record.PrivacyRank, 10),
}));

/*
 * Load the year over year score diffs.
 */
export const loadScoreDiffsCsv = loadCsv<CsvYearOverYear>((record) => ({
  company: record.Company,
  category: mapExtCategory(record.Scope),
  diff2017: floatOrNA(record["2017DiffAdjusted"]),
  diff2018: floatOrNA(record["2018DiffAdjusted"]),
  diff2019: floatOrNA(record["2019DiffAdjusted"]),
  diff2020: floatOrNA(record["2020DiffAdjusted"]),
  diff2022: floatOrNA(record["2020DiffAdjusted"]),
}));

/*
 * Load the service specs.
 */
const loadCompanyServiceRanksCsv = loadCsv<CsvCompanyServiceRank>((record) => ({
  company: record.Company,
  kind: mapServiceKind(record.ServiceType),
  service: record.Scope,
  total: floatOrNA(record.Total),
  governance: floatOrNA(record.Governance),
  freedom: floatOrNA(record.Freedom),
  privacy: floatOrNA(record.Privacy),
  totalRank: Number.parseInt(record.TotalRank, 10),
  governanceRank: Number.parseInt(record.GovernanceRank, 10),
  freedomRank: Number.parseInt(record.FreedomRank, 10),
  privacyRank: Number.parseInt(record.PrivacyRank, 10),
}));

/*
 * Load the Indicator Topics
 */
const loadIndicatorTopicsCsv = loadCsv<CsvIndicatorTopic>((record) => ({
  company: record.Company,
  topic: mapIndicatorTopic(record.IndicatorTopicId),
  topicName: record.IndicatorTopicName,
  score: Number.parseInt(record.Score, 10),
}));

/*
 * Generate a complete list of all available companies.
 */
export const companies = memoizeAsync(
  async (): Promise<Company[]> => {
    const csvCompanySpecs = await loadCompanySpecsCsv(
      "csv/2022-company-specs.csv",
    );
    return csvCompanySpecs.map(
      ({company: id, companyPretty: name, kind, brand}) => ({
        id,
        name,
        kind,
        brand,
      }),
    );
  },
);

/*
 * Generate the meta data about companies..
 */
export const companyMeta = memoizeAsync(
  async (company: string): Promise<CompanyMeta> => {
    const csvCompanyMeta = await loadCompanyMetaCsv(
      "csv/2022-company-meta.csv",
    );

    const {researchers, website, ...meta} =
      csvCompanyMeta.find((m) => m.company === company) ||
      unreachable(`Not meta data found for ${company}`);

    return {
      ...meta,
      website: website.replace(/\/$/, ""),
      researchers: researchers.split(",").map((s) => s.trim()),
    };
  },
);

/*
 * Generate a list of services.
 */
export const services = memoizeAsync(
  async (companyId?: string): Promise<Service[]> => {
    const [
      csvCompanySpecs,
      csvServiceSpecs,
      csvServiceKinds,
    ] = await Promise.all([
      loadCompanySpecsCsv("csv/2022-company-specs.csv"),
      loadServiceSpecsCsv("csv/2022-service-specs.csv"),
      loadServiceKindsCsv("csv/2022-service-kinds.csv"),
    ]);

    const serviceMaps = new Set([
      "Postpaid mobile",
      "Prepaid mobile",
      "Fixed-line broadband",
    ]);

    return csvServiceSpecs
      .filter(({company}) => (companyId ? company === companyId : true))
      .map(({company: companyName, kind, service: id, label: name}) => {
        if (kind === "Operating Company")
          return {
            id: "Operating Company",
            name: "Operating Company",
            kindName: "Operating Company",
            kind,
          };
        if (kind === "Group")
          return {id: "Group", name: "Group", kindName: "Group", kind};

        const company =
          csvCompanySpecs.find((spec) => spec.company === companyName) ||
          unreachable(
            `Failed to find company ${companyName} for service ${id}`,
          );

        const {service: kindName} =
          csvServiceKinds.find((row) => row.kind === kind) ||
          unreachable(`Failed to find service kind ${kind}`);

        return {
          id,
          kind,
          kindName,
          name:
            serviceMaps.has(name) && company.brand
              ? `${company.brand} (${name})`
              : name,
        };
      });
  },
);

/*
 * Generate a list of services for a company.
 */
export const companyServices = services;

/*
 * Generate a complete list of all indicators.
 */
export const indicators = memoizeAsync(
  async (): Promise<Indicator[]> => {
    const [csvIndicators, csvExcludes] = await Promise.all([
      loadIndicatorSpecsCsv("csv/2022-indicator-specs.csv"),
      loadIndicatorExcludesCsv("csv/2022-indicator-excludes.csv"),
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
    const csvElements = await loadElementSpecsCsv("csv/2022-element-specs.csv");

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
      loadIndicatorsCsv("csv/2022-indicators.csv"),
    ]);

    return allCompanies
      .map(({id, name: companyPretty, kind}) => {
        const indicator = csvIndicators
          .filter((i) => indexYears.has(i.index))
          .find((i) => i.company === id && i.indicator === indicatorId);

        if (!indicator) {
          return unreachable(
            `Indicator company score ${indicatorId} not found for ${id}`,
          );
        }

        return {id, companyPretty, kind, score: indicator.score};
      })
      .sort(byScore("desc"));
  },
);

/*
 * Generate elements for an indicator and company.
 */
const indicatorCompanyElements = async (
  indicatorId: string,
  companyId: string,
  companyKind: CompanyKind,
  allElements: Element[],
  csvElements: CsvElement[],
): Promise<Record<string, IndicatorElement[]>> => {
  const allServices = await companyServices(companyId);

  return allServices
    .filter((service) =>
      isValidService(service.id, indicatorId, companyId, companyKind),
    )
    .reduce((memo, {id: serviceId}) => {
      const indicatorElements: IndicatorElement[] = csvElements
        .filter((element) => {
          return (
            element.indicator === indicatorId &&
            element.company === companyId &&
            element.service === serviceId &&
            indexYears.has(element.index) &&
            isValidService(
              element.service,
              element.indicator,
              companyId,
              companyKind,
            )
          );
        })
        .map(({element, score, value}) => {
          const {position} =
            allElements.find((e) => e.id === element) ||
            unreachable(`Element ${element} not found in element specs.`);
          return {
            id: `${indicatorId}-${companyId}-${serviceId}-${element}`,
            name: element,
            position,
            score,
            value,
          };
        })
        .sort((a, b) => {
          if (a.position < b.position) return -1;
          if (a.position > b.position) return 1;
          return 0;
        });

      return {[serviceId]: indicatorElements, ...memo};
    }, {} as Record<string, IndicatorElement[]>);
};

/*
 * Generate elements for an indicator.
 */
export const indicatorElements = memoizeAsync(
  async (indicatorId: string): Promise<IndicatorElements> => {
    const [allCompanies, allElements, csvElements] = await Promise.all([
      indicatorCompanies(indicatorId),
      elements(),
      loadElementsCsv("csv/2022-elements.csv"),
    ]);

    return allCompanies.reduce(
      async (memo, {id: companyId, kind: companyKind}) => {
        const agg = await memo;

        const companyElements = await indicatorCompanyElements(
          indicatorId,
          companyId,
          companyKind,
          allElements,
          csvElements,
        );
        return {[companyId]: companyElements, ...agg};
      },
      Promise.resolve({}),
    );
  },
);

/*
 * Generate indicator averages for an indicator and for a service.
 */
export const indicatorAverages = memoizeAsync(
  async (indicatorId: string): Promise<IndicatorAverages> => {
    const [allCompanies, csvLevels] = await Promise.all([
      indicatorCompanies(indicatorId),
      loadLevelsCsv("csv/2022-levels.csv"),
    ]);

    return allCompanies.reduce(async (memo, {id: companyId}) => {
      const data = await memo;
      const allServices = await companyServices(companyId);

      const companyAverages = allServices.reduce((agg, {id: serviceId}) => {
        const levels = csvLevels.find(
          (l) =>
            l.company === companyId &&
            l.service === serviceId &&
            l.indicator === indicatorId &&
            indexYears.has(l.index),
        );
        // FIXME: I assume a missing level indicates that we deal with a parent
        // indicator, so let's skip it. Need to verify this though.
        if (!levels) return agg;

        return {[serviceId]: levels.score, ...agg};
      }, {} as IndicatorAverage);
      return {[companyId]: companyAverages, ...data};
    }, Promise.resolve({}));
  },
);

/*
 * Load the source data and construct the company index for 2022. This
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
      csvCompanyRanks,
      csvYearOverYear,
    ] = await Promise.all([
      loadTotalsCsv("csv/2022-totals.csv"),
      loadCategoriesCsv("csv/2022-categories.csv"),
      loadIndicatorsCsv("csv/2022-indicators.csv"),
      loadCompanySpecsCsv("csv/2022-company-specs.csv"),
      loadIndicatorSpecsCsv("csv/2022-indicator-specs.csv"),
      loadCompanyRanksCsv("csv/2022-rankings.csv"),
      loadScoreDiffsCsv("csv/2022-year-over-year.csv"),
    ]);

    return (
      csvTotals
        .filter((total) => total.score && indexYears.has(total.index))
        .map((total) => {
          const spec =
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
          const diffs = csvYearOverYear.filter(
            (diff) => diff.company === total.company,
          );

          const totalDiffs = {
            diff2017:
              diffs.find((d) => d.category === "total")?.diff2017 || "NA",
            diff2018:
              diffs.find((d) => d.category === "total")?.diff2018 || "NA",
            diff2019:
              diffs.find((d) => d.category === "total")?.diff2019 || "NA",
            diff2020:
              diffs.find((d) => d.category === "total")?.diff2020 || "NA",
            diff2022:
              diffs.find((d) => d.category === "total")?.diff2022 || "NA",
          };

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

          const {rank} = csvCompanyRanks.find(
            (companyRank) => companyRank.company === spec.company,
          ) || {rank: -1};

          return {
            id: spec.company,
            index: total.index,
            companyPretty: spec.companyPretty,
            kind: spec.kind,
            rank,
            scores,
            indicators: {
              governance: governanceIndicators,
              freedom: freedomIndicators,
              privacy: privacyIndicators,
            },
            totalDiffs,
          };
        })
        // Set the real rank of the company after we sorted the
        // companies by score.
        .sort((a, b) => {
          if (a.rank < b.rank) return 1;
          if (a.rank > b.rank) return -1;
          return 0;
        })
    );
  },
);

/*
 * Generate details for an indicator.
 */
export const indicatorDetails = memoizeAsync(
  async (indicatorId: string): Promise<IndicatorDetails> => {
    const csvIndicatorSpecs = await loadIndicatorSpecsCsv(
      "csv/2022-indicator-specs.csv",
    );

    const spec = csvIndicatorSpecs.find(
      ({indicator}) => indicator === indicatorId,
    );

    if (!spec) return unreachable(`No indicator spec found for ${indicatorId}`);

    return {
      id: spec.indicator,
      name: spec.display,
      category: spec.category,
      label: spec.label,
      description: spec.description,
      guidance: spec.guidance,
      isParent: spec.isParent,
      hasParent: /[a-z]+$/.test(spec.indicator),
    };
  },
);

/*
 * Generate full indicator indices. This is deprecated but still in use for the
 * storybook fixtures.
 */
export const indicatorIndices = memoizeAsync(
  async (): Promise<IndicatorIndex[]> => {
    const [
      csvIndicators,
      csvLevels,
      csvElements,
      csvIndicatorSpecs,
      csvElementSpecs,
      // allIndicators,
      allCompanies,
    ] = await Promise.all([
      loadIndicatorsCsv("csv/2022-indicators.csv"),
      loadLevelsCsv("csv/2022-levels.csv"),
      loadElementsCsv("csv/2022-elements.csv"),
      loadIndicatorSpecsCsv("csv/2022-indicator-specs.csv"),
      loadElementSpecsCsv("csv/2022-element-specs.csv"),
      // indicators(),
      companies(),
    ]);

    return csvIndicatorSpecs.map((spec) => {
      const indexElements: IndicatorIndexElement[] = csvElements
        .filter((element) => {
          // I'm not super happy about having to look for a company for every
          // element, but once I refactor the fixtures, this whole data
          // structure should go anyways.
          const company = allCompanies.find(({id}) => id === element.company);

          if (!company)
            return unreachable(
              `Company ${element.company} not found for element ${element.element}`,
            );

          return (
            element.indicator === spec.indicator &&
            indexYears.has(element.index) &&
            isValidService(
              element.service,
              element.indicator,
              element.company,
              company.kind,
            )
          );
        })
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

      const scores = companyIds.reduce((memo, company) => {
        const indicator = csvIndicators
          .filter((i) => indexYears.has(i.index))
          .find((i) => i.company === company && i.indicator === spec.indicator);
        return {[company]: indicator ? indicator.score : "NA", ...memo};
      }, {} as Record<string, IndicatorScore>);

      const allServices = companyIds.reduce(
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
        const companyAverages = (allServices[company] || []).reduce(
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
        if (!allServices[company]) return memo;

        return {
          [company]: allServices[company].reduce(
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
        companies: companyIds,
        services: allServices,
        scores,
        averages,
        elements: sortedElements,
      };
    });
  },
);

/*
 * Generate the sorted list of company rankings by company kind and indicator
 * category.
 */
export const companyRanking = async (
  companyKind: CompanyKind,
  category: IndicatorCategoryExt,
): Promise<CompanyRank[]> => {
  const [companyData, csvCompanyRanks] = await Promise.all([
    companyIndices(),
    loadCompanyRanksCsv("csv/2022-rankings.csv"),
  ]);

  return csvCompanyRanks
    .map((row) => {
      const {id, companyPretty, kind, scores} =
        companyData.find((r) => r.id === row.company) ||
        unreachable(`Company ${row.company} not found in company specs.`);

      let rank = -1;
      let score = -1;

      switch (category) {
        case "total": {
          rank = row.rank;
          score = scores.total;
          break;
        }
        case "governance": {
          rank = row.governanceRank;
          score = scores.governance;
          break;
        }
        case "freedom": {
          rank = row.freedomRank;
          score = scores.freedom;
          break;
        }
        case "privacy": {
          rank = row.privacyRank;
          score = scores.privacy;
          break;
        }
        default:
          return unreachable(`Category ${category} is unmappable.`);
      }

      return {
        id,
        companyPretty,
        score,
        rank,
        kind,
        category,
      };
    })
    .filter(({kind}) => kind === companyKind)
    .sort(byRankAndName("asc"));
};

/*
 * Generate a list of service rankings for each company kind, service kind and category.
 */
export const companyServiceRanking = async (
  serviceKind: ServiceKind,
  companyKind: CompanyKind,
  category: IndicatorCategoryExt,
): Promise<ServiceCompanyRank[]> => {
  const [companyData, csvCompanyServiceRanks] = await Promise.all([
    companyIndices(),
    loadCompanyServiceRanksCsv("csv/2022-service-rankings.csv"),
  ]);

  return csvCompanyServiceRanks
    .filter(({kind}) => kind === serviceKind)
    .map((row) => {
      const {id, companyPretty, kind} =
        companyData.find((r) => r.id === row.company) ||
        unreachable(`Company ${row.company} not found in company specs.`);

      let rank = -1;
      let score: IndicatorScore = -1;

      switch (category) {
        case "total": {
          rank = row.totalRank;
          score = row.total;
          break;
        }
        case "governance": {
          rank = row.governanceRank;
          score = row.governance;
          break;
        }
        case "freedom": {
          rank = row.freedomRank;
          score = row.freedom;
          break;
        }
        case "privacy": {
          rank = row.privacyRank;
          score = row.privacy;
          break;
        }
        default:
          return unreachable(`Category ${category} is unmappable.`);
      }

      return {
        id,
        companyPretty,
        service: row.service,
        score,
        rank,
        kind,
        category,
      };
    })
    .filter(({kind}) => kind === companyKind)
    .sort(byRankAndName("asc"));
};

/*
 * Generate the list of company diff scores for a year.
 */
export const companyDiffs = async (
  year: CompanyYear,
  category: IndicatorCategoryExt,
): Promise<CompanyScoreDiff[]> => {
  const [companyData, csvScoreDiffs] = await Promise.all([
    companies(),
    loadScoreDiffsCsv("csv/2022-year-over-year.csv"),
  ]);

  return (
    companyData
      .map(({id, name: company, kind}) => {
        const diff =
          csvScoreDiffs.find(
            (d) => d.company === id && d.category === category,
          ) ||
          unreachable(
            `Failed to load diff score for ${company}/${year}/${category}`,
          );

        return {
          id,
          company,
          kind,
          score: diff.diff2022,
        };
      })
      // sort descending
      .sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      })
  );
};

/*
 * Parse out the Glossary from HTML.
 */
export const glossary = async (): Promise<Glossary[]> => {
  const src = await fsP.readFile(
    path.join(process.cwd(), "csv/2022-glossary.html"),
  );
  const $ = cheerio.load(src);

  return $(".entry")
    .toArray()
    .map((el) => {
      const $el = $(el);
      const id =
        $("a", el).attr("id") ||
        unreachable(`Failed to extract id from glossary ${$el.html()}`);
      const title =
        $(".entry-tag", el).html() ||
        unreachable(`Failed to extract title from glossary ${$el.html()}`);
      const text =
        $(".entry-text p", el).html() ||
        unreachable(`Failed to extract text from glossary ${$el.html()}`);

      return {
        id,
        title: title
          .replace(/\r?\n|\r/g, "")
          .replace(/\s+/g, " ")
          .trim(),
        text: text
          .replace(/\r?\n|\r/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      };
    });
};

/*
 * Construct the indicator topic index.
 */
export const indicatorTopicIndex = async (): Promise<IndicatorTopicIndex[]> => {
  const indicatorTopicData = await loadIndicatorTopicsCsv(
    "csv/2022-indicator-topics.csv",
  );

  const indicatorTopics = indicatorTopicData.reduce(
    (memo, {topic, topicName: topicPretty, company, score}) => {
      // eslint-disable-next-line no-param-reassign
      if (!memo[topic]) memo[topic] = {topic, topicPretty, scores: []};
      memo[topic].scores.push({company, score});

      return memo;
    },
    {} as Record<IndicatorTopic, IndicatorTopicIndex>,
  );

  return Object.values(indicatorTopics)
    .map((indicatorTopic) => {
      indicatorTopic.scores.sort(byScore("desc"));
      return indicatorTopic;
    })
    .sort(byTopic("asc"));
};

/*
 * Construct the indicator topic company index.
 */
export const indicatorTopicCompanyIndex = async (): Promise<
  IndicatorTopicCompanyIndex[]
> => {
  const indicatorTopicData = await loadIndicatorTopicsCsv(
    "csv/2022-indicator-topics.csv",
  );

  const indicatorTopics = indicatorTopicData.reduce(
    (memo, {topic, topicName: topicPretty, company, score}) => {
      // eslint-disable-next-line no-param-reassign
      if (!memo[company]) memo[company] = {company, scores: []};
      memo[company].scores.push({topic, topicPretty, score});

      return memo;
    },
    {} as Record<string, IndicatorTopicCompanyIndex>,
  );

  return Object.values(indicatorTopics)
    .map((indicatorTopic) => {
      indicatorTopic.scores.sort(byTopic("asc"));
      return indicatorTopic;
    })
    .sort(byCompany("asc"));
};
