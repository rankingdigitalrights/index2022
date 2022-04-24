import {scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize} from "../hooks";
import type {CompanyYearOverYear} from "../types";
import PercentageBar from "./company-year-over-year-percentage-bar";

interface CompanyYearOverYearBarChartProps {
  data: CompanyYearOverYear;
  highlightedYear?: string;
}

const CompanyYearOverYearBarChart = ({
  data,
  highlightedYear,
}: CompanyYearOverYearBarChartProps) => {
  const percentages = useMemo(() => ["0%", "25%", "50%", "75%", "100%"], []);
  const years = data.scores.map(({year}) => year.toString());

  const scores = data.scores
    .filter(({score}) => score !== "NA")
    .map(
      ({year, ...rest}) =>
        ({...rest, year: year.toString()} as {year: string; score: number}),
    );

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = 10;
  const insetRight = 15;
  // The real width of the graph.
  const w = width - insetLeft - insetRight;
  const padding = 0;
  const paddingTop = 20;
  const paddingBottom = 20;
  const h = height - paddingTop - paddingBottom;

  const xPercentage = useMemo(
    () =>
      scalePoint()
        .domain(percentages)
        .range([0 + padding, w - padding]),
    [w, padding, percentages],
  );

  const yYears = useMemo(
    () =>
      scalePoint()
        .domain(years.reverse())
        .range([h - 10, 0]),
    [h, years],
  );

  return (
    <div ref={chartRef} className="w-full h-28 pl-1 font-sans">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox={`0 0 ${w} ${height}`}
        aria-label={`Company year over year chart for ${data.companyPretty}`}
      >
        {percentages.map((p) => {
          return (
            <line
              key={`bar-grid-${data.company}-${p}`}
              stroke="#D6C9C9"
              x1={xPercentage(p)}
              x2={xPercentage(p)}
              y1="0"
              y2={height}
            />
          );
        })}

        {scores.map(({year, score}) => {
          const isHighlighted = year === highlightedYear;

          return (
            <g
              key={`bar-${data.company}-${year}`}
              transform={`translate(${xPercentage("0%")},${
                (yYears(year) || 0) + paddingTop
              })`}
            >
              <PercentageBar
                value={score}
                width={w}
                height={6}
                className={isHighlighted ? "fill-prissian" : `fill-${year}`}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearBarChart;
