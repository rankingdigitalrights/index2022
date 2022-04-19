import c from "clsx";
import React from "react";

import Down from "../images/icons/axis-down.svg";
import Up from "../images/icons/axis-up.svg";

interface FlipAxisProps {
  label: string;
  onChange: (toggle: boolean) => void;
  toggle: boolean;
  className?: string;
}

const FlipAxis = ({label, toggle, onChange, className}: FlipAxisProps) => {
  const handleToggle = () => onChange(!toggle);

  return (
    <div className={c("flex items-center font-sans", className)}>
      <label htmlFor="toggle" className="text-sm mr-2">
        {label}
      </label>
      <button
        className="relative inline-block w-5 align-middle select-none transition duration-200 ease-in"
        onClick={handleToggle}
        aria-label="Flip-Axis"
      >
        {toggle ? <Up /> : <Down />}
      </button>
    </div>
  );
};

export default FlipAxis;
