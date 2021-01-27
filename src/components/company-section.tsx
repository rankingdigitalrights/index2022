import c from "clsx";
import React from "react";

import {IndicatorCategory, IndicatorNested} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: IndicatorCategory;
  score: number;
  text: string;
  indicators: IndicatorNested[];
  onClick: (id: string) => void;
  className?: string;
}

const CompanySection = ({
  category,
  score,
  text,
  indicators,
  onClick,
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
        "mt-6 pb-6 border-t border-disabled-dark print:border-t-0 m-2",
        className,
      )}
    >
      <div className="flex flex-col md:flex-row mt-8 md:mt-16">
        <div className="md:w-4/6 md:mr-3">
          <div className="flex items-center mb-12 md:h-16">
            <h2
              className={c(
                "font-platform text-xl whitespace-nowrap",
                titleClassName,
              )}
            >
              {title}
            </h2>
            <span
              className={c(
                "font-circular font-bold text-md ml-3 px-2 py-1",
                scoreClassName,
              )}
            >
              {score}%
            </span>
          </div>

          <div dangerouslySetInnerHTML={{__html: text}} />
        </div>

        <div className="md:w-2/6 md:ml-3">
          <div className="flex flex-col justify-end md:h-16 mb-12 mt-4 md:mt-0">
            <h3 className="text-lg font-circular">Indicators</h3>
          </div>

          <CompanyIndicatorChart indicators={indicators} onClick={onClick} />
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
