import c from "clsx";
import React from "react";
import {useTween} from "react-use";

import {IndicatorScore} from "../types";
import {isNA, scaleLinear} from "../utils";

interface PercentageBarProps {
  value: IndicatorScore;
  width: number;
  isHighlighted?: boolean;
  height?: number;
  transform?: string;
  className?: string;
  roundedCorners?: boolean;
}

/*
 * The percentage bar is a horizontal bar that renders it's value as a
 * percentage and fills up the rest to 100% as a background bar.
 */
const PercentageBar = ({
  value,
  width,
  isHighlighted = false,
  className,
  height = 5,
  transform = "translate(0,0)",
  roundedCorners = true,
}: PercentageBarProps) => {
  const t = useTween("inOutQuad", 800);
  const rx = roundedCorners ? 5 : 0;

  if (isNA(value))
    return (
      <rect
        className="text-disabled-light fill-current"
        x={0}
        rx={rx}
        width={width}
        height={height}
        transform={transform}
      />
    );

  const percentage = scaleLinear([0, 100], [0, width])(value) * t;

  return (
    <g>
      <path
        className={c("hover-colors", className)}
        d={`M 0,0
        h ${percentage}
        q ${rx},0 ${rx},${rx}
        v ${height - rx}
        q 0,${rx} -${rx},${rx}
        h -${percentage}
        z
        `}
        transform={transform}
      />

      {isHighlighted && (
        <g>
          <rect
            x={percentage + 20}
            y="-7"
            width="36"
            height="23"
            stroke="none"
            fill="white"
            strokeWidth="0.4"
            ry="12"
            rx="12"
            filter="url(#shadow)"
          />
          <text
            className={c("font-san text-xs", {
              "fill-prissian font-bold": isHighlighted,
            })}
            x={percentage + 25}
            y={9}
          >
            {value}%
          </text>
        </g>
      )}
    </g>
  );
};

export default PercentageBar;
