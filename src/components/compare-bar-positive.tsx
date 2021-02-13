import c from "clsx";
import Link from "next/link";
import React from "react";

import {IndicatorScore} from "../types";
import {isNA, scaleLinear} from "../utils";
import GraphLabel from "./graph-label";

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
  const percentage = scaleLinear([0, maxValue], [0, barHeight - 20])(value);

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
          height={percentage * tween}
          transform={`scale(1,-1) translate(0,-${barHeight})`}
        />
        <GraphLabel
          className={c(textClassName)}
          value={`${value}`}
          textAnchor="middle"
          transform={`translate(20,${barHeight - percentage - 10})`}
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
            "absolute transform -rotate-45 -translate-x-8 translate-y-40 mt-1 w-28 text-right",
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
