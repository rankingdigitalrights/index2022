import c from "clsx";
import React from "react";

import {scaleLinear} from "../utils";

interface PercentageCircleProps {
  value: number;
  width: number;
  height?: number;
  transform?: string;
  className?: string | Record<string, boolean>;
}

/*
 * The percentage bar is a horizontal bar that renders it's value as a
 * percentage and fills up the rest to 100% as a background bar.
 */
const PercentageCircle = ({
  value,
  width,
  height = 8,
  transform = "translate(0,0)",
  className,
}: PercentageCircleProps) => {
  const percentage = scaleLinear([0, 100], [0, width])(value);

  return (
    <g transform={transform}>
      <rect
        className={c("fill-current", className)}
        x={0}
        width={percentage}
        height={height}
      />
      <rect
        className="text-cat-negative fill-current"
        x={percentage}
        width={width - percentage}
        height={height}
      />
    </g>
  );
};

export default PercentageCircle;
