import {promises as fsP} from "fs";
import path from "path";

import {emptyCompany} from "./formatter";
import {
  Company,
  CompanyDetails,
  CompanyHighlight,
  CompanyIndex,
  CompanyKind,
  CompanyMeta,
  CompanyRank,
  CompanyScoreDiff,
  CompanyYear,
  ComparePage,
  Element,
  Indicator,
  IndicatorAverages,
  IndicatorCategoryExt,
  IndicatorCompanyScore,
  IndicatorDetails,
  IndicatorElements,
  NarrativePage,
  Service,
  ServiceCompanyRank,
  ServiceKind,
} from "./types";
import {unreachable} from "./utils";

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

export const allCompanies = loadJson<Company[]>("data/companies.json");
export const allIndicators = loadJson<Indicator[]>("data/indicators.json");
export const allElements = loadJson<Element[]>("data/elements.json");
export const allServices = loadJson<Service[]>("data/services.json");

export const companyIndices = loadJsonDir<CompanyIndex>(
  "data/companies",
  "scores",
);

/*
 * Load the company details.
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
 * Load the company services.
 */
export const companyServices = async (
  companyId: string,
): Promise<Service[]> => {
  const companyDir = path.join("data/companies", companyId);

  return loadJson<Service[]>(path.join(companyDir, "services.json"))().catch(
    () => {
      throw new Error(`Couldn't extract company services for "${companyId}."`);
    },
  );
};

/*
 * Load the company meta.
 */
export const companyMeta = async (companyId: string): Promise<CompanyMeta> => {
  const companyDir = path.join("data/companies", companyId);

  return loadJson<CompanyMeta>(path.join(companyDir, "meta.json"))().catch(
    () => {
      throw new Error(`Couldn't extract company meta for "${companyId}."`);
    },
  );
};

/*
 * Load the indicator details.
 */
export const indicatorDetails = async (
  indicatorId: string,
): Promise<IndicatorDetails> => {
  const indicatorDir = path.join(
    "data/indicators",
    indicatorId,
    "details.json",
  );

  return loadJson<IndicatorDetails>(indicatorDir)().catch(() => {
    throw new Error(`Couldn't extract indicator details for "${indicatorId}".`);
  });
};

/*
 * Load the companies for a single indicator.
 */
export const indicatorCompanies = async (
  indicatorId: string,
): Promise<Company[]> => {
  const indicatorDir = path.join(
    "data/indicators",
    indicatorId,
    "companies.json",
  );

  return loadJson<Company[]>(indicatorDir)().catch(() => {
    throw new Error(
      `Couldn't extract indicator companies for "${indicatorId}".`,
    );
  });
};

/*
 * Load the companies for a single indicator.
 */
export const indicatorScores = async (
  indicatorId: string,
): Promise<IndicatorCompanyScore[]> => {
  const indicatorDir = path.join(
    "data/indicators",
    indicatorId,
    "company-scores.json",
  );

  return loadJson<IndicatorCompanyScore[]>(indicatorDir)().catch(() => {
    throw new Error(
      `Couldn't extract indicator company score for "${indicatorId}".`,
    );
  });
};

/*
 * Load the elements data for a single indicator.
 */
export const indicatorElements = async (
  indicatorId: string,
): Promise<IndicatorElements> => {
  const indicatorDir = path.join(
    "data/indicators",
    indicatorId,
    "elements.json",
  );

  return loadJson<IndicatorElements>(indicatorDir)().catch(() => {
    throw new Error(
      `Couldn't extract indicator elements for "${indicatorId}".`,
    );
  });
};

/*
 * Load the companies for a single indicator.
 */
export const indicatorAverages = async (
  indicatorId: string,
): Promise<IndicatorAverages> => {
  const indicatorDir = path.join(
    "data/indicators",
    indicatorId,
    "averages.json",
  );

  return loadJson<IndicatorAverages>(indicatorDir)().catch(() => {
    throw new Error(
      `Couldn't extract indicator averages for "${indicatorId}".`,
    );
  });
};

/*
 * Load the company rankings, sorted descending by the total score.
 */
export const companyRankingData = async (
  kind: CompanyKind,
  category: IndicatorCategoryExt,
): Promise<CompanyRank[]> => {
  return loadJson<CompanyRank[]>(`data/rankings/${kind}-${category}.json`)();
};

/*
 * Load the company service rankings, sorted descending by the total score.
 */
export const companyServiceRankingData = async (
  service: ServiceKind,
  kind: CompanyKind,
  category: IndicatorCategoryExt,
): Promise<ServiceCompanyRank[]> => {
  return loadJson<ServiceCompanyRank[]>(
    `data/rankings/${service}/${kind}-${category}.json`,
  )();
};

/*
 * Load the company highlights.
 */
export const companyHighlights = async (): Promise<CompanyHighlight[]> => {
  const [indices, highlights] = await Promise.all([
    companyIndices(),
    loadJson<CompanyHighlight[]>("data/highlights.json")(),
  ]);

  return highlights.map(({highlights: hs, ...meta}) => {
    const [h1, h2] = hs;
    if (!h1 || !h2)
      return unreachable(
        "Company highlights must always have two highlighted companies.",
      );
    const c1 = indices.find(({id}) => id === h1.company);
    const c2 = indices.find(({id}) => id === h2.company);
    if (!c1)
      return unreachable(`Failed to load company details for ${h1.company}.`);
    if (!c2)
      return unreachable(`Failed to load company details for ${h2.company}.`);

    return {
      ...meta,
      highlights: [
        {
          ...h1,
          companyPretty: c1.companyPretty,
          kind: c1.kind,
          score: c1.scores.total,
        },
        {
          ...h2,
          companyPretty: c2.companyPretty,
          kind: c2.kind,
          score: c2.scores.total,
        },
      ],
    };
  });
};

/*
 * Load the company diff scores.
 */
export const companyDiffScoresData = async (
  year: CompanyYear,
  category: IndicatorCategoryExt,
): Promise<CompanyScoreDiff[]> => {
  return loadJson<CompanyScoreDiff[]>(`data/diffs/${category}-${year}.json`)();
};

/*
 * Load the intro essay HTML.
 */
export const introEssay = loadJson<NarrativePage>(
  "data/narratives/intro-essay.json",
);

/*
 * Load the about us HTML.
 */
export const aboutUs = loadJson<NarrativePage>("data/narratives/about-us.json");

/*
 * Load the intro essay HTML.
 */
export const keyFindings = loadJson<NarrativePage>(
  "data/narratives/key-findings.json",
);

/*
 * Load the policy recommendations HTML.
 */
export const policyRecommendations = loadJson<NarrativePage>(
  "data/narratives/policy-recommendations.json",
);

/*
 * Load the methodology HTML.
 */
export const methodology = loadJson<NarrativePage>(
  "data/narratives/methodology.json",
);

/*
 * Load the china tech giants HTML.
 */
export const chinaTechGiants = loadJson<NarrativePage>(
  "data/narratives/china-tech-giants.json",
);

/*
 * Load the compare page details.
 */
export const compareDetails = loadJson<ComparePage>(
  `data/narratives/compare.json`,
);
