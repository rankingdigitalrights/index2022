import c from "clsx";
import React from "react";

import {IndicatorCategory, IndicatorNested} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: IndicatorCategory;
  score: number;
  text: string;
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
    title = "Freedom of Expression";
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
      className={c(
        "mt-6 pb-6 border-t border-disabled-dark print:border-t-0 printer print:px-20 print:pb-0 print:pt-8",
        className,
      )}
    >
      <div className="flex flex-col md:flex-row mt-8 md:mt-16 print:mt-0">
        <div className="md:w-4/6 md:mr-3 print:w-full print:m-0">
          <h2
            className={c(
              "flex items-center font-platform text-xl mb-6",
              titleClassName,
            )}
          >
            {title}{" "}
            <span
              className={c(
                "font-circular font-bold text-md px-3 py-2 ml-3",
                scoreClassName,
              )}
            >
              {score}%
            </span>
          </h2>

          <div dangerouslySetInnerHTML={{__html: text}} />
        </div>

        <div className="md:w-2/6 md:ml-3 print:hidden">
          <div className="flex flex-col justify-end mb-6 md:mt-0">
            <h3 className="text-lg font-circular">Indicators</h3>
          </div>

          <CompanyIndicatorChart indicators={indicators} />
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
