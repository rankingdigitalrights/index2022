/* eslint unicorn/no-null: off */
import c from "clsx";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyRank, IndicatorCategoryExt, ServiceKind} from "../types";
import {mapIcon} from "./evaluated-service";
import PercentageBar from "./percentage-bar";
import RankScore from "./rank-score";

type ChartRanking = Pick<CompanyRank, "score"> & {
  service: string;
  kind: ServiceKind;
};

interface ServiceCompanyChartProps {
  ranking: ChartRanking[];
  category?: IndicatorCategoryExt;
  className?: string;
  chartHeight?: number;
}

const ServiceCompanyChart = ({
  ranking,
  className,
  category = "total",
  chartHeight = 10,
}: ServiceCompanyChartProps) => {
  const [chartRef, chartWidth] = useChartResize();
  const [highlightedService, setHighlightedService] = useState<
    string | undefined
  >();

  return (
    <div className={c("flex flex-col w-full font-sans", className)}>
      {ranking.map(({service, kind, score}, idx) => {
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

        return (
          <div
            key={`home-rank-${category}-${kind}-${service}`}
            className="flex items-center text-sm mb-1"
            onMouseEnter={() => setHighlightedService(service)}
            onMouseLeave={() => setHighlightedService(undefined)}
          >
            <div className="grow-0 shrink-0 flex items-center">
              <div className="h-8 w-8 mt-1.5">{mapIcon(kind, false)}</div>

              <div className={c("ml-1 w-28 text-sm", highlightedTextClassName)}>
                {service}
              </div>
            </div>

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
                aria-label={`Score bar for ${service}: ${score}`}
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

export default ServiceCompanyChart;
