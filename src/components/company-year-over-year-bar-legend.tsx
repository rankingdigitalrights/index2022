import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize} from "../hooks";

const CompanyYearOverYearBarLegend = () => {
  const percentages = useMemo(() => ["0%", "25%", "50%", "75%", "100%"], []);

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = 10;
  const insetRight = 15;
  const padding = 10;
  // The real width of the graph.
  const w = width - insetLeft - insetRight;

  const x = useMemo(
    () =>
      scalePoint()
        .domain(percentages)
        .range([0 + padding, w - padding]),
    [w, padding, percentages],
  );

  return (
    <div ref={chartRef} className="w-full h-8 px-1">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox={`0 0 ${w} ${height}`}
        aria-label="Company year over year bar legend."
      >
        {percentages.map((percentage) => {
          let mod = 0;
          switch (percentage) {
            case "0%": {
              mod = 4;
              break;
            }
            case "25%": {
              mod = 10;
              break;
            }
            case "50%": {
              mod = 10;
              break;
            }
            case "75%": {
              mod = 7;
              break;
            }
            case "100%": {
              mod = 29;
              break;
            }
            default:
          }
          return (
            <g
              key={`legend-${percentage}`}
              transform={`translate(${(x(percentage) || 0) - mod},20)`}
              className="border border-red-500"
            >
              <text className="font-normal text-xs" x={0} y={0}>
                {percentage}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearBarLegend;
