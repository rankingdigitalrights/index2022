import {pie} from "d3-shape";
import React from "react";

import {ScoreCategory} from "../types";
import CompanyScoreChartSlice from "./company-score-chart-slice";
import GraphLabel from "./graph-label";

export interface CompanyScoreChartProps {
  category: ScoreCategory;
  score: number;
}

const CompanyScoreChart = ({score}: CompanyScoreChartProps) => {
  // Render the negative arc first.
  // eslint-disable-next-line unicorn/no-null
  const [datum] = pie().sort(null)([score, 100 - score]);
  const outerRadius = 120;
  const innerRadius = 110;

  return (
    <div className="p-4 m-4 flex-grow">
      <svg className="h-64">
        <g transform={`translate(${outerRadius + 5},${outerRadius + 5})`}>
          <circle
            r={(outerRadius + innerRadius) / 2}
            stroke="#1C5275"
            strokeWidth="2"
            fill="none"
          />

          <CompanyScoreChartSlice
            datum={datum}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
          />

          <GraphLabel
            transform="translate(0,5)"
            value={`${score}%`}
            textAnchor="middle"
            size="extra-large"
            bold
          />
        </g>
      </svg>
    </div>
  );
};

export default CompanyScoreChart;
