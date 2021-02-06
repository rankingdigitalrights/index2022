import c from "clsx";
import {scaleLinear} from "d3-scale";
import Link from "next/link";
import React from "react";

import {IndicatorScore} from "../types";
import {isNA} from "../utils";

export interface CompareBarProps {
  company: string;
  score: IndicatorScore;
  maxValue: number;
  tween: number;
  height: number;
  isHighlighted: boolean;
  href: string;
  className?: string;
}

const CompareBarPositive = ({
  company,
  score,
  maxValue,
  tween,
  height,
  isHighlighted,
  href,
  className,
}: CompareBarProps) => {
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
    <div
      className={c(
        "relative h-full flex flex-col items-center font-circular text-sm",
        className,
      )}
    >
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
      <Link passHref href={href}>
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

export default CompareBarPositive;
