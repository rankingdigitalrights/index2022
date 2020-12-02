import c from "clsx";
import React from "react";

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
      "w-64": idx === 0,
      "w-40": idx > 0,
    };

    return (
      <div className={c("border p-4 text-xxs", className)} key={item}>
        {item}
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
                  className="border w-64 p-4 text-xxs"
                  key={`legend-element-${element.label}`}
                >
                  {element.description}
                </div>
              );
            return (
              <div
                className="border w-40 p-4 text-xxs"
                key={`${element.service}-${element.label}`}
              >
                {literalValues ? element.score : element.value}
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
