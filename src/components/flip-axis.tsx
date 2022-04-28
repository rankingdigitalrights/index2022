import c from "clsx";
import React from "react";

import Down from "../images/icons/axis-down.svg";
import Up from "../images/icons/axis-up.svg";

interface FlipAxisProps {
  label: string;
  onChange: (flip: boolean) => void;
  flip: boolean;
  disabled?: boolean;
  className?: string;
}

const FlipAxis = ({
  label,
  onChange,
  flip,
  disabled = false,
  className,
}: FlipAxisProps) => {
  const disabledClassName = {
    "opacity-50": disabled,
  };

  const handleToggle = () => {
    onChange(!flip);
  };

  return (
    <button
      className={c(
        "flex items-center justify-end select-none hover-opacity",
        disabledClassName,
        className,
      )}
      onClick={handleToggle}
      aria-label="Flip-Axis"
      disabled={disabled}
    >
      <span className="font-sans text-sm mr-1 whitespace-nowrap">{label}</span>
      {flip ? <Up className="w-4 h-4" /> : <Down className="w-4 h-4" />}
    </button>
  );
};

export default FlipAxis;
