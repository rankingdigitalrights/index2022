import c from "clsx";
import React from "react";

import {Element, IndicatorElement, IndicatorScore} from "../types";
import IndicatorElementTag from "./indicator-element-tag";

export interface IndicatorTableProps {
  indicatorLabel: string;
  company: string;
  averages: Record<string, IndicatorScore>;
  companyElements: Record<string, IndicatorElement[]>;
  literalValues: boolean;
  elementDescriptions: Element[];
  services: string[];
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
  const templateService = services[0] && companyElements[services[0]];

  if (!templateService) return <div />;

  const legendRow = [indicatorLabel].concat(services);
  const averagesRow = ["Averages"].concat(
    services.map((service) => `${averages[service]}`),
  );
  const rows = templateService.reduce((memo, element) => {
    const elements = services.reduce((agg, service) => {
      const serviceElement = companyElements[service].find(
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

    const serviceName = idx === 0 ? "averages-label" : services[idx - 1];

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
      <div className="flex w-full text-sm">
        <div className="flex flex-row w-full">
          {row.map((element, idx) => {
            const elementDescription =
              elementDescriptions.find((e) => e.id === element.name)
                ?.description || "";
            if (idx === 0)
              return (
                <div
                  className="flex-none flex flex-col items-center justify-center border border-disabled-dark w-52 p-2"
                  key={`legend-element-${element.id}`}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${itemPos + 1}. ${elementDescription}`,
                    }}
                  />
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
    <div className="flex flex-col font-circular company-table overflow-x-auto">
      <div className="flex flex-row">{legend}</div>

      {grid}

      <div className="flex flex-row">{footer}</div>
    </div>
  );
};

export default IndicatorTableDesktop;
