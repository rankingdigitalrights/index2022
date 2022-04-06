import c from "clsx";
import React from "react";

import {IndicatorCategory, IndicatorNested} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: IndicatorCategory;
  score: number;
  text: React.ReactNode;
  indicators: IndicatorNested[];
  className?: string;
}

const CompanySection = ({
  category,
  score,
  text,
  indicators,
  className,
}: CompanySectionProps) => {
  let title;
  if (category === "governance") {
    title = "Governance";
  } else if (category === "freedom") {
    title = "Freedom of expression";
  } else if (category === "privacy") {
    title = "Privacy";
  } else {
    title = "UNKNOWN CATEGORY!!!";
  }

  const titleClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
  };

  const scoreClassName = c("border rounded-md", {
    "border-cat-governance": category === "governance",
    "border-cat-freedom": category === "freedom",
    "border-cat-privacy": category === "privacy",
  });

  return (
    <section
      className={c("mt-6 pb-6 border-t border-disabled-dark", className)}
    >
      <div className="flex flex-col md:flex-row md:space-x-6 mt-8 md:mt-16">
        <div className="md:w-1/3 md:mr-3">
          <h2
            className={c(
              "flex items-center md:items-start text-lg font-bold mb-6",
              titleClassName,
            )}
          >
            {title}{" "}
            <span
              className={c("text-black text-md px-3 py-2 ml-3", scoreClassName)}
            >
              {score}%
            </span>
          </h2>

          {text}
        </div>

        <div className="md:w-2/3 md:ml-3">
          <div className="flex flex-col justify-end mt-8 mb-6 md:mt-0">
            <h3 className="text-lg font-bold mt-0">Indicators</h3>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            {category === "governance" && (
              <div className="md:w-1/2">
                <CompanyIndicatorChart indicators={indicators} />
              </div>
            )}

            {category === "freedom" && (
              <>
                <div className="md:w-1/2">
                  <CompanyIndicatorChart indicators={indicators.slice(0, 7)} />
                </div>
                <div className="md:w-1/2">
                  <CompanyIndicatorChart indicators={indicators.slice(7)} />
                </div>
              </>
            )}

            {category === "privacy" && (
              <>
                <div className="md:w-1/2">
                  <CompanyIndicatorChart indicators={indicators.slice(0, 9)} />
                </div>
                <div className="md:w-1/2">
                  <CompanyIndicatorChart indicators={indicators.slice(9)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
