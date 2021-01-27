import c from "clsx";
import {scaleLinear} from "d3-scale";
import React from "react";
import {useTween} from "react-use";

import {IndicatorScore} from "../types";
import {isNA, isNumber} from "../utils";

interface PercentageBarProps {
  value: IndicatorScore;
  width: number | "100%";
  height?: number;
  transform?: string;
  className?: string | Record<string, boolean>;
  orientation?: "horizontal" | "vertical";
  roundedCorners?: boolean;
}

/*
 * The percentage bar is a horizontal bar that renders it's value as a
 * percentage and fills up the rest to 100% as a background bar.
 */
const PercentageBar = ({
  value,
  width,
  className,
  height = 8,
  transform = "translate(0,0)",
  orientation = "horizontal",
  roundedCorners = true,
}: PercentageBarProps) => {
  const t = useTween("inOutQuad", 800);
  const rx = roundedCorners ? 5 : 0;

  if (isNA(value))
    return (
      <g width={width} transform={transform}>
        <rect
          className="text-disabled-light fill-current"
          x={0}
          rx={rx}
          width={width}
          height={height}
        />
      </g>
    );

  // Some percentage bars have to render as well when generating a PDF. Printing
  // to PDF using Puppeteer doesn't trigger the resize event handler and the bars
  // render too short. In those case I supply 100% as width and render the value
  // on a scale of 0-100.
  let percentage: string | number = 0;

  if (isNumber(width)) {
    const valueScale = scaleLinear()
      .domain([0, 100])
      .range([0, orientation === "horizontal" ? width : height]);
    percentage = (valueScale(value) || 0) * t;
  } else if (width === "100%") {
    const valueScale = scaleLinear().domain([0, 100]).range([0, 100]);
    const scaledValue = valueScale(value) || 0;
    percentage = `${scaledValue}%`;
  }

  return (
    <g
      width={`${percentage}%`}
      transform={
        orientation === "horizontal"
          ? transform
          : `scale(1,-1) translate(0,-${height})`
      }
    >
      <rect
        className="text-cat-negative fill-current"
        x={0}
        rx={rx}
        width="100%"
        height={height}
      />
      <rect
        className={c("fill-current", className)}
        x={0}
        y={0}
        rx={rx}
        width={orientation === "horizontal" ? percentage : width}
        height={orientation === "vertical" ? percentage : height}
      />
    </g>
  );
};

export default PercentageBar;
