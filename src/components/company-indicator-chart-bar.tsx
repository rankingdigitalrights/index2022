import React from "react";

import {ScoreCategory} from "../types";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface CompanyIndicatorChartBarProps {
  value: number;
  name: string;
  width: number;
  category: ScoreCategory;
  height?: number;
}

const CompanyIndicatorChartBar = ({
  value,
  name,
  width,
  category,
  height = 8,
}: CompanyIndicatorChartBarProps) => {
  // Shift the label by this much along the y axis to appear below the bar.
  const textShift = 25;
  const className = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-cat-negative": category === undefined,
  };

  return (
    <g transform="translate(0,0)">
      <PercentageBar
        value={value}
        width={width}
        height={height}
        className={className}
      />
      <GraphLabel
        transform={`translate(0,${textShift})`}
        value={name}
        size="small"
      />
    </g>
  );
};

export default CompanyIndicatorChartBar;
