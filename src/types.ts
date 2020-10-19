export type Indicator = {
  value: number;
  name: string;
};

export type Company = {
  display: string;
  id: string;
};

export type CompanyDetails = {
  id: string;
  display: string;
  companyType: string;
  rank: number;
  basicInformation: string;
  keyFindings: string;
  servicesEvaluated: string;
  analysisValue: number;
  analysisText: string;
  keyRecommendation: string;
  governanceValue: number;
  governanceText: string;
  summaryOfChangesGovernance: string;
  freedomValue: number;
  freedomText: string;
  summaryOfChangesFreedom: string;
  privacyValue: number;
  privacyText: string;
  summaryOfChangesPrivacy: string;
  footnotes: string;
  indicators: {
    governance: Indicator[];
    freedom: Indicator[];
    privacy: Indicator[];
  };
};

export type ScoreCategory = "governance" | "freedom" | "privacy";
