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
  let title;

  if (category === "governance") {
    title = "Governance";
  } else if (category === "freedom") {
    title = "Freedom of Expression";
  } else if (category === "privacy") {
    title = "Privacy";
  } else {
    title = "UNKNOWN CATEGORY!!!";
  }

  // Render the negative arc first.
  // eslint-disable-next-line unicorn/no-null
  const [datumNeg, datum] = pie().sort(null)([100 - score, score]);

  return (
    <div className="p-4 m-4 flex-grow">
      <svg className="h-64">
        <g transform="translate(125,125)">
          <CompanyScoreChartSlice datum={datumNeg} />
          <CompanyScoreChartSlice datum={datum} category={category} />

          <GraphLabel
            transform="translate(0,5)"
            value={`${score}%`}
            textAnchor="middle"
            size="extra-large"
            bold={true}
          />
          <GraphLabel
            transform="translate(0,35)"
            value={title}
            textAnchor="middle"
            size="large"
          />
        </g>
      </svg>
    </div>
  );
};

export default CompanyScoreChart;
