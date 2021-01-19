import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyKind, CompanyRank} from "../types";
import CompanyKindLabel from "./company-kind-label";
import PercentageBar from "./percentage-bar";

interface HomeRankChartProps {
  ranking: CompanyRank[];
  onClick: (id: string) => void;
  className?: string;
}

const HomeRankChart = ({ranking, onClick, className}: HomeRankChartProps) => {
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const chartHeight = 10;
  const companyKind: CompanyKind = ranking[0]?.kind || "telecom";

  return (
    <div className={c("flex flex-col", className)}>
      <div className="flex items-center font-circular text-xs mb-6">
        <div className="flex-none w-24">
          <CompanyKindLabel
            className="text-xs"
            kind={companyKind}
            theme="dark"
            home
          />
        </div>

        <div className="flex-none w-3 mr-2">&nbsp;</div>

        <div className="flex-none w-8 text-center">Rank</div>

        <div className="flex-none w-8 ml-auto">
          <span className="float-right">Score</span>
        </div>
      </div>
      {ranking.map(({id, companyPretty, score, rank}, idx) => {
        // eslint-disable-next-line unicorn/no-null
        const ref = idx === 0 ? chartRef : null;
        const isHighlightedCompany = id === highlightedCompany;

        const highlightedClassName = {
          "text-prissian": isHighlightedCompany,
        };

        const highlightedRankClassName = {
          "bg-prissian": isHighlightedCompany,
          "bg-diff-del": !isHighlightedCompany && companyKind === "internet",
          "bg-accent-orange":
            !isHighlightedCompany && companyKind === "telecom",
        };

        return (
          <div
            key={id}
            className={c(
              "flex items-center font-circular text-xs mb-1",
              highlightedClassName,
            )}
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            <div className="flex-none w-3 mr-2">&nbsp;</div>

            <button
              className={c(
                "flex-none font-circular w-24 select-none text-left",
                highlightedClassName,
              )}
              onClick={() => onClick(id)}
            >
              {companyPretty}
            </button>

            <div className="flex-none w-8 flex justify-center">
              <div
                className={c(
                  "rounded-full h-4 w-4 text-white flex items-center justify-center",
                  highlightedRankClassName,
                )}
              >
                {rank}
              </div>
            </div>

            <div ref={ref} className="flex-grow mr-1">
              <svg
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height={chartHeight}
                transform="translate(0, 0)"
              >
                <PercentageBar
                  value={score}
                  width={chartWidth}
                  height={chartHeight}
                  className="text-prissian"
                />
              </svg>
            </div>

            <div className="flex-none ml-auto">
              <span className="float-right pl-1 pr-1 select-none">
                {score}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeRankChart;
