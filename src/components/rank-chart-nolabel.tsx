import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyRank, IndicatorCategoryExt} from "../types";
import PercentageBar from "./percentage-bar";
import RankLabel from "./rank-label";

type ChartRanking = Pick<
  CompanyRank,
  "id" | "companyPretty" | "score" | "rank"
>;

interface RankChartProps {
  ranking: ChartRanking[];
  className?: string;
  activeCompany?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
  isPrint?: boolean;
}

const RankChart = ({
  ranking,
  className,
  activeCompany,
  category = "total",
  chartHeight = 10,
  isPrint = false,
}: RankChartProps) => {
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const companyWidth = "w-24";

  const chartRow = (
    {id, companyPretty, score, rank}: ChartRanking,
    idx: number,
  ) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
    const isActiveCompany = id === activeCompany;
    const isHighlightedCompany = id === highlightedCompany;

    const highlightedClassName = {
      "text-prissian": isActiveCompany || isHighlightedCompany,
    };

    const rankClassName = {
      "bg-prissian": isHighlightedCompany,
      "bg-diff-del": !isHighlightedCompany,
    };

    const barClassName =
      isActiveCompany || isHighlightedCompany
        ? "text-prissian"
        : categoryClassName;

    const companyLabel = isPrint ? (
      <span
        className={c(
          "flex-none select-none whitespace-nowrap",
          highlightedClassName,
          companyWidth,
        )}
      >
        {companyPretty}
      </span>
    ) : (
      <Link passHref href={`/companies/${id}`}>
        <a
          className={c(
            "flex-none text-black font-normal select-none whitespace-nowrap",
            highlightedClassName,
            companyWidth,
          )}
        >
          {companyPretty}
        </a>
      </Link>
    );

    return (
      <div
        key={`home-rank-${category}-${id}`}
        className={c("flex items-center text-sm mb-1", highlightedClassName)}
        onMouseEnter={() => setHighlightedCompany(id)}
        onMouseLeave={() => setHighlightedCompany(undefined)}
      >
        {companyLabel}

        <RankLabel rank={rank} className={c(rankClassName)} />

        <div ref={ref} className="flex-grow flex items-center ml-2">
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
              className={barClassName}
            />
          </svg>
          <span className="shrink-0 text-right w-12 pl-1 pr-1 select-none float-right">
            {score}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={c("flex flex-col w-full font-sans", className)}>
      {ranking.map((company, idx) => chartRow(company, idx))}
    </div>
  );
};

export default RankChart;
