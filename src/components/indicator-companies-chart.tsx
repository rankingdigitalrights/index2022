import React from "react";

import {IndicatorScore} from "../types";
import {isNA} from "../utils";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface IndicatorCompaniesChartProps {
  category: string;
  scores: Record<string, IndicatorScore>;
}

const IndicatorCompaniesChart = ({
  category,
  scores,
}: IndicatorCompaniesChartProps) => {
  const sortedScores = Object.keys(scores)
    .map((company) => {
      const score = scores[company];
      return {company, score};
    })
    .sort((a, b) => {
      // In order to locate scores with NA last in
      // line we set it to -1 to sort it below the
      // real 0 scores.
      const aScore = isNA(a.score) ? -1 : a.score;
      const bScore = isNA(b.score) ? -1 : b.score;

      if (aScore > bScore) return -1;
      if (aScore < bScore) return 1;
      return 0;
    });

  return (
    <div className="flex font-circular text-xxs">
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
        {sortedScores.map(({company, score}) => {
          return (
            <div
              key={`companies-chart-bar-${company}`}
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
                    key={company}
                    value={score}
                    width={8}
                    height={180}
                    orientation="vertical"
                    className={`text-cat-${category}`}
                  />
                  <GraphLabel
                    value={company}
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
