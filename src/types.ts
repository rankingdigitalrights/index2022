export type Index = "2019" | "2020";

export type ScoreCategory = "governance" | "freedom" | "privacy";

export type Indicator = {
  category: ScoreCategory;
  indicator: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: number;
  label: string;
  description: string;
  familyMembers: Indicator[];
};

export type CompanyDetails = {
  id: string;
  basicInformation?: string;
  keyFindings?: string;
  analysis?: string;
  keyRecommendation?: string;
  governance?: string;
  summaryOfChangesGovernance?: string;
  freedom?: string;
  summaryOfChangesFreedom?: string;
  privacy?: string;
  summaryOfChangesPrivacy?: string;
  footnotes?: string;
};

export type CompanyKind = "telecom" | "internet";

export type Scores = Record<ScoreCategory | "total", number>;

export type CategoryScores = Record<ScoreCategory, number>;

export type CategoryCaption =
  | "Governance"
  | "Freedom of Expression"
  | "Privacy";

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
