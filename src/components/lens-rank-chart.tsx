import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {IndicatorCategoryExt, LensRank} from "../types";
import LensCircle from "./lens-circle";
import PercentageBar from "./percentage-bar";

interface LensRankChartProps {
  ranking: LensRank[];
  className?: string;
  activeCompany?: string;
  category?: IndicatorCategoryExt;
  chartHeight?: number;
  hasHeader?: boolean;
}

const LensRankChart = ({
  ranking,
  className,
  activeCompany,
  category = "total",
  chartHeight = 10,
  hasHeader = true,
}: LensRankChartProps) => {
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedLens, setHighlightedLens] = useState<string | undefined>();

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const lensWidth = "w-48";

  const chartRow = ({lens, lensPretty, score}: LensRank, idx: number) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
    const isActiveCompany = lens === activeCompany;
    const isHighlightedLens = lens === highlightedLens;

    const highlightedClassName = {
      "text-prissian": isActiveCompany || isHighlightedLens,
    };

    const barClassName =
      isActiveCompany || isHighlightedLens
        ? "text-prissian"
        : categoryClassName;

    return (
      <div
        key={`home-rank-${category}-${lens}`}
        className={c("flex items-center text-sm mb-1", highlightedClassName)}
        onMouseEnter={() => setHighlightedLens(lens)}
        onMouseLeave={() => setHighlightedLens(undefined)}
      >
        <LensCircle lens={lens} className="w-8 h-8" />

        <span
          className={c(
            "flex-none select-none whitespace-nowrap text-right",
            highlightedClassName,
            lensWidth,
          )}
        >
          {lensPretty}
        </span>

        <div ref={ref} className="flex-grow flex items-center ml-2">
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height={chartHeight}
            transform="translate(0, 0)"
            aria-label={`Score bar for ${lensPretty}: ${score}`}
          >
            <PercentageBar
              value={score}
              width={chartWidth}
              height={chartHeight}
              className={barClassName}
            />
          </svg>
          <span className="shrink-0 text-right w-8 pl-1 pr-1 select-none float-right">
            {score}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={c("flex flex-col w-full font-sans", className)}>
      {hasHeader && (
        <>
          <div className="flex items-center text-sm mb-2 mt-3">
            <div className={c("flex-none", lensWidth)}>&nbsp;</div>
          </div>
        </>
      )}

      {ranking.map((company, idx) => chartRow(company, idx))}
    </div>
  );
};

export default LensRankChart;
