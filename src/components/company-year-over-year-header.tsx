import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize, useMobileSize} from "../hooks";

interface CompanyYearOverYearHeaderProps {
  years: string[];
}

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
    <div ref={chartRef} className="w-full h-16">
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
                x={10}
                y={4}
                transform="rotate(-45,26,56)"
              >
                {year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearHeader;
