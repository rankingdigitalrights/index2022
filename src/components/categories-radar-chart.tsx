import c from "clsx";
import {scaleOrdinal} from "d3-scale";
import {schemeTableau10} from "d3-scale-chromatic";
import React from "react";

import {CategoryCaption, CategoryScores} from "../types";
import GraphLabel from "./graph-label";

interface CategoriesRadarChartProps {
  scores: CategoryScores | CategoryScores[];
  scales?: number; // show scale circles.
  size?: number; // The height and width of the graph
  debug?: boolean; // enable debug mode.
}

type Column = {
  key: CategoryCaption;
  angle: number;
};

type ChartData = Record<CategoryCaption, number>;

const polarToX = (angle: number, distance: number): number =>
  Math.cos(angle - Math.PI / 2) * distance;

const polarToY = (angle: number, distance: number): number =>
  Math.sin(angle - Math.PI / 2) * distance;

const scaleGroups = (scales: number, size: number) => {
  return [...new Array(scales).keys()]
    .map((i) => i + 1) // This +1 adds an additional circle to the 100%
    .reverse()
    .map((i) => {
      const r = ((i / scales) * size) / 2;
      return (
        <circle
          key={`scale-${i}`}
          cx={0}
          cy={0}
          r={r}
          fill="#FAFAFA"
          stroke="#999"
          strokeWidth="0.2"
        />
      );
    });
};

// M :: moveTo - move the cursor to this position.
// L :: lineTo - draw a line from here to there.
// z :: closePath - close the path.
const pathDefinition = ([start, ...points]: number[][]) => {
  const d = points.reduce(
    (memo, point) =>
      memo.concat([`L${point[0].toFixed(4)},${point[1].toFixed(4)}`]),
    [`M${start[0].toFixed(4)},${start[1].toFixed(4)}`],
  );
  return d.concat(["z"]).join("");
};

const shapeGroups = (columns: Column[], size: number, data: ChartData[]) => {
  const color = scaleOrdinal(schemeTableau10);
  color.domain(data.map((_, i) => `${i}`));

  // FIXME: I don't like that I use JSON.stringify on d to create a unique key.
  return data.map((d, i) => {
    return (
      <path
        key={`shape-${JSON.stringify(d)}`}
        d={pathDefinition(
          columns.map(({key, angle}) => {
            const value = d[key] / 100;
            return [
              polarToX(angle, (value * size) / 2),
              polarToY(angle, (value * size) / 2),
            ];
          }),
        )}
        fill={color(`${i}`)}
        fillOpacity=".3"
      />
    );
  });
};

const pointsPath = (points: number[][]) => {
  return points
    .map((point) => `${point[0].toFixed(4)},${point[1].toFixed(4)}`)
    .join(" ");
};

const axisGroups = (columns: Column[], size: number) => {
  return columns.map(({key, angle}) => {
    return (
      <polyline
        key={`poly-axis-${key}`}
        points={pointsPath([
          [0, 0],
          [polarToX(angle, size / 2), polarToY(angle, size / 2)],
        ])}
        stroke="#555"
        strokeWidth=".2"
      />
    );
  });
};

const captionGroups = (columns: Column[], size: number) => {
  return columns.map(({key, angle}, i) => {
    const x = polarToX(angle, (size / 2) * 1.15);
    const y = polarToY(angle, (size / 2) * 1.15);
    let rotation = 0;

    // i === 1 => Freedom of Expression, bottom right
    if (i === 1) {
      rotation = -60;
    }

    // i === 2 => Privacy, bottom left
    if (i === 2) {
      rotation = 60;
    }

    return (
      <GraphLabel
        key={`caption-of-${key}`}
        transform={`translate(${x},${y}), rotate(${rotation})`}
        textAnchor="middle"
        value={key}
        size="large"
      />
    );
  });
};

const CategoriesRadarChart = ({
  scores,
  scales = 3,
  size = 300,
  debug = false,
}: CategoriesRadarChartProps) => {
  const data: ChartData[] = Array.isArray(scores)
    ? scores.map(({governance, freedom, privacy}) => ({
        Governance: governance,
        "Freedom of Expression": freedom,
        Privacy: privacy,
      }))
    : [
        {
          Governance: scores.governance,
          "Freedom of Expression": scores.freedom,
          Privacy: scores.privacy,
        },
      ];
  const captions: CategoryCaption[] = [
    "Governance",
    "Freedom of Expression",
    "Privacy",
  ];
  const columns: Column[] = captions.map((key, i, all) => {
    return {
      key,
      angle: (Math.PI * 2 * i) / all.length,
    };
  });

  const edge = 30;
  const middleOfChart = (size + edge) / 2;

  const scaleElems = scaleGroups(scales, size);
  const shapeElems = shapeGroups(columns, size, data);
  const axisElems = axisGroups(columns, size);
  const captionElems = captionGroups(columns, size);

  return (
    <svg
      className={c(debug ? "border border-yellow-300" : undefined)}
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`-${edge} -${edge} ${size + edge + 80} ${size + edge + 80}`}
    >
      <g transform={`translate(${middleOfChart},${middleOfChart})`}>
        {scaleElems}
        {shapeElems}
        {axisElems}
        {captionElems}
      </g>
    </svg>
  );
};

export default CategoriesRadarChart;
