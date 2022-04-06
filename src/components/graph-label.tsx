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
        "select-none fill-current",
        {
          "font-black": bold,
          "text-xxs": size === "extra-small",
          "text-xs": size === "small",
          "text-lg": size === "large",
          "text-xl": size === "extra-large",
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
