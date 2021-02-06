import c from "clsx";
import React from "react";
import {useTween} from "react-use";

import {IndicatorScore} from "../types";
import {isNA, isNumber, scaleLinear} from "../utils";

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
      <rect
        className="text-disabled-light fill-current"
        x={0}
        rx={rx}
        width={width}
        height={height}
        transform={transform}
      />
    );

  // Some percentage bars have to render as well when generating a PDF. Printing
  // to PDF using Puppeteer doesn't trigger the resize event handler and the bars
  // render too short. In those case I supply 100% as width and render the value
  // on a scale of 0-100.
  let percentage: string | number = 0;

  if (isNumber(width)) {
    percentage =
      scaleLinear(
        [0, 100],
        [0, orientation === "horizontal" ? width : height],
      )(value) * t;
  } else if (width === "100%") {
    const percentageRaw = scaleLinear([0, 100], [0, 100])(value);
    percentage = `${percentageRaw}%`;
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
