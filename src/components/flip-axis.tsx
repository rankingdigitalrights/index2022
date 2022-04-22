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
    <div
      className={c("flex items-center font-sans", disabledClassName, className)}
    >
      <label htmlFor="toggle" className="text-sm mr-2">
        {label}
      </label>
      <button
        className="relative inline-block w-5 align-middle select-none transition duration-200 ease-in"
        onClick={handleToggle}
        aria-label="Flip-Axis"
        disabled={disabled}
      >
        {flip ? <Up /> : <Down />}
      </button>
    </div>
  );
};

export default FlipAxis;
