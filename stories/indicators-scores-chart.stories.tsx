import {Story} from "@storybook/react/types-6-0";
import React from "react";

import IndicatorScoresChart from "../src/components/indicator-scores-chart";
import {CompanyIndex} from "../src/types";
import fixtures from "./scores-fixtures.json";

interface IndicatorScoresChartStoryProps {
  size: number;
  debug: boolean;
}

export default {
  title: "IndicatorScoresChart",
  component: IndicatorScoresChart,
  argTypes: {
    size: {
      control: {type: "range", min: 0, max: 100, step: 5},
    },
  },
};

const Template: Story<IndicatorScoresChartStoryProps> = ({size, debug}) => {
  return (
    <IndicatorScoresChart
      gridSize={size}
      companies={fixtures as CompanyIndex[]}
      debug={debug}
    />
  );
};

export const Chart = Template.bind({});
Chart.args = {
  size: 40,
  debug: false,
};
