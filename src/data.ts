import slugify from "@sindresorhus/slugify";
import parse from "csv-parse";
import fs, {promises as fsP} from "fs";
import path from "path";

import {companyDetails as companyDetails2, processHtml} from "./formatter";
import {fetchDocumentHtml, getAuth, listFiles} from "./google";
import {
  CompanyDetails,
  CompanyIndex,
  CompanyKind,
  IndexYear,
  Indicator,
  ScoreCategory,
  Scores,
} from "./types";
import {memoizeAsync, unreachable} from "./utils";

type CsvRecord = Record<string, string>;

type CsvTotal = {
  index: IndexYear;
  company: string;
  score?: number;
};

type CsvCategory = {
  index: IndexYear;
  company: string;
  category: ScoreCategory;
  score?: number;
};

type CsvIndicator = {
  index: IndexYear;
  company: string;
  category: ScoreCategory;
  indicator: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score?: number;
  label: string;
  description: string;
  isFamilyMember: boolean;
  indicatorFamily: string;
};

type CsvCompanySpec = {
  company: string;
  companyPretty: string;
  kind: CompanyKind;
  country: string;
};

type CsvElementSpec = {
  category: ScoreCategory;
  indicator: string;
  element: string;
  indicatorNr: number;
  elementNr: number;
  label: string;
  description?: string;
};

/*
 * The years we include in the data extraction.
 */
const indexYears: Set<IndexYear> = new Set(["2020"]);

/*
 * The ID's of the Google Drive folders. Maybe move this into some
 * configuration file?
 */
const companiesFolder = "1aByjKhv9N9nNQBRNK1GVdraU0qorv7dX";

/*
 * Some utility functions to parse the CSV data.
 */
const floatOrNil = (value: string): number | undefined =>
  value === "NA" ? undefined : Number.parseFloat(value);

const stringOrNil = (value: string): string | undefined =>
  value === "NA" ? undefined : value;

const mapCategory = (value: string): ScoreCategory => {
  switch (value) {
    case "G":
      return "governance";
    case "F":
      return "freedom";
    case "P":
      return "privacy";
    default: {
      throw new Error("Unknown score category.");
    }
  }
};

const isIndicatorFamily = (value: string): boolean => value === "TRUE";

/* A helper function to extract and map indicators for one category
 * from a list of indicators. This is used by the loadData function.
 */
const categoryIndicators = (csvIndicators: CsvIndicator[]): Indicator[] => {
  const iterator = (
    indicators: CsvIndicator[],
    skipFamilyMembers: boolean,
  ): Indicator[] => {
    return indicators
      .sort((a, b) => {
        if (a.indicator < b.indicator) return -1;
        if (a.indicator > b.indicator) return 1;
        return 0;
      })
      .filter(({isFamilyMember}) => skipFamilyMembers === isFamilyMember)
      .map((indicator) => {
        const familyMembers = csvIndicators.filter(
          ({isFamilyMember, indicatorFamily}) =>
            indicatorFamily === indicator.indicator && isFamilyMember,
        );

        return {
          category: indicator.category,
          indicator: indicator.indicator,
          indicatorNr: indicator.indicatorNr,
          score: indicator.score || 0,
          label: indicator.label,
          description: indicator.description,
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
 * Load data from a CSV file relative to the project root.
 */
const loadCsvFile = async (file: string): Promise<CsvRecord[]> => {
  const data: CsvRecord[] = [];

  const source = fs.createReadStream(path.join(process.cwd(), file));

  const parser = parse({columns: true});

  parser.on("readable", () => {
    let record;
    // eslint-disable-next-line no-cond-assign
    while ((record = parser.read())) {
      data.push(record);
    }
  });

  return new Promise((resolve, reject) => {
    parser.on("error", reject);
    parser.on("end", () => resolve(data));
    source.pipe(parser);
  });
};

/*
 * Load Records from a CSV file and map them to a useful type.
 */
const loadCsv = <T extends Record<string, unknown>>(
  mapper: (record: CsvRecord) => T,
): ((f: string) => Promise<T[]>) => async (file: string): Promise<T[]> => {
  const records = await loadCsvFile(file);

  return records.map((record) => mapper(record));
};

/*
 * Load the scores for every company from a CSV.
 */
const loadTotalsCsv = loadCsv<CsvTotal>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  score: floatOrNil(record.Score),
}));

/*
 * Load the scores for every category and each company from a CSV.
 */
const loadCategoriesCsv = loadCsv<CsvCategory>((record) => ({
  index: record.Index as IndexYear,
  company: record.Company,
  category: mapCategory(record.Category),
  score: floatOrNil(record.Score),
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
  score: floatOrNil(record.Score),
  label: record.labelLong,
  description: record.description,
  isFamilyMember: isIndicatorFamily(record.isSubindicator),
  indicatorFamily: record.IndicatorFam,
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
}));

/*
 * Load the source data and construct the company index for 2020. This
 * function is called to populate the website pages.
 */
export const companyIndices = memoizeAsync<() => Promise<CompanyIndex[]>>(
  async () => {
    const [
      csvTotals,
      csvCategories,
      csvIndicators,
      csvCompanySpecs,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      csvElementSpecs,
    ] = await Promise.all([
      loadTotalsCsv("data/2020-totals.csv"),
      loadCategoriesCsv("data/2020-categories.csv"),
      loadIndicatorsCsv("data/2020-indicators.csv"),
      loadCompanySpecsCsv("data/2020-company-specs.csv"),
      loadElementSpecsCsv("data/2020-element-specs.csv"),
    ]);

    return (
      csvTotals
        .filter((total) => total.score && indexYears.has(total.index))
        .map((total) => {
          const company =
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

          const governanceIndicators: Indicator[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) =>
                indicator.category === "governance" && indicator.score,
            ),
          );
          const freedomIndicators: Indicator[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) =>
                indicator.category === "freedom" && indicator.score,
            ),
          );
          const privacyIndicators: Indicator[] = categoryIndicators(
            companyIndicators.filter(
              (indicator) =>
                indicator.category === "privacy" && indicator.score,
            ),
          );

          return {
            id: slugify(total.company),
            index: total.index,
            company: total.company,
            companyPretty: company.companyPretty,
            rank: -1, // We set the real rank further below
            kind: company.kind,
            country: company.country,
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
          if (a.scores.total < b.scores.total) return -1;
          if (a.scores.total > b.scores.total) return 1;
          return 0;
        })
        .map((company, i) => Object.assign(company, {rank: i + 1}))
    );
  },
);

/*
 * Load editorial content from Google Docs.
 */
const companyDetails = memoizeAsync<
  (folderId: string) => Promise<CompanyDetails[]>
>(async (folderId) => {
  const auth = getAuth();
  const googleDocs = await listFiles(auth, folderId);
  const companiesDir = path.join(process.cwd(), "content/companies");
  await fsP.mkdir(companiesDir, {recursive: true});

  return Promise.all(
    googleDocs.map(async (googleDoc) => {
      const doc = await fetchDocumentHtml(auth, companiesDir, googleDoc);
      if (!doc.download) return {id: doc.id};
      const src = await fsP.readFile(doc.download.target, "utf-8");
      const html = processHtml(src);
      return companyDetails2(doc.name, html);
    }),
  );
});

/*
 * Load the company details. This is a dummy right now. It needs to be
 * seen how we can load those. Ideally I fetch them directly from Wordpress.
 */
export const companyData = async (
  companyId: string,
): Promise<[CompanyIndex, CompanyDetails]> => {
  const [indexCache, detailsCache] = await Promise.all([
    companyIndices(),
    companyDetails(companiesFolder),
  ]);
  const index = indexCache.find(({id}) => id === companyId);
  // Until all editorial content is finished we provide an empty company
  // details page.
  const details = detailsCache.find(({id}) => id === companyId) || {
    id: companyId,
  };

  if (!(index && details)) {
    throw new Error(
      `Couldn't extract company index and details for "${companyId}"`,
    );
  }
  return [index, details];
};
