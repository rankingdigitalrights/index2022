import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {LensRank} from "../types";
import LensCircle from "./lens-circle";
import PercentageBar from "./percentage-bar";
import RankScore from "./rank-score";

interface LensRankChartProps {
  ranking: LensRank[];
  className?: string;
  chartHeight?: number;
}

const LensRankChart = ({
  ranking,
  className,
  chartHeight = 10,
}: LensRankChartProps) => {
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedLens, setHighlightedLens] = useState<string | undefined>();

  const chartRow = ({lens, lensPretty, score}: LensRank, idx: number) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
    const isHighlighted = lens === highlightedLens;

    const highlightedTextClassName = {
      "text-prissian": isHighlighted,
    };

    return (
      <div
        key={`home-rank-${lens}`}
        className="w-full flex items-center justify-end space-x-2 text-sm mb-1"
        onMouseEnter={() => setHighlightedLens(lens)}
        onMouseLeave={() => setHighlightedLens(undefined)}
      >
        <div className="flex items-center justify-end">
          <LensCircle
            lens={lens}
            className="grow-0 self-start mt-[0.2rem] w-3 h-3"
          />

          <span
            className={c(
              "ml-1 text-sm select-none whitespace-nowrap",
              highlightedTextClassName,
            )}
          >
            {lensPretty}
          </span>
        </div>

        <div
          ref={ref}
          className="w-[30%] sm:w-7/12 md:w-[30%] lg:w-5/12 flex items-center ml-2"
        >
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
              className="text-prissian"
            />
          </svg>

          <RankScore className={c(highlightedTextClassName)} score={score} />
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

export default LensRankChart;
