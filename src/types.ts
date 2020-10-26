export type Index = "2019" | "2020";

export type ScoreCategory = "governance" | "freedom" | "privacy";

export type Indicator = {
  category: ScoreCategory;
  indicator: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: number;
};

export type CompanyDetails = {
  basicInformation: string;
  keyFindings: string;
  servicesEvaluated: string;
  analysisText: string;
  keyRecommendation: string;
  governanceText: string;
  summaryOfChangesGovernance: string;
  freedomText: string;
  summaryOfChangesFreedom: string;
  privacyText: string;
  summaryOfChangesPrivacy: string;
  footnotes: string;
};

export type CompanyKind = "telecom" | "internet";

export type Scores = Record<ScoreCategory | "total", number>;

export type Indicators = Record<ScoreCategory, Indicator[]>;

export type CompanyIndex = {
  id: string;
  company: string;
  index: string;
  rank: number;
  kind: CompanyKind;
  scores: Scores;
  indicators: Indicators;
};
