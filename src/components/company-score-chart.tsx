import c from "clsx";
import {arc, pie, PieArcDatum} from "d3-shape";
import React, {useRef, useState} from "react";

import {IndicatorCategory} from "../types";
import {mapCategoryName} from "../utils";
import GraphLabel from "./graph-label";

type Datum = PieArcDatum<number | {valueOf(): number}>;

export interface CompanyScoreChartProps {
  category: IndicatorCategory;
  score: number;
  isPrint?: boolean;
}

const CompanyScoreChart = ({
  category,
  score,
  isPrint = false,
}: CompanyScoreChartProps) => {
  // eslint-disable-next-line unicorn/no-null
  const sliceRef = useRef<SVGGElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // eslint-disable-next-line unicorn/no-null
  const [datum] = pie().sort(null)([score, 100 - score]);

  const outerRadius = isPrint ? 75 : 95;
  const innerRadius = isPrint ? 65 : 85;
  const portSize = isPrint ? 200 : 260;

  const sliceArc = arc<Datum>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(90)
    .startAngle(datum.startAngle)
    .endAngle(datum.endAngle)(datum);

  const sliceClassName = c("fill-current", {
    "text-cat-governance": category === "governance" && !isHighlighted,
    "text-cat-freedom": category === "freedom" && !isHighlighted,
    "text-cat-privacy": category === "privacy" && !isHighlighted,
    "text-prissian": isHighlighted,
  });

  return (
    <div
      className="p-4 m-4 print:m-2 flex flex-col items-center w-64 print:w-48 no-page-break"
      onMouseEnter={() => setIsHighlighted(true)}
      onMouseLeave={() => setIsHighlighted(false)}
    >
      <span
        className={c(
          "font-circular font-black text-center",
          isPrint ? "text-sm" : "text-md",
        )}
      >
        {mapCategoryName(category)}
      </span>

      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${portSize} ${portSize}`}
      >
        <g transform={`translate(${outerRadius + 35},${outerRadius + 30})`}>
          <circle
            r={(outerRadius + innerRadius) / 2}
            stroke="#1C5275"
            strokeWidth="2"
            fill="none"
          />

          <g className={sliceClassName} ref={sliceRef}>
            <path d={sliceArc === null ? undefined : sliceArc} />
          </g>

          <GraphLabel
            transform="translate(0,5)"
            value={`${score}%`}
            textAnchor="middle"
            size="large"
            bold
          />
        </g>
      </svg>
    </div>
  );
};

export default CompanyScoreChart;
