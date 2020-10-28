import c from "clsx";
import {arc, PieArcDatum} from "d3-shape";
import React from "react";

import {ScoreCategory} from "../types";

type Datum = PieArcDatum<number | {valueOf(): number}>;

interface CompanyScoreChartSliceProps {
  datum: Datum;
  category?: ScoreCategory;
}

const CompanyScoreChartSlice = ({
  datum,
  category,
}: CompanyScoreChartSliceProps) => {
  const sliceRef = React.createRef<SVGGElement>();

  const outerRadius = 120;
  const innerRadius = 110;

  const sliceArc = arc<Datum>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(datum.startAngle)
    .endAngle(datum.endAngle)(datum);

  return (
    <g
      className={c("fill-current", {
        "text-governance": category === "governance",
        "text-freedom": category === "freedom",
        "text-privacy": category === "privacy",
        "text-vis-negative": category === undefined,
      })}
      ref={sliceRef}
    >
      <path d={sliceArc === null ? undefined : sliceArc} />
    </g>
  );
};

export default CompanyScoreChartSlice;
