export type IndexYear = "2019" | "2020";

export type NA = "NA";

export type IndicatorCategory = "governance" | "freedom" | "privacy";

export type IndicatorScore = number | NA;

export type IndicatorNested = {
  category: IndicatorCategory;
  indicator: string;
  display: string;
  indicatorNr: number;
  indicatorSuffix?: string;
  score: IndicatorScore;
  label: string;
  description: string;
  guidance: string;
  familyMembers: IndicatorNested[];
};

export type CompanyDetails = {
  id: string;
  basicInformation: string;
  keyFindings: string;
  analysis: string;
  keyRecommendation: string;
  governance: string;
  freedom: string;
  privacy: string;
  footnotes: string;
};

export type CompanyKind = "telecom" | "internet";

export type Company = {
  id: string;
  name: string;
  kind: CompanyKind;
};

export type Scores = Record<IndicatorCategory | "total", number>;

export type CategoryScores = Record<IndicatorCategory, number>;

export type CategoryCaption =
  | "Governance"
  | "Freedom of Expression"
  | "Privacy";

export type Indicators = Record<IndicatorCategory, IndicatorNested[]>;

export type CompanyRank = {
  id: string;
  companyPretty: string;
  score: number;
  kind: CompanyKind;
};

export type CompanyIndex = {
  id: string;
  companyPretty: string;
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
  category: IndicatorCategory;
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
  category: IndicatorCategory;
  isParent: boolean;
  hasParent: boolean;
  label: string;
  description: string;
  guidance: string;
  companies: string[];
  services: Record<string, string[]>;
  scores: Record<string, IndicatorScore>;
  averages: Record<string, Record<string, IndicatorScore>>;
  elements: Record<string, Record<string, Element[]>>;
};

export type CsvRecord = Record<string, string>;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SortStrategy<T extends SelectOption = SelectOption> {
  (xs: T[]): T[];
}

export type SortStrategies<T extends SelectOption = SelectOption> = Map<
  string,
  SortStrategy<T>
>;
