import React from "react";

import {useBreakpointSize} from "../hooks";
import {IndicatorElement, IndicatorScore, MdxElement, Service} from "../types";
import IndicatorTableDesktop from "./indicator-table-desktop";
import IndicatorTableMobile from "./indicator-table-mobile";

interface CompanyElementsProps {
  indicator: string;
  label: string;
  company: string;
  score: IndicatorScore;
  averages: Record<string, IndicatorScore>;
  companyElements: Record<string, IndicatorElement[]>;
  literalValues: boolean;
  elementDescriptions: MdxElement[];
  services: Pick<Service, "id" | "name">[];
  className?: string;
}

const CompanyElements = ({
  indicator,
  label,
  company,
  score,
  averages,
  companyElements,
  literalValues,
  elementDescriptions,
  services,
  className,
}: CompanyElementsProps) => {
  const breakpointSize = useBreakpointSize();

  const templateService = services[0] && companyElements[services[0].id];

  if (!templateService) return <div />;

  return (
    <div className={className}>
      <div className="flex items-center sticky top-0 bg-beige py-2 z-10">
        {score !== "NA" && (
          <span className="text-md font-sans text-white bg-prissian rounded px-2 py-1 text-center mr-3">
            {score}%
          </span>
        )}
        <h3 className="text-lg font-bold mb-0">{company}</h3>
      </div>

      {breakpointSize < 768 ? (
        <div className="mt-3">
          <IndicatorTableMobile
            key={indicator}
            indicatorLabel={`${indicator}. ${label}`}
            company={company}
            averages={averages}
            companyElements={companyElements}
            literalValues={literalValues}
            elementDescriptions={elementDescriptions}
            services={services}
          />
        </div>
      ) : (
        <div className="mt-3">
          <IndicatorTableDesktop
            key={indicator}
            indicatorLabel={`${indicator}. ${label}`}
            company={company}
            averages={averages}
            companyElements={companyElements}
            literalValues={literalValues}
            elementDescriptions={elementDescriptions}
            services={services}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyElements;
