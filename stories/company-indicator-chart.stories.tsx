import {Story} from "@storybook/react/types-6-0";
import React from "react";

import CompanyIndicatorChart, {
  CompanyIndicatorChartProps,
} from "../src/components/company-indicator-chart";
import {Indicator} from "../src/types";

const governanceIndicators: Indicator[] = [
  {name: "G1. Policy commitment", value: 42},
  {name: "G2. Governance and management oversight", value: 12},
];

const freedomIndicators: Indicator[] = [
  {name: "F1. Access to terms of service", value: 42},
];

const privacyIndicators: Indicator[] = [
  {name: "P1. Access to privacy policies", value: 42},
  {name: "P2. Changes to privacy policies", value: 23},
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

const Template: Story<CompanyIndicatorChartProps> = ({category}) => {
  let indicators: Indicator[] = [];
  if (category === "governance") indicators = governanceIndicators;
  if (category === "freedom") indicators = freedomIndicators;
  if (category === "privacy") indicators = privacyIndicators;

  return <CompanyIndicatorChart category={category} indicators={indicators} />;
};

export const Chart = Template.bind({});
Chart.args = {
  category: "governance",
};
