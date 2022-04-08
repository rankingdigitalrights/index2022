import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize} from "../hooks";
import type {CompanyYearOverYear} from "../types";

interface CompanyYearOverYearSlopeHeaderProps {
  data: CompanyYearOverYear;
}

const CompanyYearOverYearSlopeHeader = ({
  data,
}: CompanyYearOverYearSlopeHeaderProps) => {
  const years = data.scores.map(({year}) => year.toString());

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = 20;
  const insetRight = 40;
  // The real width of the graph.
  const w = width - insetLeft - insetRight;

  const x = useMemo(
    () =>
      scalePoint()
        .domain(years)
        .range([insetLeft, w - insetRight]),
    [w, insetLeft, insetRight, years],
  );

  return (
    <div ref={chartRef} className="w-full h-8 px-1">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox={`0 0 ${w} ${height}`}
        aria-label={`Company year over year chart for ${data.companyPretty}`}
      >
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="-1.5"
              dy="1.5"
              stdDeviation="1"
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        {years.map((year) => {
          return (
            <g key={`header-${year}`} transform={`translate(${x(year)},20)`}>
              <circle r="4" className={`fill-${year}`} />
              <text className="font-normal text-xs" x={10} y={4}>
                {year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearSlopeHeader;
