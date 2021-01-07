import c from "clsx";
import React, {useState} from "react";

import ChevronDown from "../../static/chevron-down.svg";
import ChevronUp from "../../static/chevron-up.svg";
import {IndicatorNested} from "../types";
import {mapScore} from "../utils";
import PercentageBar from "./percentage-bar";

interface CompanyIndicatorChartProps {
  indicators: IndicatorNested[];
  width?: number;
}

type CollapseableIndicator = Map<string, boolean>;

const CompanyIndicatorChart = ({
  indicators,
  width = 250,
}: CompanyIndicatorChartProps) => {
  const [collapsedIndicators, setCollapsedIndicators] = useState<
    CollapseableIndicator
  >(
    indicators.reduce(
      (memo, {indicator, familyMembers}) =>
        familyMembers.length > 0 ? memo.set(indicator, false) : memo,
      new Map(),
    ),
  );

  const handleCollapse = (indicator: string) => {
    setCollapsedIndicators(
      new Map(
        collapsedIndicators.set(indicator, !collapsedIndicators.get(indicator)),
      ),
    );
  };

  return (
    <div>
      {indicators.map(
        ({indicator, display, label, category, score, familyMembers}, idx) => {
          const hasCollapse = collapsedIndicators.has(indicator);
          const isOpen =
            (hasCollapse && collapsedIndicators.get(indicator)) || false;
          const indicatorPretty = `${display} ${label}`;

          const className = c("flex justify-between items-center", {
            "cursor-pointer": hasCollapse,
            "cursor-text": !hasCollapse,
          });

          const classNameBar = {
            "text-cat-governance": category === "governance",
            "text-cat-freedom": category === "freedom",
            "text-cat-privacy": category === "privacy",
            "text-cat-negative": category === undefined,
          };

          return (
            <div
              key={`company-indicator-chart-${indicator}`}
              className={c("flex flex-col", {"mt-2": idx > 0})}
            >
              <button
                className={className}
                onClick={
                  hasCollapse ? () => handleCollapse(indicator) : () => {}
                }
              >
                <span className="text-left text-xs font-circular">
                  {indicatorPretty}
                </span>

                {hasCollapse && isOpen && <ChevronUp className="ml-2" />}
                {hasCollapse && !isOpen && <ChevronDown className="ml-2" />}
              </button>

              <svg
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height={10}
                transform="translate(0, 0)"
              >
                <PercentageBar
                  value={mapScore(score)}
                  width={width}
                  height={9}
                  className={classNameBar}
                />
              </svg>

              {isOpen &&
                familyMembers.map((m) => {
                  const mIndicatorPretty = `${m.display} ${m.label}`;

                  return (
                    <div
                      key={`company-indicator-chart-${m.indicator}`}
                      className="pl-2 flex flex-col mt-2"
                    >
                      <span className="text-left text-xs font-circular">
                        {mIndicatorPretty}
                      </span>

                      <svg
                        version="1"
                        xmlns="http://www.w3.org/2000/svg"
                        width={width - 10}
                        height={10}
                        transform="translate(0, 0)"
                      >
                        <PercentageBar
                          value={mapScore(m.score)}
                          width={width - 10}
                          height={9}
                          className={classNameBar}
                        />
                      </svg>
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
