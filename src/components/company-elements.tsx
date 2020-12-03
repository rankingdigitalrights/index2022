import c from "clsx";
import React from "react";

import IndicatorElementTag from "./indicator-element-tag";
import {Element} from "../types";

interface CompanyElementsProps {
  indicatorLabel: string;
  company: string;
  companyElements: Record<string, Element[]>;
  literalValues: boolean;
}

const CompanyElements = ({
  indicatorLabel,
  company,
  companyElements,
  literalValues,
}: CompanyElementsProps) => {
  const services = Object.keys(companyElements);

  const templateService = services[0] && companyElements[services[0]];

  if (!templateService) return <div />;

  const legendRow = [indicatorLabel].concat(services);
  const rows = templateService.reduce((memo, element) => {
    const elements = services.reduce((agg, service) => {
      const serviceElement = companyElements[service].find(
        (e) => e.element === element.element,
      );
      if (!serviceElement) return agg;
      return agg.concat([serviceElement]);
    }, [] as Element[]);

    return memo.concat([[element].concat(elements)]);
  }, [] as Element[][]);

  const legend = legendRow.map((item, idx) => {
    const className = {
      "w-40 text-xs p-2": idx === 0,
      "w-36 text-xxs p-6": idx > 0,
    };

    const innerClassName = {
      "w-24 h-16 text-center": idx > 0,
    };

    return (
      <div className={c("flex flex-col items-center justify-center border border-disabled-dark", className)} key={item}>
        <span className={c("flex flex-col items-center justify-center", innerClassName)}>
          <span>{item}</span>
        </span>
      </div>
    );
  });

  const grid = rows.map((row) => {
    return (
      <div className="flex w-full">
        <div className="flex flex-row w-full">
          {row.map((element, idx) => {
            if (idx === 0)
              return (
                <div
                  className="flex flex-col items-center justify-center border border-disabled-dark w-40 p-2 text-xxs"
                  key={`legend-element-${element.label}`}
                >
                  <span>{element.description}</span>
                </div>
              );
            return (
              <div
                className="flex flex-col items-center justify-center border border-disabled-dark w-36 p-6 text-xxs flex flex-col items-center"
                key={`${element.service}-${element.label}`}
              >
                <IndicatorElementTag
                  score={element.score}
                  value={element.value}
                  activeTag={literalValues ? "score" : "value"}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="mt-6">
      <h3>{company}</h3>

      <div className="flex flex-col w-full mt-3 font-circular">
        <div className="flex flex-row">{legend}</div>

        {grid}
      </div>
    </div>
  );
};

export default CompanyElements;
