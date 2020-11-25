import {arc, PieArcDatum} from "d3-shape";
import React from "react";

type Datum = PieArcDatum<number | {valueOf(): number}>;

interface CompanyScoreChartSliceProps {
  datum: Datum;
  innerRadius?: number;
  outerRadius?: number;
}

const CompanyScoreChartSlice = ({
  datum,
  outerRadius = 120,
  innerRadius = 110,
}: CompanyScoreChartSliceProps) => {
  const sliceRef = React.createRef<SVGGElement>();

  const sliceArc = arc<Datum>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .cornerRadius(90)
    .startAngle(datum.startAngle)
    .endAngle(datum.endAngle)(datum);

  return (
    <g className="text-cat-governance fill-current" ref={sliceRef}>
      <path d={sliceArc === null ? undefined : sliceArc} />
    </g>
  );
};

export default CompanyScoreChartSlice;
