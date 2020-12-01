import React from "react";

import {Element} from "../types";

interface CompanyElementsProps {
  indicatorLabel: string;
  company: string;
  companyElements: Record<string, Element[]>;
}

const CompanyElements = ({
  indicatorLabel,
  company,
  companyElements,
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

  const legend = legendRow.map((item) => (
    <div className="border w-64 p-4 text-xxs" key={item}>
      {item}
    </div>
  ));

  const grid = rows.map((row) => {
    return (
      <div className="flex w-full">
        <div className="flex flex-row w-full justify-between">
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
                className="border w-64 p-4 text-xxs"
                key={`${element.service}-${element.label}`}
              >
                {element.value}
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

      <div className="border flex flex-col w-full mt-3">
        <div className="border flex flex-row justify-between">{legend}</div>

        {grid}
      </div>
    </div>
  );
};

export default CompanyElements;
