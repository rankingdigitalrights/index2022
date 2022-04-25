import c from "clsx";
import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize} from "../hooks";

interface CompanyYearOverYearHeaderProps {
  years: string[];
  isNarrow: boolean;
  onHoverYear: (year?: string) => void;
  highlightedYear?: string;
}

const asteriskYears = new Set(["2020", "2022"]);

const NarrowYearText = ({
  year,
  isHighlighted,
}: {
  year: string;
  isHighlighted: boolean;
}) => {
  return (
    <text
      className={c("font-normal text-xs", {
        "font-bold fill-prissian": isHighlighted,
      })}
      x={asteriskYears.has(year) ? 3 : 10}
      y={asteriskYears.has(year) ? 4 : 4}
      transform="rotate(-45,26,56)"
    >
      {asteriskYears.has(year) ? `${year}*` : year}
    </text>
  );
};

const YearText = ({
  year,
  isHighlighted,
}: {
  year: string;
  isHighlighted: boolean;
}) => {
  return (
    <text
      className={c("font-normal text-xs", {
        "font-bold fill-prissian": isHighlighted,
      })}
      x={10}
      y={4}
    >
      {asteriskYears.has(year) ? `${year}*` : year}
    </text>
  );
};

const CompanyYearOverYearHeader = ({
  years,
  isNarrow,
  onHoverYear,
  highlightedYear,
}: CompanyYearOverYearHeaderProps) => {
  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = isNarrow ? 28 : 20;
  const insetRight = isNarrow ? 14 : 48;
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
    <div ref={chartRef} className="w-full h-14 md:h-8 font-sans">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full md:-mt-2"
        viewBox={`0 0 ${w} ${height}`}
        aria-label="Company year over year chart header."
      >
        {years.map((year) => {
          const isHighlighted = highlightedYear === year;

          return (
            <g
              key={`header-${year}`}
              className="select-none"
              transform={`translate(${x(year)},20)`}
              onMouseEnter={() => onHoverYear(year)}
              onMouseLeave={() => onHoverYear(undefined)}
            >
              <circle r="4" className={`fill-${year}`} />
              {isNarrow ? (
                <NarrowYearText year={year} isHighlighted={isHighlighted} />
              ) : (
                <YearText year={year} isHighlighted={isHighlighted} />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearHeader;
