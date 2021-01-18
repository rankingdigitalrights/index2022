import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyRank} from "../types";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface CompanyRankChartProps {
  activeCompany: string;
  ranking: CompanyRank[];
  onClick: (id: string) => void;
  height?: number;
}

const CompanyRankChart = ({
  activeCompany,
  ranking,
  onClick,
  height = 10,
}: CompanyRankChartProps) => {
  const [chartRef, divWidth] = useChartResize();

  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const chartWidth = divWidth - 130 < 0 ? 0 : divWidth - 130;

  return (
    <div className="flex flex-col">
      {ranking.map(({id, companyPretty, score}, idx) => {
        // eslint-disable-next-line unicorn/no-null
        const ref = idx === 0 ? chartRef : null;
        const isActiveCompany = id === activeCompany;
        const isHighlightedCompany = id === highlightedCompany;

        const className = c("flex items-center m-0.5 font-circular text-xs", {
          "text-prissian": isActiveCompany || isHighlightedCompany,
        });

        const barClassName = c(
          isActiveCompany || isHighlightedCompany
            ? "text-prissian"
            : "text-disabled-dark",
        );

        const scoreClassName = c("ml-3 pl-1 pr-1 select-none", {
          "text-white bg-prissian": isActiveCompany,
        });

        return (
          <div
            ref={ref}
            key={id}
            className={className}
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            <button
              className="font-circular w-20 select-none text-left"
              onClick={() => onClick(id)}
            >
              {companyPretty}
            </button>

            <svg
              className=""
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              width={chartWidth}
              height={height}
              transform="translate(0, 0)"
            >
              <PercentageBar
                value={score}
                width={chartWidth}
                height={height}
                className={barClassName}
              />
            </svg>

            <div
              className={c(
                "relative w-4",
                isActiveCompany ? "score-label" : undefined,
              )}
            >
              <span className={scoreClassName}>{score}%</span>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="w-20">&nbsp;</div>
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          width={chartWidth}
          height={height}
          transform="translate(0, 0)"
        >
          <GraphLabel
            value="0%"
            size="extra-small"
            transform="translate(0,10)"
          />

          <GraphLabel
            value="100%"
            size="extra-small"
            transform={`translate(${chartWidth},10)`}
            textAnchor="end"
          />
        </svg>
      </div>
    </div>
  );
};

export default CompanyRankChart;
