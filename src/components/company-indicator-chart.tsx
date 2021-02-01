import c from "clsx";
import {useRouter} from "next/router";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import ChevronDown from "../images/icons/chevron-down.svg";
import ChevronUp from "../images/icons/chevron-up.svg";
import {IndicatorNested} from "../types";
import {mapScore} from "../utils";
import PercentageBar from "./percentage-bar";

interface CompanyIndicatorChartProps {
  indicators: IndicatorNested[];
  onClick: (id: string) => void;
}

type CollapseableIndicator = Map<string, boolean>;

const CompanyIndicatorChart = ({
  indicators,
  onClick,
}: CompanyIndicatorChartProps) => {
  const router = useRouter();
  const [chartRef, chartWidth] = useChartResize();

  const [collapsedIndicators, setCollapsedIndicators] = useState<
    CollapseableIndicator
  >(
    indicators.reduce(
      (memo, {indicator, familyMembers}) =>
        familyMembers.length > 0 ? memo.set(indicator, false) : memo,
      new Map(),
    ),
  );
  const [highlightedIndicator, setHighlightedIndicator] = useState<
    string | undefined
  >();

  const handleCollapse = (indicator: string) => {
    setCollapsedIndicators(
      new Map(
        collapsedIndicators.set(indicator, !collapsedIndicators.get(indicator)),
      ),
    );
  };

  const isPrint = router.query?.print !== undefined;

  return (
    <div className={c(isPrint ? "w-full" : undefined)}>
      {indicators.map(
        ({indicator, display, label, category, score, familyMembers}, idx) => {
          // eslint-disable-next-line unicorn/no-null
          const ref = idx === 0 ? chartRef : null;

          const isHighlightedIndicator = indicator === highlightedIndicator;
          const hasCollapse = collapsedIndicators.has(indicator);
          const isOpen =
            (hasCollapse && collapsedIndicators.get(indicator)) || false;
          const indicatorPretty = `${display}. ${label}`;

          const className = {
            "text-cat-governance": category === "governance",
            "text-cat-freedom": category === "freedom",
            "text-cat-privacy": category === "privacy",
            "text-cat-negative": category === undefined,
          };

          const highlightClassName = "text-prissian";

          const classNameBarRow =
            "flex flex-grow items-center justify-between font-circular text-xs";

          return (
            <div
              key={`company-indicator-chart-${indicator}`}
              className={c("no-page-break", isPrint ? "w-full" : undefined)}
            >
              <div
                className={c("flex flex-col", {"mt-2": idx > 0})}
                onMouseEnter={() => setHighlightedIndicator(indicator)}
                onMouseLeave={() => setHighlightedIndicator(undefined)}
              >
                <button
                  className="flex justify-between items-center text-xs font-circular cursor-pointer"
                  onClick={
                    hasCollapse
                      ? () => handleCollapse(indicator)
                      : () => onClick(display)
                  }
                >
                  <div className="flex flex-grow justify-between items-center text-left">
                    <span className="flex-grow">{indicatorPretty}</span>
                    {hasCollapse && isOpen && (
                      <ChevronUp className="flex-none ml-auto ml-1" />
                    )}
                    {hasCollapse && !isOpen && (
                      <ChevronDown className="flex-none ml-auto ml-1" />
                    )}
                  </div>
                  {hasCollapse && (
                    <div className="flex-none ml-auto w-8">&nbsp;</div>
                  )}
                </button>

                <div className={classNameBarRow}>
                  <div ref={ref} className="flex-grow">
                    <svg
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height={10}
                      transform="translate(0, 0)"
                    >
                      <PercentageBar
                        value={mapScore(score)}
                        width={isPrint ? "100%" : chartWidth}
                        height={9}
                        className={
                          isHighlightedIndicator
                            ? highlightClassName
                            : className
                        }
                      />
                    </svg>
                  </div>

                  <div
                    className={c(
                      "flex-none ml-auto w-8 float-right",
                      isHighlightedIndicator ? highlightClassName : undefined,
                    )}
                  >
                    <span className="float-right">
                      {score}
                      {score === "NA" ? "" : "%"}
                    </span>
                  </div>
                </div>
              </div>

              {isOpen &&
                familyMembers.map((m) => {
                  const mChartWidth =
                    chartWidth - 18 < 0 ? chartWidth : chartWidth - 18;

                  const mIndicatorPretty = `${m.display}. ${m.label}`;
                  const isHighlightedMIndicator =
                    m.indicator === highlightedIndicator;

                  return (
                    <div
                      key={`company-indicator-chart-${m.indicator}`}
                      className="pl-4 flex flex-col mt-2"
                      onMouseEnter={() => setHighlightedIndicator(m.indicator)}
                      onMouseLeave={() => setHighlightedIndicator(undefined)}
                    >
                      <button
                        className="text-left text-xs font-circular cursor-pointer"
                        onClick={() => onClick(m.display)}
                      >
                        {mIndicatorPretty}
                      </button>

                      <div className={classNameBarRow}>
                        <div className="flex-grow">
                          <svg
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height={10}
                            transform="translate(0, 0)"
                          >
                            <PercentageBar
                              value={mapScore(m.score)}
                              width={mChartWidth}
                              height={9}
                              className={
                                isHighlightedMIndicator
                                  ? highlightClassName
                                  : className
                              }
                            />
                          </svg>
                        </div>

                        <div
                          className={c(
                            "flex-none ml-auto w-8 float-right",
                            isHighlightedMIndicator
                              ? highlightClassName
                              : undefined,
                          )}
                        >
                          <span className="float-right">
                            {m.score}
                            {m.score === "NA" ? "" : "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        },
      )}
    </div>
  );
};

export default CompanyIndicatorChart;
