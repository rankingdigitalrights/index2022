import {scaleLinear, scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize} from "../hooks";
import type {CompanyCategoryYearOverYear} from "../types";

interface CompanyYearOverYearChartProps {
  data: CompanyCategoryYearOverYear;
}

type ScorePair = [{year: string; score: number}, {year: string; score: number}];

const CompanyYearOverYearChart = ({data}: CompanyYearOverYearChartProps) => {
  const years = data.scores.map(({year}) => year.toString());

  const scores = data.scores
    .filter(({score}) => score !== "NA")
    .map(
      ({year, ...rest}) =>
        ({...rest, year: year.toString()} as {year: string; score: number}),
    );

  const yearScorePairs = years.reduce((memo, year, idx) => {
    const nextYear = years[idx + 1];

    const a = scores.find((d) => d.year === year);
    const b = scores.find((d) => d.year === nextYear);

    if (a && b) return [...memo, [a, b]] as ScorePair[];

    return memo;
  }, [] as ScorePair[]);

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left x axis.
  const insetX = 38;
  // Insets the graph on the bottom y axis.
  const insetY = 22;
  // The real width of the graph.
  const w = width - insetX;
  // The real height of the graph.
  const h = height - insetY;
  // The padding of the graph elements on the x axis
  const padding = 25;

  const x = useMemo(
    () =>
      scalePoint()
        .domain(years)
        .range([insetX + padding, w - padding]),
    [w, insetX, years, padding],
  );

  const y = useMemo(() => scaleLinear().domain([0, 100]).range([h, 0]), [h]);

  return (
    <div ref={chartRef} className="w-full h-72 ml-2 px-1">
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
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

        <text className="text-xs" x={30} y={0} dy={insetY / 2} dx="-30">
          100%
        </text>

        <text className="text-xs" x={30} y={h} dx="-17">
          0%
        </text>

        <line stroke="#D6C9C9" x1={insetX} x2={insetX} y1={h} y2="0" />
        <line stroke="#D6C9C9" x1={insetX} x2={w} y1={h} y2={h} />

        {years.map((year) => {
          return (
            <text
              className="text-xs"
              key={`year-label-${data.company}-${year}`}
              x={x(year)}
              y={height}
              dx="-12"
            >
              {year}
            </text>
          );
        })}

        {yearScorePairs.map(([a, b]) => {
          return (
            <line
              key={`slope-line-${data.company}-${a.year}-${b.year}`}
              stroke="#D6C9C9"
              x1={x(a.year)}
              x2={x(b.year)}
              y1={y(a.score)}
              y2={y(b.score)}
            />
          );
        })}

        {scores.map(({year, score}) => {
          return (
            <line
              key={`lines-${data.company}-${year}`}
              stroke="#D6C9C9"
              x1={x(year)}
              x2={x(year)}
              y1={h}
              y2={y(score)}
            />
          );
        })}

        {scores.map(({year, score}) => {
          return (
            <g
              key={`dots-${data.company}-${year}`}
              transform={`translate(${x(year)},${y(score)})`}
            >
              <circle r="4" className={`fill-${year}`} />
            </g>
          );
        })}

        {scores.map(({year, score}) => {
          return (
            <g
              key={`labels-${data.company}-${year}`}
              transform={`translate(${(x(year) || 0) - 28},${
                (y(score) || 0) - 43
              })`}
            >
              <rect
                x="10"
                y="10"
                width="36"
                height="23"
                stroke="none"
                fill="white"
                strokeWidth="0.4"
                ry="12"
                rx="12"
                filter="url(#shadow)"
              />
              <text className="text-xs" x={16} y={26}>
                {score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearChart;
