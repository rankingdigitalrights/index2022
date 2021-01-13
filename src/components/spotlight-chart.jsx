import c from "clsx";
import React from "react";

import PercentageBar from "./percentage-bar";

// highlightedBar is the index number here, but could be something else.
const SpotlightChart = ({data, highlightedBar}) => {
  return (
    <div className="flex flex-col">
      {data.map(({id, name, value}, idx) => {
        const isActiveBar = idx === highlightedBar;

        const barClassName = c(
          isActiveBar ? "text-prissian" : "text-disabled-dark",
        );

        return (
          <div
            key={id}
            className="flex justify-between items-center font-circular text-xs"
          >
            <span>{name}</span>

            <svg
              className="ml-2"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              width={300}
              height={10}
              transform="translate(0, 0)"
            >
              <PercentageBar
                value={value}
                width={300}
                height={10}
                className={barClassName}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default SpotlightChart;
