import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyKind, CompanyRank, IndicatorCategoryExt} from "../types";
import CompanyKindLabel from "./company-kind-label";
import PercentageBar from "./percentage-bar";

interface RankChartProps {
  ranking: CompanyRank[];
  className?: string;
  activeCompany?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
  hasHeader?: boolean;
}

const RankChart = ({
  ranking,
  className,
  activeCompany,
  category = "total",
  chartHeight = 10,
  hasHeader = true,
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

  const companyKind: CompanyKind = ranking[0]?.kind || "telecom";
  const companyWidth = companyKind === "internet" ? "w-24" : "w-28";

  const chartRow = (
    {id, companyPretty, score, rank}: CompanyRank,
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
      "bg-diff-del": !isHighlightedCompany && companyKind === "internet",
      "bg-accent-orange": !isHighlightedCompany && companyKind === "telecom",
    };

    const barClassName =
      isActiveCompany || isHighlightedCompany
        ? "text-prissian"
        : categoryClassName;

    const scoreClassName = {
      "text-white bg-prissian score-label": isActiveCompany,
    };

    return (
      <div
        key={`home-rank-${category}-${id}`}
        className={c("flex items-center text-sm mb-1", highlightedClassName)}
        onMouseEnter={() => setHighlightedCompany(id)}
        onMouseLeave={() => setHighlightedCompany(undefined)}
      >
        <Link passHref href={`/companies/${id}`}>
          <a
            className={c(
              "flex-none text-black font-normal font-sans select-none whitespace-nowrap",
              highlightedClassName,
              companyWidth,
            )}
          >
            {companyPretty}
          </a>
        </Link>

        <div className="flex-none w-8 flex justify-center">
          <div
            className={c(
              "rounded-full h-5 w-5 text-white font-sans flex items-center justify-center",
              rankClassName,
            )}
          >
            {rank}
          </div>
        </div>

        <div ref={ref} className="flex-grow ml-2">
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
        </div>

        <div
          className={c(
            "relative flex-none w-9 float-right ml-2",
            scoreClassName,
          )}
        >
          <span className="pl-1 pr-1 select-none font-sans float-right">
            {score}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={c("flex flex-col", className)}>
      {hasHeader && (
        <>
          <CompanyKindLabel kind={companyKind} theme="dark" />

          <div className="flex items-center text-sm mb-2 mt-3">
            <div className={c("flex-none", companyWidth)}>&nbsp;</div>

            <div className="flex-none w-8 text-center">Rank</div>

            <div className="flex-none w-9 ml-auto">
              <span className="float-right">Score</span>
            </div>
          </div>
        </>
      )}

      {ranking.map((company, idx) => chartRow(company, idx))}
    </div>
  );
};

export default RankChart;
