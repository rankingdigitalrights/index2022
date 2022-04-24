/* eslint unicorn/no-null: off */
import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyRank, IndicatorCategoryExt} from "../types";
import PercentageBar from "./percentage-bar";
import RankCompanyLabel from "./rank-company-label";
import RankLabel from "./rank-label";
import RankScore from "./rank-score";

type ChartRanking = Pick<
  CompanyRank,
  "id" | "companyPretty" | "score" | "rank"
>;

interface RankChartProps {
  ranking: ChartRanking[];
  className?: string;
  activeCompany?: string;
  rankColorClass?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
}

const RankChart = ({
  ranking,
  className,
  activeCompany,
  rankColorClass = "bg-diff-del",
  category = "total",
  chartHeight = 10,
}: RankChartProps) => {
  const [chartRef, chartWidth] = useChartResize();
  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  return (
    <div className={c("flex flex-col w-full font-sans", className)}>
      {ranking.map(({id, companyPretty, score, rank}, idx) => {
        const isHighlighted = id === highlightedCompany || id === activeCompany;

        const categoryClassName = {
          "text-cat-governance": category === "governance",
          "text-cat-freedom": category === "freedom",
          "text-cat-privacy": category === "privacy",
          "text-prissian": category === "total",
        };

        const highlightedTextClassName = {
          "text-black": !isHighlighted,
          "text-prissian": isHighlighted,
        };

        const highlightedBgClassName = {
          "bg-prissian": isHighlighted,
          [`${rankColorClass}`]: !isHighlighted,
        };

        return (
          <div
            key={`home-rank-${category}-${id}`}
            className="flex items-center text-sm mb-1"
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            <RankCompanyLabel
              id={id}
              name={companyPretty}
              className={c("w-24", {
                "text-black": !isHighlighted,
                "text-prissian": isHighlighted,
              })}
            />

            <RankLabel rank={rank} className={c(highlightedBgClassName)} />

            <div
              ref={idx === 0 ? chartRef : null}
              className="grow flex items-center ml-2"
            >
              <svg
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height={chartHeight}
                transform="translate(0, 0)"
                aria-label={`Score bar for ${companyPretty}: ${score}`}
              >
                <PercentageBar
                  value={score}
                  width={chartWidth}
                  height={chartHeight}
                  className={c(categoryClassName)}
                />
              </svg>

              <RankScore
                className={c(highlightedTextClassName)}
                score={score}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RankChart;
