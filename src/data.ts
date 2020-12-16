import {promises as fsP} from "fs";
import path from "path";

import {emptyCompany} from "./formatter";
import {
  CompanyDetails,
  CompanyIndex,
  CompanyRank,
  IndicatorCategory,
  IndicatorIndex,
} from "./types";

const loadJson = <T extends unknown>(
  file: string,
): (() => Promise<T[]>) => async (): Promise<T[]> => {
  const data = await fsP.readFile(path.join(process.cwd(), file));
  return JSON.parse(data.toString());
};

export const companyIndices = loadJson<CompanyIndex>("data/scores.json");
export const indicatorIndices = loadJson<IndicatorIndex>(
  "data/indicators.json",
);

export const companyDetails = async (): Promise<CompanyDetails[]> => {
  const files = await fsP.readdir(path.join(process.cwd(), "data/companies"));

  return Promise.all(
    files.map(async (file) => {
      const data = await fsP.readFile(
        path.join(process.cwd(), "data/companies", file),
      );
      return JSON.parse(data.toString()) as CompanyDetails;
    }),
  );
};

/*
 * Load the company details. This is a dummy right now. It needs to be
 * seen how we can load those. Ideally I fetch them directly from Wordpress.
 */
export const companyData = async (
  companyId: string,
): Promise<[CompanyIndex, CompanyDetails]> => {
  const [indexCache, detailsCache] = await Promise.all([
    companyIndices(),
    companyDetails(),
  ]);
  const index = indexCache.find(({id}) => id === companyId);
  // Until all editorial content is finished we provide an empty company
  // details page.
  const details =
    detailsCache.find(({id}) => id === companyId.toLocaleLowerCase()) ||
    emptyCompany(companyId);

  if (!(index && details)) {
    throw new Error(
      `Couldn't extract company index and details for "${companyId}."`,
    );
  }
  return [index, details];
};

/*
 * Load the indicator details.
 */
export const indicatorData = async (
  indicatorId: string,
): Promise<IndicatorIndex> => {
  const indexCache = await indicatorIndices();
  const index = indexCache.find(({id}) => id === indicatorId);

  if (!index) {
    throw new Error(`Couldn't extract indicator index for "${indicatorId}".`);
  }
  return index;
};

/*
 * Load the company rankings, sorted descending by the total score.
 */
export const companyRankingData = async (
  score: IndicatorCategory | "total",
): Promise<CompanyRank[]> => {
  const companyCache = await companyIndices();

  return companyCache
    .map(({id, companyPretty, kind, scores}) => {
      return {id, companyPretty, kind, score: scores[score]};
    })
    .sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
};
