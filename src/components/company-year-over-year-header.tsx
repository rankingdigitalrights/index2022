import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize, useMobileSize} from "../hooks";

interface CompanyYearOverYearHeaderProps {
  years: string[];
}

const asteriskYears = new Set(["2020", "2022"]);

const CompanyYearOverYearHeader = ({years}: CompanyYearOverYearHeaderProps) => {
  const isMobile = useMobileSize(768);

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = isMobile ? 28 : 30;
  const insetRight = isMobile ? 14 : 18;
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
    <div ref={chartRef} className="w-full h-16 font-sans">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox={`0 0 ${w} ${height}`}
        aria-label="Company year over year chart header."
      >
        {years.map((year) => {
          return (
            <g key={`header-${year}`} transform={`translate(${x(year)},20)`}>
              <circle r="4" className={`fill-${year}`} />
              <text
                className="font-normal text-xs"
                x={asteriskYears.has(year) ? 3 : 10}
                y={asteriskYears.has(year) ? 4 : 4}
                transform="rotate(-45,26,56)"
              >
                {asteriskYears.has(year) ? `${year}*` : year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearHeader;
