import c from "clsx";
import Link from "next/link";
import React from "react";

import {isNA, scaleLinear} from "../utils";
import {CompareBarProps} from "./compare-bar-positive";

const CompareBarNegative = ({
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
  const percentage = scaleLinear([0, maxValue], [0, barHeight - 20])(value);

  const barClassName = {
    "text-prissian": isHighlighted,
    "text-diff-del": !isHighlighted,
  };

  const textClassName = {
    "text-prissian": isHighlighted,
    "text-black": !isHighlighted,
  };

  return (
    <div
      className={c(
        "relative h-full flex flex-col items-center text-sm",
        className,
      )}
    >
      <Link passHref href={href}>
        <a
          className={c(
            "absolute font-sans font-normal transform -rotate-45 translate-x-7 translate-y-14 mt-1 w-28 z-10",
            textClassName,
          )}
        >
          {company}
        </a>
      </Link>

      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={barHeight + 15}
        transform="translate(0, 0)"
        aria-label="Comparison chart bar"
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

      <span className={c(textClassName)}>{value}</span>
    </div>
  );
};

export default CompareBarNegative;
