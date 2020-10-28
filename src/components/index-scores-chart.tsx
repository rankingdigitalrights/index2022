import React from "react";

import IndexScoresChartBar from "./index-scores-chart-bar";
import {CompanyIndex} from "../types";

interface IndexScoresChartProps {
  companies: Array<Pick<CompanyIndex, "id" | "company" | "scores">>;
  width?: number;
  debug?: boolean;
}

const IndexScoreChart = ({companies, width = 250}: IndexScoresChartProps) => {
  const height = 35 * companies.length;

  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <g>
        {companies.map(({id, company, scores}, index) => {
          const pos = 35 * index;

          return (
            <g key={`index-scores-${id}`} transform={`translate(0,${pos})`}>
              <IndexScoresChartBar
                value={scores.total}
                name={company}
                width={width}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default IndexScoreChart;
