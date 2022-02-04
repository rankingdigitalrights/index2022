import c from "clsx";
import React from "react";

import {CompanyIndex, IndicatorNested} from "../types";
import {mapScore} from "../utils";
import GraphLabel from "./graph-label";

interface IndicatorScoresChartProps {
  companies: CompanyIndex[];
  gridSize?: number;
  debug?: boolean;
}

const indicatorLabelGroups = (size: number, labels: string[]) => {
  return labels.map((label, i) => {
    const x = 0;
    const y = size * i;

    return (
      <GraphLabel
        key={`indicator-label-${label}`}
        transform={`translate(${x},${y})`}
        textAnchor="end"
        value={label}
        size="small"
      />
    );
  });
};

const companyLabelGroups = (size: number, labels: string[]) => {
  return labels.map((label, i) => {
    const x = size * i;

    return (
      <GraphLabel
        key={`indicator-label-${label}`}
        transform={`translate(${x},0), rotate(90)`}
        textAnchor="start"
        value={label}
        size="small"
      />
    );
  });
};

const gridGroups = (size: number, rows: number, columns: number) => {
  const horizontalLines = [...new Array(rows + 1).keys()].map((i) => {
    const x1 = 0;
    const y1 = size * i;
    const x2 = size * columns;
    const y2 = size * i;

    return (
      <line
        key={`horizontal-line-${x1}-${y1}-${x2}-${y2}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#0C2637"
        fillOpacity=".2"
        strokeWidth="1"
      />
    );
  });

  const verticalLines = [...new Array(columns + 1).keys()].map((i) => {
    const x1 = size * i;
    const y1 = 0;
    const x2 = x1;
    const y2 = size * rows;

    return (
      <line
        key={`vertical-line-${x1}-${y1}-${x2}-${y2}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#0C2637"
        fillOpacity=".2"
        strokeWidth="1"
      />
    );
  });

  return (
    <g>
      {horizontalLines}
      {verticalLines}
    </g>
  );
};

const squareGroups = (
  size: number,
  companies: CompanyIndex[],
  governanceLabels: string[],
  freedomLabels: string[],
  privacyLabels: string[],
) => {
  const rect = (
    label: string,
    i: number,
    j: number,
    indicator: IndicatorNested | undefined,
  ) => {
    const score = indicator ? mapScore(indicator.score) : 0;
    const x = i * size;
    const y = j * size;

    return (
      <rect
        key={`value-rect-${label}`}
        x={x}
        y={y}
        width={size}
        height={size}
        fill="#0C2637"
        fillOpacity={`${Math.round(score / 10) * 10}%`}
      />
    );
  };

  return companies.map(({indicators}, i) => {
    // I track the number of rows here.
    let j = -1;
    return governanceLabels
      .map((label) => {
        const indicator = indicators.governance.find(
          (gIndicator) => gIndicator.indicator === label,
        );
        j += 1;
        return rect(label, i, j, indicator);
      })
      .concat(
        freedomLabels.map((label) => {
          const indicator = indicators.freedom.find(
            (fIndicator) => fIndicator.indicator === label,
          );
          j += 1;
          return rect(label, i, j, indicator);
        }),
      )
      .concat(
        privacyLabels.map((label) => {
          const indicator = indicators.privacy.find(
            (pIndicator) => pIndicator.indicator === label,
          );
          j += 1;
          return rect(label, i, j, indicator);
        }),
      );
  });
};

// FIXME: Break this chart apart and render each category of indicators
//        independently. Will make for cleaner code.
const IndicatorScoresChart = ({
  companies,
  gridSize = 40,
  debug = false,
}: IndicatorScoresChartProps) => {
  // Get a list of all indicator labels;
  const indicatorGovernanceLabels: string[] = [
    ...companies.reduce((memo, {indicators}) => {
      indicators.governance.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ].sort();

  const indicatorFreedomLabels: string[] = [
    ...companies.reduce((memo, {indicators}) => {
      indicators.freedom.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ].sort();

  const indicatorPrivacyLabels: string[] = [
    ...companies.reduce((memo, {indicators}) => {
      indicators.privacy.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ].sort();

  const indicatorLabels: string[] = ([] as string[])
    .concat(indicatorGovernanceLabels)
    .concat(indicatorFreedomLabels)
    .concat(indicatorPrivacyLabels);

  const companyLabels: string[] = companies.map(
    ({companyPretty}) => companyPretty,
  );

  const height = indicatorLabels.length * gridSize;
  const width = companyLabels.length * gridSize;

  const gridElems = gridGroups(
    gridSize,
    indicatorLabels.length,
    companyLabels.length,
  );
  const indicatorLabelElems = indicatorLabelGroups(gridSize, indicatorLabels);
  const companyLabelElems = companyLabelGroups(gridSize, companyLabels);
  const squareElems = squareGroups(
    gridSize,
    companies,
    indicatorGovernanceLabels,
    indicatorFreedomLabels,
    indicatorPrivacyLabels,
  );

  return (
    <div className={c("flex", debug ? "border border-yellow-400" : undefined)}>
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={width + 122}
        height={height + 150}
      >
        <g transform={`translate(40, ${gridSize / 2 + 1})`}>
          {indicatorLabelElems}
        </g>
        <g transform={`translate(${60 + gridSize / 3}, ${height + 10})`}>
          {companyLabelElems}
        </g>
        <g transform="translate(60, 1)">{squareElems}</g>
        <g transform="translate(60, 1)">{gridElems}</g>
      </svg>
    </div>
  );
};

export default IndicatorScoresChart;
