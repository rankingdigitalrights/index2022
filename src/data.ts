import slugify from "@sindresorhus/slugify";
import parse from "csv-parse";
import fs from "fs";
import path from "path";

import {
  CompanyDetails,
  CompanyIndex,
  CompanyKind,
  Indicator,
  ScoreCategory,
  Scores,
} from "./types";

type CsvRecord = Record<string, string>;

type CsvTotal = {
  index: string;
  company: string;
  score?: number;
};

type CsvCategory = {
  index: string;
  company: string;
  category: ScoreCategory;
  score?: number;
};

type CsvIndicator = {
  index: string;
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

interface MemoizedLoadData {
  (): Promise<CompanyIndex[]>;
  cache: CompanyIndex[];
}

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
      throw new Error("Unknow score category.");
    }
  }
};

const isIndicatorFamily = (value: string): boolean =>
  value === "TRUE" ? true : false;

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
        if (a.indicator < b.indicator) {
          return -1;
        }
        if (a.indicator > b.indicator) {
          return 1;
        }
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
const loadCsv = async (file: string): Promise<CsvRecord[]> => {
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
 * Load the scores for every company from a CSV.
 */
const loadTotalsCsv = async (file: string): Promise<CsvTotal[]> => {
  const totals = await loadCsv(file);

  return totals.map((record) => ({
    index: record.Index,
    company: record.Company,
    score: floatOrNil(record.Score),
  }));
};

/*
 * Load the scores for every category and each company from a CSV.
 */
const loadCategoriesCsv = async (file: string): Promise<CsvCategory[]> => {
  const categories = await loadCsv(file);

  return categories.map((record) => ({
    index: record.Index,
    company: record.Company,
    category: mapCategory(record.Category),
    score: floatOrNil(record.Score),
  }));
};

/*
 * Load the scores for every indicator for each category and company from a CSV.
 */
const loadIndicatorsCsv = async (file: string): Promise<CsvIndicator[]> => {
  const indicators = await loadCsv(file);

  return indicators.map((record) => ({
    index: record.Index,
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
};

/*
 * Load the company details. This is a dummy right now. It needs to be
 * seen how we can load those. Ideally I fetch them directly from Wordpress.
 */
export const companyDetails = async (_id: string): Promise<CompanyDetails> => {
  return Promise.resolve({
    basicInformation: "dummy content: basic information",
    keyFindings: "dummy content: key findings",
    servicesEvaluated: "dummy content: services evaluated",
    analysisText: "dummy content: analysis text",
    keyRecommendation: "dummy content: ket recommendations",
    governanceText: "dummy content: governance text",
    summaryOfChangesGovernance: "dummy content: summary of changes governance",
    freedomText: "dummy content: freedom text",
    summaryOfChangesFreedom: "dummy content: summary of changes freedom",
    privacyText: "dummy content: privacy text",
    summaryOfChangesPrivacy: "dummy content: summary of changes privacy",
    footnotes: "dummy content: footnotes",
  });
};

/*
 * Load the source data and construct the company index for 2020. This
 * function is called to populate the website pages.
 */
export const loadData: MemoizedLoadData = async () => {
  // If we haven't loaded the data from CSV yet, do it now. We cache
  // the result of the load. Once we loaded the data, we should definitely
  // have at least one company.
  if (loadData.cache.length === 0) {
    // loadData.cache = [];

    const [csvTotals, csvCategories, csvIndicators] = await Promise.all([
      loadTotalsCsv("data/2020-totals.csv"),
      loadCategoriesCsv("data/2020-categories.csv"),
      loadIndicatorsCsv("data/2020-indicators.csv"),
    ]);

    // FIXME: We only deal with 2020 data right now.
    const index = "2020";

    loadData.cache = csvTotals
      .filter((total) => {
        return total.score && total.index !== index;
      })
      .map((total) => {
        const companyCategories = csvCategories.filter(
          (category) =>
            category.company === total.company && category.index === index,
        );
        const companyIndicators = csvIndicators.filter(
          (indicator) =>
            indicator.company === total.company && indicator.index === index,
        );

        const scores: Scores = companyCategories.reduce(
          (memo, category) => {
            if (category.score === undefined) return memo;
            return Object.assign(memo, {[category.category]: category.score});
          },
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
            (indicator) => indicator.category === "freedom" && indicator.score,
          ),
        );
        const privacyIndicators: Indicator[] = categoryIndicators(
          companyIndicators.filter(
            (indicator) => indicator.category === "privacy" && indicator.score,
          ),
        );

        return {
          id: slugify(total.company),
          index: total.index,
          company: total.company,
          rank: -1, // We set the real rank further below
          kind: "telecom" as CompanyKind,
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
        if (a.scores.total < b.scores.total) {
          return -1;
        }
        if (a.scores.total > b.scores.total) {
          return 1;
        }
        return 0;
      })
      .map((company, i) => Object.assign(company, {rank: i + 1}));
  }

  return Promise.resolve(loadData.cache);
};
loadData.cache = [];
