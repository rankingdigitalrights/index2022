import React from "react";

import {Indicator} from "../types";
import CompanyIndicatorChartBar from "./company-indicator-chart-bar";

interface CompanyIndicatorChartProps {
  indicators: Indicator[];
}

const CompanyIndicatorChart = ({indicators}: CompanyIndicatorChartProps) => {
  // FIXME: The height of the svg tag is fixed and probably cuts some of the bars off.
  return (
    <div>
      <svg className="h-64">
        <g>
          {indicators.map(({indicator, category, score}, index) => {
            const pos = 35 * (index + 1);

            return (
              <CompanyIndicatorChartBar
                key={indicator}
                name={indicator}
                value={score}
                pos={pos}
                category={category}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CompanyIndicatorChart;
