import {Story} from "@storybook/react/types-6-0";
import React from "react";

import CompanyIndicatorChart from "../src/components/company-indicator-chart";
import {Indicator, ScoreCategory} from "../src/types";

interface CompanyIndicatorChartStoryProps {
  category: ScoreCategory;
}

const governanceIndicators: Indicator[] = [
  {indicator: "G1", score: 42, category: "governance", indicatorNr: 1},
];

const freedomIndicators: Indicator[] = [
  {indicator: "F1", score: 42, category: "freedom", indicatorNr: 1},
];

const privacyIndicators: Indicator[] = [
  {indicator: "P1", score: 42, category: "privacy", indicatorNr: 1},
  {indicator: "P2", score: 23, category: "privacy", indicatorNr: 1},
];

export default {
  title: "CompanyIndicatorChart",
  component: CompanyIndicatorChart,
  argTypes: {
    category: {
      control: {
        type: "inline-radio",
        options: ["governance", "freedom", "privacy"],
      },
    },
  },
};

const Template: Story<CompanyIndicatorChartStoryProps> = ({category}) => {
  let indicators: Indicator[] = [];
  if (category === "governance") indicators = governanceIndicators;
  if (category === "freedom") indicators = freedomIndicators;
  if (category === "privacy") indicators = privacyIndicators;

  return <CompanyIndicatorChart indicators={indicators} />;
};

export const Chart = Template.bind({});
Chart.args = {
  category: "governance",
};
