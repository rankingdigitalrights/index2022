/* eslint unicorn/no-null: off */
import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyRank, IndicatorCategoryExt} from "../types";
import PercentageBar from "./percentage-bar";
import RankLabel from "./rank-label";
import RankScore from "./rank-score";

type ChartRanking = Pick<
  CompanyRank,
  "id" | "companyPretty" | "score" | "rank"
> & {service: string};

interface CompanyServiceChart {
  ranking: ChartRanking[];
  className?: string;
  rankColorClass?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
}

const RankChart = ({
  ranking,
  className,
  rankColorClass = "bg-diff-del",
  category = "total",
  chartHeight = 10,
}: CompanyServiceChart) => {
  const [chartRef, chartWidth] = useChartResize();
  const [highlightedService, setHighlightedService] = useState<
    string | undefined
  >();

  return (
    <div className={c("flex flex-col w-full font-sans", className)}>
      {ranking.map(({id, companyPretty, service, score, rank}, idx) => {
        const isHighlighted = service === highlightedService;

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
            key={`home-rank-${id}-${service}`}
            className="flex items-center text-sm mb-1"
            onMouseEnter={() => setHighlightedService(service)}
            onMouseLeave={() => setHighlightedService(undefined)}
          >
            <div className="grow-0 flex flex-col align-left w-56 sm:w-32 md:w-48">
              <Link passHref href={`/companies/${id}`}>
                <a className="text-prissian text-sm font-bold whitespace-nowrap">
                  {companyPretty}
                </a>
              </Link>
              <span className="text-sm font-thin text-black">{service}</span>
            </div>

            <RankLabel rank={rank} className={c(highlightedBgClassName)} />

            <div
              ref={idx === 0 ? chartRef : null}
              className="grow flex items-center ml-2 border"
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
            </div>

            <div className="relative shrink-0 w-9 ml-2">
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
