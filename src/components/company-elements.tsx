import React from "react";

import {Element, IndicatorElement, IndicatorScore} from "../types";
import IndicatorTableDesktop from "./indicator-table-desktop";

interface CompanyElementsProps {
  indicatorLabel: string;
  company: string;
  score: IndicatorScore;
  averages: Record<string, IndicatorScore>;
  companyElements: Record<string, IndicatorElement[]>;
  literalValues: boolean;
  elementDescriptions: Element[];
  services: string[];
}

const CompanyElements = ({
  indicatorLabel,
  company,
  score,
  averages,
  companyElements,
  literalValues,
  elementDescriptions,
  services,
}: CompanyElementsProps) => {
  const templateService = services[0] && companyElements[services[0]];

  if (!templateService) return <div />;

  return (
    <div className="mt-10">
      <div className="flex items-center">
        {score !== "NA" && (
          <span className="font-circular text-md text-white bg-prissian rounded px-2 py-1 text-center mr-3">
            {score}%
          </span>
        )}
        <h3 className="text-lg font-platform">{company}</h3>
      </div>

      <div className="hidden md:block mt-3">
        <IndicatorTableDesktop
          indicatorLabel={indicatorLabel}
          company={company}
          averages={averages}
          companyElements={companyElements}
          literalValues={literalValues}
          elementDescriptions={elementDescriptions}
          services={services}
        />
      </div>

      <div className="md:hidden mt-3">Mobile View</div>
    </div>
  );
};

export default CompanyElements;
