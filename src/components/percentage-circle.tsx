import c from "clsx";
import {scaleLinear} from "d3-scale";
import React from "react";

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
  const valueWidth = scaleLinear().domain([0, 100]).range([0, width]);

  const percentage = valueWidth(value) || 0;

  return (
    <g transform={transform}>
      <rect
        className={c("fill-current", className)}
        x={0}
        width={percentage}
        height={height}
      />
      <rect
        className="text-vis-negative fill-current"
        x={percentage}
        width={width - percentage}
        height={height}
      />
    </g>
  );
};

export default PercentageCircle;
