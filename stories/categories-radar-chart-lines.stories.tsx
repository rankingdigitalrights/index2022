import {Story} from "@storybook/react/types-6-0";
import React from "react";

import fixtures from "../data/scores.json";
import CategoriesRadarChart from "../src/components/categories-radar-chart-lines";

interface CategoriesRadarChartStoryProps {
  compareWith: string;
  governance: number;
  freedom: number;
  privacy: number;
  size: number;
  scales: number;
  comparison: boolean;
  debug: boolean;
}

export default {
  title: "CategoriesRadarChartLines",
  component: CategoriesRadarChart,
  argTypes: {
    governance: {
      control: {type: "range", min: 0, max: 100, step: 1},
    },
    freedom: {
      control: {type: "range", min: 0, max: 100, step: 1},
    },
    privacy: {
      control: {type: "range", min: 0, max: 100, step: 1},
    },
    size: {
      control: {type: "range", min: 100, max: 600, step: 10},
    },
    scales: {
      control: {type: "range", min: 1, max: 10, step: 1},
    },
    compareWith: {
      control: {
        type: "select",
        options: ["RESET"].concat(
          fixtures.map(({companyPretty}) => companyPretty),
        ),
      },
    },
  },
};

const Template: Story<CategoriesRadarChartStoryProps> = ({
  compareWith,
  governance,
  freedom,
  privacy,
  size,
  scales,
  debug,
}) => {
  const data = [{governance, freedom, privacy}];
  if (compareWith && compareWith !== "RESET") {
    const selectedCompany = fixtures.find(
      (fixture) => fixture.companyPretty === compareWith,
    );

    if (!selectedCompany)
      throw new Error(`${compareWith} not found in fixtures.`);

    data.push(selectedCompany.scores);
  }

  return (
    <CategoriesRadarChart
      scores={data}
      size={size}
      scales={scales}
      debug={debug}
    />
  );
};

export const Chart = Template.bind({});
Chart.args = {
  governance: 23,
  freedom: 42,
  privacy: 67,
  scales: 3,
  size: 300,
  compareWith: undefined,
  debug: false,
};
