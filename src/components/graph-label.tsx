import c from "clsx";
import React from "react";

interface GraphLabelProps {
  value: string;
  size?: "extra-small" | "small" | "regular" | "large" | "extra-large";
  transform?: string;
  textAnchor?: "start" | "middle" | "end";
  bold?: boolean;
  debug?: boolean;
  className?: string;
}

/*
 * A label to use in a graph.
 */
const GraphLabel = ({
  value,
  size = "regular",
  transform = "translate(0,0)",
  textAnchor = "start",
  bold = false,
  debug = false,
  className,
}: GraphLabelProps) => {
  return (
    <text
      transform={transform}
      textAnchor={textAnchor}
      className={c(
        "select-none",
        {
          "font-black": bold,
          "text-xxs font-circular": size === "extra-small",
          "text-xs font-circular": size === "small",
          "text-lg font-platform": size === "large",
          "text-xl font-platform": size === "extra-large",
          "border border-yellow-400": debug,
        },
        className,
      )}
    >
      {value}
    </text>
  );
};

export default GraphLabel;
