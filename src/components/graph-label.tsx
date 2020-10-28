import c from "clsx";
import React from "react";

interface GraphLabelProps {
  value: string;
  size?: "small" | "regular" | "large" | "extra-large";
  transform?: string;
  textAnchor?: "left" | "middle" | "right";
  bold?: boolean;
}

/*
 * A label to use in a graph.
 */
const GraphLabel = ({
  value,
  size = "regular",
  transform = "translate(0,0)",
  textAnchor = "left",
  bold = false,
}: GraphLabelProps) => {
  const className = {
    "font-simplon-light": !bold,
    "font-simplon-bold": bold,
    "text-sm": size === "small",
    "text-lg": size === "large",
    "text-2xl": size === "extra-large",
  };

  return (
    <text
      transform={transform}
      textAnchor={textAnchor}
      className={c(className)}
    >
      {value}
    </text>
  );
};

export default GraphLabel;
