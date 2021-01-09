import c from "clsx";
import React from "react";

import {IndicatorCompanyScore} from "../types";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface IndicatorCompaniesChartProps {
  category: string;
  scores: IndicatorCompanyScore[];
  className?: string;
}

const IndicatorCompaniesChart = ({
  category,
  scores,
  className,
}: IndicatorCompaniesChartProps) => {
  return (
    <div className={c("flex font-circular text-xxs", className)}>
      <div className="flex flex-col items-center">
        <span>&nbsp;</span>
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          width={44}
          height={200}
          transform="translate(0, 0)"
          className="mt-3"
        >
          <line
            x1={35}
            y1={0}
            x2={35}
            y2={180}
            strokeWidth={2}
            className="text-disabled-dark stroke-current"
          />

          <GraphLabel
            value="100%"
            size="extra-small"
            transform="translate(25,10)"
            textAnchor="end"
          />

          <GraphLabel
            value="0%"
            size="extra-small"
            transform="translate(25,180)"
            textAnchor="end"
          />
        </svg>
      </div>

      <div className="flex justify-between w-full">
        {scores.map(({id, score}) => {
          return (
            <div
              key={`companies-chart-bar-${id}`}
              className="flex flex-col items-center"
            >
              <span className="select-none text-center">
                {score === "NA" ? "NA" : `${score}%`}
              </span>
              <div>
                <svg
                  className="mt-3"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={290}
                  transform="translate(0, 0)"
                >
                  <PercentageBar
                    key={id}
                    value={score}
                    width={8}
                    height={180}
                    orientation="vertical"
                    className={`text-cat-${category}`}
                  />
                  <GraphLabel
                    value={id}
                    size="small"
                    textAnchor="end"
                    transform="translate(14,185) rotate(270,0,5)"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorCompaniesChart;
