import {pie} from "d3-shape";
import React from "react";

import {ScoreCategory} from "../types";
import CompanyScoreChartSlice from "./company-score-chart-slice";
import GraphLabel from "./graph-label";

export interface CompanyScoreChartProps {
  category: ScoreCategory;
  score: number;
}

const CompanyScoreChart = ({category, score}: CompanyScoreChartProps) => {
  // Render the negative arc first.
  // eslint-disable-next-line unicorn/no-null
  const [datum] = pie().sort(null)([score, 100 - score]);
  const outerRadius = 120;
  const innerRadius = 110;

  return (
    <div className="p-4 m-4 flex flex-col w-64">
      <span className="font-circular text-sm font-black text-center">
        {category.replace(/^\w/, (c) => c.toUpperCase())}
      </span>

      <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260">
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
            size="large"
            bold
          />
        </g>
      </svg>
    </div>
  );
};

export default CompanyScoreChart;
