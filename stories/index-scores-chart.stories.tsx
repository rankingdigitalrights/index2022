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
    scores: {total: 23, governance: 12, freedom: 76, privacy: 23},
  },
  {
    id: "apple",
    company: "Apple",
    scores: {total: 42, governance: 67, freedom: 10, privacy: 45},
  },
  {
    id: "tencent",
    company: "Tencent",
    scores: {total: 34, governance: 23, freedom: 45, privacy: 10},
  },
  {
    id: "Orange",
    company: "Orange",
    scores: {total: 52, governance: 32, freedom: 54, privacy: 89},
  },
  {
    id: "Microsoft",
    company: "Microsoft",
    scores: {total: 79, governance: 34, freedom: 23, privacy: 23},
  },
  {
    id: "Verizon Media",
    company: "Verizon Media",
    scores: {total: 10, governance: 45, freedom: 10, privacy: 67},
  },
];

const Template: Story<IndexScoresChartStoryProps> = ({width}) => {
  return <IndexScoresChart width={width} companies={companies} />;
};

export const Chart = Template.bind({});
Chart.args = {
  width: 450,
};
