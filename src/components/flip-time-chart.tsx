import c from "clsx";
import React from "react";

import Bars from "../images/icons/yoy-bars.svg";
import Lines from "../images/icons/yoy-lines.svg";

interface FlipTimeChartProps {
  label: string;
  onChange: (toggle: boolean) => void;
  toggle: boolean;
  className?: string;
}

const FlipTimeChart = ({
  label,
  toggle,
  onChange,
  className,
}: FlipTimeChartProps) => {
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
        {toggle ? <Bars /> : <Lines />}
      </button>
    </div>
  );
};

export default FlipTimeChart;
