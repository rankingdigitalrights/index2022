import React from "react";

import {IndicatorScore} from "../types";
import {isNA} from "../utils";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface IndicatorCompaniesChartProps {
  category: string;
  scores: Record<string, IndicatorScore>;
  width?: number;
  height?: number;
}

const IndicatorCompaniesChart = ({
  category,
  scores,
  width = 600,
  height = 250,
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

  const gap = 17;
  const insetX = 44;
  const barWidth = 8;

  return (
    <div>
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        transform="translate(0, 0)"
      >
        {sortedScores.map(({company, score}, idx) => {
          return (
            <g key={`companies-chart-bar-${company}`}>
              <GraphLabel
                value={score.toString()}
                size="extra-small"
                textAnchor="middle"
                transform={`translate(${
                  (barWidth + gap) * idx + 21 + insetX
                },10)`}
                className="text-prissian stroke-current"
              />
              <PercentageBar
                key={company}
                value={score}
                width={barWidth}
                height={180}
                transform={`translate(${
                  (barWidth + gap) * idx + gap + insetX
                },20)`}
                orientation="vertical"
                className={`text-cat-${category}`}
              />
              <GraphLabel
                value={company}
                size="small"
                textAnchor="end"
                transform={`translate(${
                  (barWidth + gap) * idx + 31 + insetX
                },210) rotate(270,0,6)`}
                className="text-prissian stroke-current"
              />
            </g>
          );
        })}

        <line
          x1={insetX}
          y1="30"
          x2={insetX}
          y2={190}
          strokeWidth={2}
          className="text-disabled-dark stroke-current"
        />

        <GraphLabel
          value="100%"
          size="extra-small"
          transform={`translate(${insetX - gap},30)`}
          textAnchor="end"
          className="text-prissian stroke-current"
        />

        <GraphLabel
          value="0%"
          size="extra-small"
          transform={`translate(${insetX - gap},200)`}
          textAnchor="end"
          className="text-prissian stroke-current"
        />
      </svg>
    </div>
  );
};

export default IndicatorCompaniesChart;
