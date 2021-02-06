import c from "clsx";
import {scaleLinear} from "d3-scale";
import Link from "next/link";
import React, {useState} from "react";
import {useTween} from "react-use";

import {useChartResize} from "../hooks";
import {CompanyScoreDiff, IndicatorScore} from "../types";
import {isNA, isNumber} from "../utils";

interface CompareScoresChartProps {
  scores: CompanyScoreDiff[];
  className?: string;
}

interface CompareScoreBarProps {
  id: string;
  company: string;
  score: IndicatorScore;
  maxValue: number;
  tween: number;
  height: number;
  isHighlighted: boolean;
}

const PositiveScoreBar = ({
  id,
  company,
  score,
  maxValue,
  tween,
  height,
  isHighlighted,
}: CompareScoreBarProps) => {
  const value = isNA(score) ? 0 : score;
  const barHeight = height / 2;
  const lineOffset = 2;
  const valueScale = scaleLinear().domain([0, maxValue]).range([0, barHeight]);
  const percentage = (valueScale(value) || 0) * tween;

  const barClassName = {
    "text-prissian": isHighlighted,
    "text-diff-add": !isHighlighted,
  };

  const textClassName = {
    "text-prissian": isHighlighted,
    "text-black": !isHighlighted,
  };

  return (
    <div className="relative h-full flex flex-col items-center font-circular text-sm">
      <span className={c("font-bold mb-1", textClassName)}>{value}</span>

      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={barHeight + lineOffset}
        transform="translate(0, 0)"
        className=""
      >
        <rect
          className={c("fill-current", barClassName)}
          x={7}
          y={0}
          rx={2}
          width={26}
          height={percentage}
          transform={`scale(1,-1) translate(0,-${barHeight})`}
        />
        <line
          x1={0}
          y1={0}
          x2={40}
          y2={0}
          strokeWidth={2}
          transform={`scale(1,-1) translate(0,-${barHeight})`}
          className="text-black stroke-current"
        />
      </svg>
      <Link passHref href={`/companies/${id}`}>
        <a
          className={c(
            "absolute transform -rotate-45 -translate-x-8 translate-y-44 mt-2 w-28 text-right",
            textClassName,
          )}
        >
          {company}
        </a>
      </Link>
    </div>
  );
};

const NegativeScoreBar = ({
  id,
  company,
  score,
  maxValue,
  tween,
  height,
  isHighlighted,
}: CompareScoreBarProps) => {
  const value = isNA(score) ? 0 : score;
  const barHeight = height / 2;
  const valueScale = scaleLinear().domain([0, maxValue]).range([0, barHeight]);
  const percentage = valueScale(value) || 0;

  const barClassName = {
    "text-prissian": isHighlighted,
    "text-diff-del": !isHighlighted,
  };

  const textClassName = {
    "text-prissian": isHighlighted,
    "text-black": !isHighlighted,
  };

  return (
    <div className="relative h-full flex flex-col items-center font-circular text-sm">
      <Link passHref href={`/companies/${id}`}>
        <a
          className={c(
            "absolute transform -rotate-45 translate-x-7 translate-y-20 mt-1 w-28 z-10",
            textClassName,
          )}
        >
          {company}
        </a>
      </Link>

      <span className="font-bold mb-1">&nbsp;</span>
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={barHeight + 15}
        transform="translate(0, 0)"
      >
        <rect
          className={c("fill-current", barClassName)}
          x={7}
          y={0}
          rx={2}
          width={26}
          height={percentage * tween}
          transform={`translate(0,${barHeight})`}
        />
        <line
          x1={0}
          y1={0}
          x2={40}
          y2={0}
          strokeWidth={2}
          transform={`translate(0,${barHeight})`}
          className="text-black stroke-current"
        />
      </svg>

      <span className={c("font-bold", textClassName)}>{value}</span>
    </div>
  );
};

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
          height={chartHeight / 2 + 15}
          transform="translate(0, 0)"
          className=""
        />
        <span className="font-circular text-sm mr-2">0</span>
      </div>

      {scores
        .filter(({score}) => score !== "NA")
        .map(({id, company, score}) => {
          const isPositive = score >= 0;
          const isHighlightedCompany = id === highlightedCompany;

          return (
            <div
              key={id}
              onMouseEnter={() => setHighlightedCompany(id)}
              onMouseLeave={() => setHighlightedCompany(undefined)}
            >
              {isPositive ? (
                <div className="h-full">
                  <PositiveScoreBar
                    id={id}
                    company={company}
                    score={score}
                    maxValue={maxScore}
                    tween={t}
                    height={chartHeight}
                    isHighlighted={isHighlightedCompany}
                  />
                </div>
              ) : (
                <div className="h-full">
                  <NegativeScoreBar
                    id={id}
                    company={company}
                    score={score}
                    maxValue={maxScore * -1}
                    tween={t}
                    height={chartHeight}
                    isHighlighted={isHighlightedCompany}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CompareScoresChart;
