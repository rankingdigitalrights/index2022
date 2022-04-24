import c from "clsx";
import React from "react";

interface ToggleLabelProps {
  id: string;
  label: string;
  className?: string;
}

const ToggleLabel = ({id, label, className}: ToggleLabelProps) => {
  return (
    <span className="ml-3 mr-2" id={id}>
      <span
        className={c(
          "text-sm",
          "transform-gpu transition-opacity ease-in-out duration-200",
          className,
        )}
      >
        {label}
      </span>
    </span>
  );
};

export default ToggleLabel;
