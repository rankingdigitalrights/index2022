import c from "clsx";
import React, {useState} from "react";

import {useMobileSize} from "../hooks";
import {IndicatorCategory, IndicatorCompanyScore} from "../types";
import PercentageBar from "./percentage-bar";

interface IndicatorCompaniesChartProps {
  indicator: string;
  category: IndicatorCategory;
  scores: IndicatorCompanyScore[];
  className?: string;
}

const IndicatorCompaniesChart = ({
  indicator,
  category,
  scores,
  className,
}: IndicatorCompaniesChartProps) => {
  const isMobile = useMobileSize(768);
  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const containerClassName = {
    "h-80": isMobile,
    "h-72": !isMobile,
  };
  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
  };

  const labelClassName = {
    "transform -rotate-90 translate-y-8 w-32": isMobile,
    "transform -rotate-45 -translate-x-10 mt-2 w-28": !isMobile,
  };

  return (
    <div
      className={c(
        "flex w-full font-circular text-sm",
        className,
        containerClassName,
      )}
    >
      <div className="flex flex-col w-12 mr-1">
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

          const highlightedClassName = {
            "text-prissian": isHighlightedCompany,
          };

          const barClassName = isHighlightedCompany
            ? "text-prissian"
            : categoryClassName;

          return (
            <div
              key={`companies-chart-bar-${indicator}-${id}`}
              className="w-6 md:w-6 flex flex-col items-center"
              onMouseEnter={() => setHighlightedCompany(id)}
              onMouseLeave={() => setHighlightedCompany(undefined)}
            >
              <span
                className={c(
                  "w-5 md:w-6 select-none text-sm text-center",
                  highlightedClassName,
                )}
              >
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
                    className={c(barClassName)}
                  />
                </svg>
              </div>
              <span
                className={c(
                  "text-sm text-right cursor-default",
                  labelClassName,
                  highlightedClassName,
                )}
              >
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
