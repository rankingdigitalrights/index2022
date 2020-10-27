import {Story} from "@storybook/react/types-6-0";
import React from "react";

import CategoriesRadarChart from "../src/components/categories-radar-chart";

interface CategoriesRadarChartStoryProps {
  governance: number;
  freedom: number;
  privacy: number;
  size: number;
  scales: number;
  comparison: boolean;
  debug: boolean;
}

export default {
  title: "CategoriesRadarChart",
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
  },
};

const Template: Story<CategoriesRadarChartStoryProps> = ({
  governance,
  freedom,
  privacy,
  size,
  scales,
  comparison,
  debug,
}) => {
  const data = [{governance, freedom, privacy}];
  if (comparison) {
    data.push({governance: 67, freedom: 42, privacy: 23});
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
  comparison: false,
  debug: false,
};
