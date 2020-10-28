import {Story} from "@storybook/react/types-6-0";
import React from "react";

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

const companies = [
  {
    id: "alibaba",
    company: "Alibaba",
    scores: {total: 23, governance: 1, freedom: 1, privacy: 1},
  },
  {
    id: "apple",
    company: "Apple",
    scores: {total: 42, governance: 1, freedom: 1, privacy: 1},
  },
  {
    id: "tencent",
    company: "Tencent",
    scores: {total: 34, governance: 1, freedom: 1, privacy: 1},
  },
  {
    id: "Orange",
    company: "Orange",
    scores: {total: 52, governance: 1, freedom: 1, privacy: 1},
  },
  {
    id: "Microsoft",
    company: "Microsoft",
    scores: {total: 79, governance: 1, freedom: 1, privacy: 1},
  },
  {
    id: "Verizon Media",
    company: "Verizon Media",
    scores: {total: 10, governance: 1, freedom: 1, privacy: 1},
  },
];

const Template: Story<IndexScoresChartStoryProps> = ({width}) => {
  return <IndexScoresChart width={width} companies={companies} />;
};

export const Chart = Template.bind({});
Chart.args = {
  width: 450,
};
