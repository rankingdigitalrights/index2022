import {Story} from "@storybook/react/types-6-0";
import React from "react";

import CompanyScoreChart, {
  CompanyScoreChartProps,
} from "../src/components/company-score-chart";

export default {
  title: "CompanyScoreChart",
  component: CompanyScoreChart,
  argTypes: {
    category: {
      control: {
        type: "inline-radio",
        options: ["governance", "freedom", "privacy"],
      },
    },
    score: {
      control: {type: "range", min: 0, max: 100, step: 1},
    },
  },
};

const Template: Story<CompanyScoreChartProps> = ({category, score}) => (
  <CompanyScoreChart category={category} score={score} />
);

export const Chart = Template.bind({});
Chart.args = {
  score: 42,
  category: "governance",
};
