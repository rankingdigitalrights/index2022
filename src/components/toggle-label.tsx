import c from "clsx";
import React from "react";

interface ToggleLabelProps {
  id: string;
  label: string | ((c: string) => React.ReactNode);
  position: "left" | "right";
  className?: string;
}

export const isString = (x: unknown): x is string => {
  return typeof x === "string";
};

const ToggleLabel = ({id, label, position, className}: ToggleLabelProps) => {
  return (
    <span
      className={c({
        "mr-2": position === "left",
        "ml-2": position === "right",
      })}
      id={id}
    >
      {isString(label) ? (
        <span className={c("text-sm hover-opacity", className)}>{label}</span>
      ) : (
        label(c("text-sm hover-opacity", className))
      )}
    </span>
  );
};

export default ToggleLabel;
