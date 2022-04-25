import c from "clsx";
import React, {useState} from "react";
import {useTween} from "react-use";

import {useChartResize} from "../hooks";
import {CompanyScoreDiff} from "../types";
import {isNumber} from "../utils";
import CompareBarNegative from "./compare-bar-negative";
import CompareBarPositive from "./compare-bar-positive";

interface CompareScoresChartProps {
  scores: CompanyScoreDiff[];
  className?: string;
}

const CompareScoresChart = ({scores, className}: CompareScoresChartProps) => {
  const [chartRef, , chartHeight] = useChartResize();
  const t = useTween("inOutQuad", 800);
  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const maxScore = scores.reduce((memo, {score}) => {
    if (isNumber(score) && score > memo) return score;
    return memo;
  }, 0);

  return (
    <div ref={chartRef} className={c("flex h-60", className)}>
      <div className="flex flex-col h-full">
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          width={0}
          height={chartHeight / 2 - 11}
          transform="translate(0, 0)"
          aria-label="Empty spacer element"
        />
        <span className="text-sm mr-2 font-sans">0</span>
      </div>

      {scores
        .filter(({score}) => score !== "NA")
        .map(({id, company, score}) => {
          const isPositive = score >= 0;
          const isHighlightedCompany = id === highlightedCompany;
          const href = `/companies/${id}`;

          return (
            <div
              key={id}
              onMouseEnter={() => setHighlightedCompany(id)}
              onMouseLeave={() => setHighlightedCompany(undefined)}
            >
              {isPositive ? (
                <CompareBarPositive
                  company={company}
                  score={score}
                  maxValue={maxScore}
                  tween={t}
                  height={chartHeight}
                  isHighlighted={isHighlightedCompany}
                  href={href}
                />
              ) : (
                <CompareBarNegative
                  company={company}
                  score={score}
                  maxValue={maxScore * -1}
                  tween={t}
                  height={chartHeight}
                  isHighlighted={isHighlightedCompany}
                  href={href}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CompareScoresChart;
