import c from "clsx";
import React, {useState} from "react";

import ChevronDown from "../../static/chevron-down.svg";
import ChevronUp from "../../static/chevron-up.svg";
import {useChartResize} from "../hooks";
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
  const [chartRef, divWidth] = useChartResize();

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

  const chartWidth = divWidth < 0 ? 0 : divWidth - 52;

  return (
    <div ref={chartRef}>
      {indicators.map(
        ({indicator, display, label, category, score, familyMembers}, idx) => {
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
            "flex items-center justify-between font-circular m-0.5 text-xs";

          return (
            <div
              key={`company-indicator-chart-${indicator}`}
              className={c("flex flex-col", {"mt-2": idx > 0})}
              onMouseEnter={() => setHighlightedIndicator(indicator)}
              onMouseLeave={() => setHighlightedIndicator(undefined)}
            >
              <button
                className="flex justify-between items-center cursor-pointer"
                onClick={
                  hasCollapse
                    ? () => handleCollapse(indicator)
                    : () => onClick(display)
                }
              >
                <span className="flex justify-between items-center text-left text-xs font-circular w-11/12">
                  <span>{indicatorPretty}</span>
                  {hasCollapse && isOpen && <ChevronUp className="ml-2 mr-4" />}
                  {hasCollapse && !isOpen && (
                    <ChevronDown className="ml-2 mr-4" />
                  )}
                </span>
              </button>

              <div className={classNameBarRow}>
                <div className="w-11/12">
                  <svg
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height={10}
                    transform="translate(0, 0)"
                  >
                    <PercentageBar
                      value={mapScore(score)}
                      width={chartWidth}
                      height={9}
                      className={
                        isHighlightedIndicator ? highlightClassName : className
                      }
                    />
                  </svg>
                </div>

                <div
                  className={c(
                    "ml-2",
                    isHighlightedIndicator ? highlightClassName : undefined,
                  )}
                >
                  <span>
                    {score}
                    {score === "NA" ? "" : "%"}
                  </span>
                </div>
              </div>

              {isOpen &&
                familyMembers.map((m) => {
                  const mChartWidth =
                    chartWidth - 8 < 0 ? chartWidth : chartWidth - 8;
                  const mIndicatorPretty = `${m.display}. ${m.label}`;

                  return (
                    <div
                      key={`company-indicator-chart-${m.indicator}`}
                      className="pl-2 flex flex-col mt-2"
                    >
                      <button
                        className="flex justify-between cursor-pointer"
                        onClick={() => onClick(m.display)}
                      >
                        <span className="text-left text-xs font-circular w-11/12">
                          {mIndicatorPretty}
                        </span>
                      </button>

                      <div className={classNameBarRow}>
                        <div className="w-11/12">
                          <svg
                            version="1"
                            xmlns="http://www.w3.org/2000/svg"
                            width={mChartWidth}
                            height={10}
                            transform="translate(0, 0)"
                          >
                            <PercentageBar
                              value={mapScore(m.score)}
                              width={mChartWidth}
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
                            "ml-2",
                            isHighlightedIndicator
                              ? highlightClassName
                              : undefined,
                          )}
                        >
                          <span>
                            {m.score}
                            {score === "NA" ? "" : "%"}
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
