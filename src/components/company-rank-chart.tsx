import c from "clsx";
import React, {useState} from "react";

import {CompanyRank} from "../types";
import GraphLabel from "./graph-label";
import PercentageBar from "./percentage-bar";

interface CompanyRankChartProps {
  activeCompany: string;
  ranking: CompanyRank[];
  onClick: (id: string) => void;
  width?: number;
  height?: number;
}

const CompanyRankChart = ({
  activeCompany,
  ranking,
  onClick,
  width = 150,
  height = 10,
}: CompanyRankChartProps) => {
  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();
  return (
    <div className="flex flex-col">
      {ranking.map(({id, companyPretty, score}) => {
        const isActiveCompany = id === activeCompany;
        const isHighlightedCompany = id === highlightedCompany;

        const className = c("flex items-center font-circular text-xs", {
          "text-prissian": isActiveCompany || isHighlightedCompany,
        });

        const barClassName = c(
          isActiveCompany || isHighlightedCompany
            ? "text-prissian"
            : "text-disabled-dark",
        );

        const scoreClassName = c("ml-3 pl-1 pr-1 select-none", {
          "text-white bg-prissian score-label": isActiveCompany,
        });

        return (
          <div
            key={id}
            className={className}
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            <button
              className="font-circular w-24 mr-2 select-none text-left"
              onClick={() => onClick(id)}
            >
              {companyPretty}
            </button>
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              width={width}
              height={height}
              transform="translate(0, 0)"
            >
              <PercentageBar
                value={score}
                width={width}
                height={height}
                className={barClassName}
              />
            </svg>
            <div className="relative">
              <span className={scoreClassName}>{score}%</span>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="w-24 mr-2">&nbsp;</div>
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
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
            transform={`translate(${width},10)`}
            textAnchor="end"
          />
        </svg>
      </div>
    </div>
  );
};

export default CompanyRankChart;
