import c from "clsx";
import React, {useState} from "react";

import {IndicatorCompanyScore} from "../types";
import PercentageBar from "./percentage-bar";

interface IndicatorCompaniesChartProps {
  indicator: string;
  category: string;
  scores: IndicatorCompanyScore[];
  className?: string;
}

const IndicatorCompaniesChart = ({
  indicator,
  category,
  scores,
  className,
}: IndicatorCompaniesChartProps) => {
  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  return (
    <div className={c("flex w-full font-circular text-sm h-72", className)}>
      <div className="flex flex-col w-12">
        <span className="flex-none text-sm">&nbsp;</span>

        <div className="flex mt-2">
          <div className="flex flex-col justify-between">
            <span className="text-right">100%</span>

            <span className="text-right">0%</span>
          </div>
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width={4}
            height={180}
            transform="translate(0, 0)"
            className="ml-2"
          >
            <line
              x1={1}
              y1={0}
              x2={1}
              y2={180}
              strokeWidth={2}
              className="text-disabled-dark stroke-current"
            />
          </svg>
        </div>
      </div>

      <div className="flex">
        {scores.map(({id, companyPretty, score}) => {
          const isHighlightedCompany = id === highlightedCompany;

          const barClassName = c(
            isHighlightedCompany ? "text-prissian" : `text-cat-${category}`,
          );

          return (
            <div
              key={`companies-chart-bar-${indicator}-${id}`}
              className="w-6 md:w-6 flex flex-col items-center"
              onMouseEnter={() => setHighlightedCompany(id)}
              onMouseLeave={() => setHighlightedCompany(undefined)}
            >
              <span className="w-5 md:w-6 select-none text-sm text-center">
                {score === "NA" ? "NA" : `${score}`}
              </span>
              <div>
                <svg
                  className="mt-2"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={221}
                  transform="translate(0, 0)"
                >
                  <PercentageBar
                    key={id}
                    value={score}
                    width={10}
                    height={180}
                    orientation="vertical"
                    className={barClassName}
                  />
                </svg>
              </div>
              <span className="mt-2 transform -rotate-45 -translate-x-10 text-sm text-right w-28 cursor-default">
                {companyPretty}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndicatorCompaniesChart;
