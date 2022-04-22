/* eslint jsx-a11y/label-has-associated-control: off */
import c from "clsx";
import React from "react";

import Bars from "../images/icons/yoy-bars.svg";
import Lines from "../images/icons/yoy-lines.svg";

interface FlipTimeChartProps {
  onChange: (toggle: boolean) => void;
  toggle: boolean;
  className?: string;
}

const FlipTimeChart = ({toggle, onChange, className}: FlipTimeChartProps) => {
  const leftClassName = {
    "opacity-50": toggle,
  };

  const rightClassName = {
    "opacity-50": !toggle,
  };

  const handleToggle = () => onChange(!toggle);

  return (
    <div className={c("flex items-center font-sans", className)}>
      <label
        htmlFor="flip-time-chart"
        className={c("text-sm mr-2 flex items-center space-x-1", leftClassName)}
      >
        <span>Lines</span> <Lines className="w-6 h-6 hidden md:block" />
      </label>

      <button
        className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in"
        onClick={handleToggle}
        aria-label="Toggle switch"
      >
        <label
          htmlFor="flip-time-chart"
          className={c(
            "overflow-hidden h-5 rounded-full border-2 border-prissian cursor-pointer flex items-center",
            toggle ? "bg-prissian" : undefined,
          )}
        >
          <input
            type="checkbox"
            name="flip-time-chart"
            checked={toggle}
            className={c(
              "toggle-checkbox absolute block w-3 h-3 rounded-full appearance-none cursor-pointer",
              toggle ? "bg-beige" : "bg-prissian",
            )}
            onChange={handleToggle}
            aria-label="Toggle switch check mark"
          />
        </label>
      </button>
      <label
        htmlFor="flip-time-chart"
        className={c(
          "text-sm ml-2 flex items-center space-x-1",
          rightClassName,
        )}
      >
        <span>Bars</span> <Bars className="w-6 h-6 hidden md:block" />
      </label>
    </div>
  );
};

export default FlipTimeChart;
