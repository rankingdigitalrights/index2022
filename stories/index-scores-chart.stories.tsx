import {Story} from "@storybook/react/types-6-0";
import React from "react";

import fixtures from "../fixtures/scores.json";
import IndexScoresChart from "../src/components/index-scores-chart";

interface IndexScoresChartStoryProps {
  width: number;
}

export default {
  title: "IndexScoresChart",
  component: IndexScoresChart,
  argTypes: {
    width: {
      control: {type: "range", min: 0, max: 800, step: 10},
    },
  },
};

const Template: Story<IndexScoresChartStoryProps> = ({width}) => {
  return <IndexScoresChart width={width} companies={fixtures} />;
};

export const Chart = Template.bind({});
Chart.args = {
  width: 450,
};
