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
): (() => Promise<T>) => async (): Promise<T> => {
  const data = await fsP.readFile(path.join(process.cwd(), file));
  return JSON.parse(data.toString());
};

export const loadJsonDir = <T extends unknown>(
  dir: string,
  kind: string,
): (() => Promise<T[]>) => async (): Promise<T[]> => {
  const subDirs = await fsP.readdir(path.join(process.cwd(), dir));

  return Promise.all(
    subDirs.map(async (subDir) => {
      const data = await fsP.readFile(
        path.join(process.cwd(), dir, subDir, `${kind}.json`),
      );
      return JSON.parse(data.toString());
    }),
  );
};

export const companyIndices = loadJsonDir<CompanyIndex>(
  "data/companies",
  "scores",
);
export const indicatorIndices = loadJsonDir<IndicatorIndex>(
  "data/indicators",
  "scores",
);
export const companyDetails = loadJsonDir<CompanyDetails>(
  "data/companies",
  "details",
);

/*
 * Load the company details. This is a dummy right now. It needs to be
 * seen how we can load those. Ideally I fetch them directly from Wordpress.
 */
export const companyData = async (
  companyId: string,
): Promise<[CompanyIndex, CompanyDetails]> => {
  const companyDir = path.join("data/companies", companyId);

  return Promise.all([
    loadJson<CompanyIndex>(path.join(companyDir, "scores.json"))().catch(() => {
      throw new Error(
        `Couldn't extract company index and details for "${companyId}."`,
      );
    }),
    // Until all editorial content is finished we provide an empty company
    // details page.
    loadJson<CompanyDetails>(
      path.join(companyDir, "details.json"),
    )().catch(() => emptyCompany(companyId)),
  ]);
};

/*
 * Load the indicator details.
 */
export const indicatorData = async (
  indicatorId: string,
): Promise<IndicatorIndex> => {
  const indicatorDir = path.join("data/indicators", indicatorId);

  return loadJson<IndicatorIndex>(
    path.join(indicatorDir, "scores.json"),
  )().catch(() => {
    throw new Error(`Couldn't extract indicator index for "${indicatorId}".`);
  });
};

/*
 * Load the company rankings, sorted descending by the total score.
 */
export const companyRankingData = async (
  score: IndicatorCategory | "total" = "total",
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
