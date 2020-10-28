import c from "clsx";
import React from "react";

import {Indicator} from "../types";
import CompanyIndicatorChartBar from "./company-indicator-chart-bar";

interface CompanyIndicatorChartProps {
  indicators: Indicator[];
  width?: number;
  debug?: boolean;
}

const CompanyIndicatorChart = ({
  indicators,
  width = 250,
  debug = true,
}: CompanyIndicatorChartProps) => {
  const height = indicators.length * 75;
  return (
    <svg
      className={c(debug ? undefined : undefined)}
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <g>
        {indicators.map(({indicator, category, score}, index) => {
          const pos = 35 * index;

          return (
            <g
              key={`indicator-chart-${indicator}`}
              transform={`translate(0,${pos})`}
            >
              <CompanyIndicatorChartBar
                key={indicator}
                name={indicator}
                value={score}
                width={width}
                category={category}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default CompanyIndicatorChart;
