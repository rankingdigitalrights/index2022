import c from "clsx";
import React from "react";

import {IndicatorElement, IndicatorScore, MdxElement, Service} from "../types";
import ElementDescription from "./element-description";
import IndicatorElementTag from "./indicator-element-tag";

export interface IndicatorTableProps {
  indicatorLabel: string;
  company: string;
  averages: Record<string, IndicatorScore>;
  companyElements: Record<string, IndicatorElement[]>;
  literalValues: boolean;
  elementDescriptions: MdxElement[];
  services: Pick<Service, "id" | "name">[];
}

const IndicatorTableDesktop = ({
  indicatorLabel,
  company,
  averages,
  companyElements,
  literalValues,
  elementDescriptions,
  services,
}: IndicatorTableProps) => {
  const templateService = services[0] && companyElements[services[0].id];

  if (!templateService) return <div />;

  const legendRow = [indicatorLabel].concat(services.map(({name}) => name));
  const averagesRow = ["Averages"].concat(
    services.map(({id}) => `${averages[id]}`),
  );
  const rows = templateService.reduce((memo, element) => {
    const elements = services.reduce((agg, {id}) => {
      const serviceElement = companyElements[id].find(
        (e) => e.name === element.name,
      );

      if (!serviceElement) return agg;
      return agg.concat([serviceElement]);
    }, [] as IndicatorElement[]);

    return memo.concat([[element].concat(elements)]);
  }, [] as IndicatorElement[][]);

  const legend = legendRow.map((item, idx) => {
    const className = {
      "w-52 p-2 leading-tight": idx === 0,
      "w-32 p-6": idx > 0,
    };

    const innerClassName = {
      "w-24 h-16 text-center": idx > 0,
    };

    return (
      <div
        className={c(
          "flex-none flex flex-col items-center justify-center bg-white border border-disabled-dark",
          className,
        )}
        key={item}
      >
        <span
          className={c(
            "flex flex-col items-center justify-center",
            innerClassName,
          )}
        >
          <span>{item}</span>
        </span>
      </div>
    );
  });

  const footer = averagesRow.map((item, idx) => {
    const className = {
      "w-52 font-bold": idx === 0,
      "w-32 px-6": idx > 0,
    };

    const innerClassName = {
      "h-8": idx === 0,
      "w-24 h-8 text-center": idx > 0,
    };

    const serviceName = idx === 0 ? "averages-label" : services[idx - 1].name;

    return (
      <div
        className={c(
          "flex-none flex flex-col items-center justify-center border border-disabled-dark",
          className,
        )}
        key={`${company}-averages-${serviceName}-${item}`}
      >
        <span className={c("flex flex-col justify-center", innerClassName)}>
          <span>{item}</span>
        </span>
      </div>
    );
  });

  const grid = rows.map((row, itemPos) => {
    return (
      <div key={`row-${row?.[0].id}`} className="flex w-full text-sm">
        <div className="flex flex-row w-full">
          {row.map((element, idx) => {
            const elementDescription = elementDescriptions.find(
              (e) => e.id === element.name,
            )?.description;

            // Make the type checker happy, the data set should be complete and
            // provide the description.
            if (!elementDescription) return <div />;

            if (idx === 0)
              return (
                <div
                  className="flex-none flex flex-col items-center justify-center border border-disabled-dark w-52 p-2"
                  key={`legend-element-${element.id}`}
                >
                  {elementDescription && (
                    <span className="element">
                      {itemPos + 1}.{" "}
                      <ElementDescription description={elementDescription} />
                    </span>
                  )}
                </div>
              );
            return (
              <div
                className="flex-none flex flex-col items-center justify-center border border-disabled-dark w-32 p-6 text-sm flex flex-col items-center"
                key={`${element.id}`}
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
    <div className="flex flex-col company-table overflow-x-auto">
      <div className="flex flex-row">{legend}</div>

      {grid}

      <div className="flex flex-row">{footer}</div>
    </div>
  );
};

export default IndicatorTableDesktop;
