import React from "react";

import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface IndexScoresChartBarProps {
  value: number;
  name: string;
  width: number;
  height?: number;
}

const IndexScoresChartBar = ({
  value,
  name,
  width,
  height = 14,
}: IndexScoresChartBarProps) => {
  // Shift the label by this much along the y axis to appear below the bar.
  const textShiftLeft = 100;
  const textShiftRight = 40;
  const labelSpacing = 13;

  return (
    <g transform="translate(0,0)">
      <GraphLabel
        transform={`translate(${textShiftLeft - labelSpacing},${height - 3})`}
        value={name}
        size="small"
        textAnchor="end"
      />
      <PercentageBar
        transform={`translate(${textShiftLeft},0)`}
        value={value}
        width={width - textShiftLeft - textShiftRight}
        height={height}
        className="text-black"
      />
      <GraphLabel
        transform={`translate(${width - textShiftRight + labelSpacing},${
          height - 3
        })`}
        value={`${value}%`}
        size="small"
      />
    </g>
  );
};

export default IndexScoresChartBar;
