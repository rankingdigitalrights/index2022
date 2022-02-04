import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {
  CompanyKind,
  IndicatorCategoryExt,
  ServiceCompanyRank,
  ServiceKind,
} from "../types";
import CompanyKindLabel from "./company-kind-label";
import PercentageBar from "./percentage-bar";

interface ServiceRankChartProps {
  ranking: ServiceCompanyRank[];
  serviceKind: ServiceKind;
  className?: string;
  activeCompany?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
  hasHeader?: boolean;
  isPrint?: boolean;
}

const ServiceRankChart = ({
  ranking,
  serviceKind,
  className,
  activeCompany,
  category = "total",
  chartHeight = 10,
  hasHeader = true,
  isPrint = false,
}: ServiceRankChartProps) => {
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
  const serviceWidth = serviceKind === "mobileEcosystem" ? "w-60" : "w-44";

  const chartRow = (
    {id, companyPretty, score, rank, service}: ServiceCompanyRank,
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

    const companyLabel = isPrint ? (
      <span
        className={c(
          "flex-none font-circular select-none whitespace-nowrap",
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
            "flex-none font-circular text-black font-normal select-none whitespace-nowrap",
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
        key={`home-rank-${service}-${category}-${id}`}
        className={c(
          "flex items-center font-circular text-sm mb-1",
          highlightedClassName,
        )}
        onMouseEnter={() => setHighlightedCompany(id)}
        onMouseLeave={() => setHighlightedCompany(undefined)}
      >
        {companyLabel}

        <div className={c("flex-none ml-2", serviceWidth)}>{service}</div>

        <div className="flex-none w-8 flex justify-center">
          <div
            className={c(
              "rounded-full h-5 w-5 text-white flex items-center justify-center",
              rankClassName,
            )}
          >
            {rank}
          </div>
        </div>

        <div ref={ref} className="flex-shrink-0 ml-2 w-24 sm:flex-grow">
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
          <span className="pl-1 pr-1 select-none float-right">{score}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={c("flex flex-col", className)}>
      {hasHeader && (
        <>
          <CompanyKindLabel kind={companyKind} theme="dark" />

          <div className="flex items-center font-circular text-sm mb-2 mt-3">
            <div className={c("flex-none", companyWidth)}>&nbsp;</div>

            <div className={c("flex-none ml-2", serviceWidth)}>Service</div>

            <div className="flex-none w-8 text-center">Rank</div>

            <div className="flex-shrink-0 ml-2 w-24 sm:flex-grow">&nbsp;</div>

            <div className="flex-none w-9 ml-2 float-right">Score</div>
          </div>
        </>
      )}

      {ranking.map((company, idx) => chartRow(company, idx))}
    </div>
  );
};

export default ServiceRankChart;
