export type IndexYear = "2019" | "2020";

export type ScoreCategory = "governance" | "freedom" | "privacy";

// FIXME: Deprecate ScoreCategory in favor of Category.
export type Category = ScoreCategory;

export type NA = "NA";

export type IndicatorScore = number | NA;

export type Indicator = {
  category: ScoreCategory;
  indicator: string;
  display: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: IndicatorScore;
  label: string;
  description: string;
  guidance: string;
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
  companyPretty: string;
  country: string;
  index: string;
  rank: number;
  kind: CompanyKind;
  scores: Scores;
  indicators: Indicators;
};

export type ElementValue =
  | NA
  | "New / Revised Element"
  | "No"
  | "Yes"
  | "No Disclosure Found"
  | "Not Selected"
  | "Partial";

// NA
// New / Revised Element
// no
// no disclosure found
// No disclosure found
// not selected
// Partial
// partial
// Yes
// yes

export type Element = {
  element: string;
  elementNr: number;
  category: ScoreCategory;
  label: string;
  description: string;
  score: number | NA;
  value: ElementValue;
  companyId: string;
  kind: string;
  service: string;
};

export type IndicatorIndex = {
  id: string;
  indicator: string;
  category: ScoreCategory;
  display: string;
  label: string;
  description: string;
  guidance: string;
  companies: string[];
  services: Record<string, string[]>;
  scores: Record<string, IndicatorScore>;
  averages: Record<string, Record<string, IndicatorScore>>;
  elements: Record<string, Record<string, Element[]>>;
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface SortStrategy {
  (xs: SelectOption[]): SelectOption[];
}

export type SortStrategies = Map<string, SortStrategy>;
