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
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

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
            key={`company-rank-${activeCompany}-${id}`}
            className={className}
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            <button
              className="flex-none font-circular w-24 select-none text-left whitespace-nowrap"
              onClick={() => onClick(id)}
            >
              {companyPretty}
            </button>

            <div ref={ref} className="flex-grow ml-1">
              <svg
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
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
            </div>

            <div
              className={c(
                "relative flex-none ml-auto",
                isActiveCompany ? "score-label" : undefined,
              )}
            >
              <span className={scoreClassName}>{score}%</span>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="flex-none w-24">&nbsp;</div>
        <div className="flex-grow ml-2">
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
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
              transform={`translate(${chartWidth - 3},10)`}
              textAnchor="end"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CompanyRankChart;
