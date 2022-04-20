import {scaleLinear, scalePoint} from "d3";
import React, {useMemo} from "react";

import {useChartResize, useMobileSize} from "../hooks";
import type {CompanyYearOverYear} from "../types";

interface CompanyYearOverYearSlopeChartProps {
  data: CompanyYearOverYear;
}

type ScorePair = [{year: string; score: number}, {year: string; score: number}];

const CompanyYearOverYearSlopeChart = ({
  data,
}: CompanyYearOverYearSlopeChartProps) => {
  const isMobile = useMobileSize(768);
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

  const maxScore = scores.reduce(
    (memo, {score}) => (score > memo ? score : memo),
    0,
  );
  const minScore = scores.reduce(
    (memo, {score}) => (score < memo ? score : memo),
    100,
  );

  const [chartRef, width, height] = useChartResize();

  // Insets the graph on the left and right.
  const insetLeft = isMobile ? 28 : 30;
  const insetRight = isMobile ? 14 : 18;
  // Insets the graph on the bottom y axis.
  const insetY = 22;
  // The real width of the graph.
  const w = width - insetLeft - insetRight;
  // The real height of the graph.
  const h = height - insetY;

  const x = useMemo(
    () =>
      scalePoint()
        .domain(years)
        .range([insetLeft, w - insetRight]),
    [w, insetLeft, insetRight, years],
  );

  const y = useMemo(
    () =>
      scaleLinear()
        .domain([minScore - 5, maxScore + 20])
        .range([h, 0]),
    [h, minScore, maxScore],
  );

  return (
    <div ref={chartRef} className="w-full h-20 font-sans">
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
                x={isMobile ? "11" : "10"}
                y={isMobile ? "12" : "10"}
                width={isMobile ? "30" : "36"}
                height={isMobile ? "20" : "23"}
                stroke="none"
                fill="white"
                strokeWidth="0.4"
                ry="12"
                rx="12"
                filter="url(#shadow)"
              />
              <text className={isMobile ? "text-xxs" : "text-xs"} x={16} y={26}>
                {score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CompanyYearOverYearSlopeChart;
