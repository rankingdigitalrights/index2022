import React from "react";

import {IndicatorScore} from "../types";
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
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      return 0;
    });

  const gap = 6;
  const insetX = 45;
  const barWidth = Math.floor(
    (width - insetX - sortedScores.length * gap) / sortedScores.length,
  );

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
            <g>
              <PercentageBar
                key={company}
                value={score}
                width={barWidth}
                height={180}
                transform={`translate(${
                  (barWidth + gap) * idx + gap + insetX
                },0)`}
                orientation="vertical"
                roundedCorners={false}
                className={`text-cat-${category}`}
              />
              <GraphLabel
                value={company}
                size="small"
                transform={`translate(${
                  (barWidth + gap) * idx + 2 + insetX
                },190) rotate(90,0,6)`}
              />
            </g>
          );
        })}

        <line
          x1={insetX}
          y1="0"
          x2={width + insetX}
          y2="0"
          strokeWidth={2}
          className="text-disabled-dark stroke-current"
        />
        <line
          x1={insetX}
          y1="0"
          x2={insetX}
          y2={180}
          strokeWidth={2}
          className="text-disabled-dark stroke-current"
        />
        <line
          x1={insetX}
          y1={180}
          x2={width + insetX}
          y2={180}
          strokeWidth={2}
          className="text-disabled-dark stroke-current"
        />

        <GraphLabel
          value="100%"
          size="extra-small"
          transform={`translate(${insetX - gap},10)`}
          textAnchor="end"
          className="text-prissian stroke-current"
        />

        <GraphLabel
          value="0%"
          size="extra-small"
          transform={`translate(${insetX - gap},180)`}
          textAnchor="end"
          className="text-prissian stroke-current"
        />
      </svg>
    </div>
  );
};

export default IndicatorCompaniesChart;
