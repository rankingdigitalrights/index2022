import {MdxRemote} from "next-mdx-remote/types";

export type IndexYear = "2019" | "2020";

export type NA = "NA";

export type IndicatorCategory = "governance" | "freedom" | "privacy";

export type IndicatorCategoryExt = IndicatorCategory | "total";

export type IndicatorScore = number | NA;

export type ScoreDiffs = {
  diff2017: IndicatorScore;
  diff2018: IndicatorScore;
  diff2019: IndicatorScore;
  diff2020: IndicatorScore;
};

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

export type CompanyYear = "2020";

export type CompanyScoreDiff = {
  id: string;
  company: string;
  kind: CompanyKind;
  score: IndicatorScore;
};

export type CompanyMeta = {
  company: string;
  researchers: string[];
  website: string;
  marketCap: string;
  marketCapDate: string;
  exchange: string;
  stockSymbol: string;
  operatingCompany?: string;
};

export type CompanyDetails = {
  id: string;
  printName: string;
  basicInformation: string;
  keyFindingsTitle: string;
  keyFindings: string;
  changesTitle: string;
  changes: string;
  keyRecommendationTitle: string;
  keyRecommendation: string;
  keyTakeawaysTitle: string;
  keyTakeaways: string;
  governance: string;
  freedom: string;
  privacy: string;
  footnotes?: string;
};

export type CompanyKind = "telecom" | "internet";

export type Company = {
  // The slug of the company name, e.g. AmericaMovil.
  id: string;
  // The display name of the company, e.g. América Móvil.
  name: string;
  region: string;
  kind: CompanyKind;
};

export type Indicator = {
  // The full length name of the indicator, e.g. G01.
  id: string;
  // The display name of the indicator, e.g. G1.
  name: string;
  category: IndicatorCategory;
  isParent: boolean;
  parent?: string;
  label: string;
  description: string;
  guidance: string;
  exclude?: CompanyKind;
};

export type Scores = Record<IndicatorCategoryExt, number>;

export type CategoryScores = Record<IndicatorCategory, number>;

export type CategoryCaption =
  | "Governance"
  | "Freedom of Expression"
  | "Privacy";

export type Indicators = Record<IndicatorCategory, IndicatorNested[]>;

export type CompanyRank = {
  id: string;
  companyPretty: string;
  score: IndicatorScore;
  kind: CompanyKind;
  category: IndicatorCategoryExt;
  rank: number;
  region: string;
};

export type ServiceCompanyRank = CompanyRank & {service: string};

export type ServiceKind =
  | "Group"
  | "OpCom"
  | "broadband"
  | "cloud"
  | "eCommerce"
  | "email"
  | "messagingVoip"
  | "mobile"
  | "mobileEcosystem"
  | "pda"
  | "photoVideo"
  | "search"
  | "socialNetworkBlogs";

export type Service = {
  id: string;
  name: string;
  kind: ServiceKind;
  label: string;
};

export type CompanyIndex = {
  id: string;
  companyPretty: string;
  index: string;
  rank: number;
  region: string;
  kind: CompanyKind;
  scores: Scores;
  indicators: Indicators;
  totalDiffs: ScoreDiffs;
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
  id: string;
  name: string;
  position: number;
  category: IndicatorCategory;
  indicatorId: string;
  description: string;
  isTelecom: boolean;
  isPlatform: boolean;
};

export type IndicatorCompanyScore = {
  id: string;
  companyPretty: string;
  kind: CompanyKind;
  score: IndicatorScore;
};

export type IndicatorElement = {
  id: string;
  name: string;
  position: number;
  score: IndicatorScore;
  value: ElementValue;
};

// A record of companies containing mapping from service to indicator elements.
export type IndicatorElements = Record<
  string,
  Record<string, IndicatorElement[]>
>;

export type IndicatorAverage = Record<string, IndicatorScore>;

export type IndicatorAverages = Record<string, IndicatorAverage>;

export type IndicatorDetails = {
  id: string;
  name: string;
  category: IndicatorCategory;
  isParent: boolean;
  hasParent: boolean;
  label: string;
  description: string;
  guidance: string;
};

export type IndicatorIndexElement = {
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
  elements: Record<string, Record<string, IndicatorIndexElement[]>>;
};

export type CsvRecord = Record<string, string>;

export interface SelectOption {
  value: string;
  label: string;
}

export interface CompanySelectOption extends SelectOption {
  score: number;
  kind: CompanyKind;
}

export interface IndicatorSelectOption extends SelectOption {
  isParent: boolean;
  hasParent: boolean;
  category: IndicatorCategory;
}

export interface ServiceOption extends SelectOption {
  kind: ServiceKind;
}

export interface SortStrategy<T extends SelectOption = SelectOption> {
  (xs: T[]): T[];
}

export type SortStrategies<T extends SelectOption = SelectOption> = Map<
  string,
  SortStrategy<T>
>;

export type HighlightedCompany = {
  company: string;
  companyPretty: string;
  text: string;
  score: IndicatorScore;
  kind: CompanyKind;
};

export type CompanyHighlight = {
  title: string;
  text: string;
  highlights: [HighlightedCompany, HighlightedCompany];
};

export interface NarrativeProps {
  details: {
    pageTitle: MdxRemote.Source;
    body: MdxRemote.Source;
    footnotes?: MdxRemote.Source;
  };
}

export interface NarrativePage {
  pageTitle: string;
  body: string;
  footnotes?: string;
}

export interface ComparePage {
  pageTitle: string;
  introduction: string;
  body: string;
  footnotes?: string;
}
