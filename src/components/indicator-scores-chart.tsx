import c from "clsx";
import React, {useState} from "react";

import {CompanyIndex, Indicator} from "../types";
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
    const y = labels.length * size;
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
  const horizontalLines = [...Array(rows).keys()].map((i) => {
    const x1 = 0;
    const y1 = size * i;
    const x2 = size * columns;
    const y2 = size * i;

    return (
      <line
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

  const verticalLines = [...Array(columns + 1).keys()].map((i) => {
    const x1 = size * i;
    const y1 = 0;
    const x2 = x1;
    const y2 = size * rows;

    return (
      <line
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
  const rect = (i: number, j: number, indicator: Indicator | undefined) => {
    const score = indicator ? indicator.score : 0;
    const x = i * size + 1;
    const y = j * size + 1;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={size}
          height={size}
          fill="#0C2637"
          fillOpacity={`${Math.round(score / 10) * 10}%`}
        />
        {/*<GraphLabel
            transform={`translate(${x + size / 2 - 8},${y + size / 2})`}
            value={`${score}%`}
            size="small"
            />*/}
      </g>
    );
  };

  return companies.map(({indicators}, i) => {
    let j = 0;
    return governanceLabels
      .map((label) => {
        const indicator = indicators.governance.find(
          (indicator) => indicator.indicator === label,
        );
        return rect(i, j++, indicator);
      })
      .concat(
        freedomLabels.map((label) => {
          const indicator = indicators.freedom.find(
            (indicator) => indicator.indicator === label,
          );
          return rect(i, j++, indicator);
        }),
      )
      .concat(
        privacyLabels.map((label) => {
          const indicator = indicators.privacy.find(
            (indicator) => indicator.indicator === label,
          );
          return rect(i, j++, indicator);
        }),
      );
  });
};

const IndicatorScoresChart = ({
  companies,
  gridSize = 40,
  debug = false,
}: IndicatorScoresChartProps) => {
  // Get a list of all indicator labels;
  const indicatorGovernanceLabels: string[] = Array.from(
    companies.reduce((memo, {indicators}) => {
      indicators.governance.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ).sort();

  const indicatorFreedomLabels: string[] = Array.from(
    companies.reduce((memo, {indicators}) => {
      indicators.freedom.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ).sort();

  const indicatorPrivacyLabels: string[] = Array.from(
    companies.reduce((memo, {indicators}) => {
      indicators.privacy.forEach(({indicator}) => memo.add(indicator));
      return memo;
    }, new Set<string>()),
  ).sort();

  const indicatorLabels: string[] = ([] as string[])
    .concat(indicatorGovernanceLabels)
    .concat(indicatorFreedomLabels)
    .concat(indicatorPrivacyLabels);

  const companyLabels: string[] = companies.map(({company}) => company);

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
        <g transform="translate(40, 20)">{indicatorLabelElems}</g>
        <g transform={`translate(75, ${height + 10})`}>{companyLabelElems}</g>
        <g transform="translate(60, 1)">{gridElems}</g>
        <g transform="translate(60, 1)">{squareElems}</g>
      </svg>
    </div>
  );
};

export default IndicatorScoresChart;
