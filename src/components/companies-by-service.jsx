import React from "react";

import {useChartResize} from "../hooks";
import {mapIcon} from "./evaluated-service";
import PercentageBar from "./percentage-bar";
import PillHeader from "./pill-header";
import RankLabel from "./rank-label";

const serviceIcon = (serviceKind) => {
  return mapIcon(serviceKind, false, "white");
};

const CompaniesByService = ({serviceRankings, category}) => {
  const [chartRef, chartWidth] = useChartResize();
  const chartHeight = 10;

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const rankClassName = "bg-diff-del";

  const chartRow = (company, idx) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
    return (
      <div
        key={`chart-row-${category}-${company.service}`}
        className="flex items-center space-x-1 pr-1.5 pl-1.5 font-sans"
      >
        <div
          key={`chart-label-${company.companyPretty}`}
          className="grow-0 flex flex-col align-left w-32"
        >
          <span className="text-prissian text-sm font-bold">
            {company.companyPretty}
          </span>
          <span className="text-sm font-thin">{company.service}</span>
        </div>

        <RankLabel rank={company.rank} className={rankClassName} />

        <div
          key={`chart-bar-${company.companyPretty}-${company.service}-${company.score}`}
          ref={ref}
          className="grow flex items-center ml-2"
        >
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height={chartHeight}
            transform="translate(0, 0)"
            aria-label={`Score bar for ${company.companyPretty} ${company.service}: ${company.score}`}
          >
            <PercentageBar
              value={company.score}
              width={chartWidth}
              height={chartHeight}
              className={categoryClassName}
            />
          </svg>
        </div>

        <span className="shrink-0 text-right w-9 pl-1 pr-1 select-none float-right text-prissian text-xs">
          {company.score}%
        </span>
      </div>
    );
  };

  const divider = Math.ceil(serviceRankings.length / 2);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        <div className="flex flex-col items-start space-y-12">
          {serviceRankings
            .slice(0, divider)
            .map(({serviceCategory, serviceCategoryName, rankings}) => {
              return (
                <div
                  key={`chartBlock-${serviceCategory}`}
                  className="flex flex-col space-y-4 w-full"
                >
                  <PillHeader className="flex items-center w-full">
                    {serviceIcon(serviceCategory)}
                    <div>{serviceCategoryName}</div>
                  </PillHeader>

                  {rankings.map((item, idx) => {
                    return chartRow(item, idx);
                  })}
                </div>
              );
            })}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex flex-col items-start space-y-12">
          {serviceRankings
            .slice(divider)
            .map(({serviceCategory, serviceCategoryName, rankings}) => {
              return (
                <div
                  key={`chartBlock-${serviceCategory}`}
                  className="flex flex-col space-y-4 w-full"
                >
                  <PillHeader className="flex items-center w-full">
                    {serviceIcon(serviceCategory)}
                    <div>{serviceCategoryName}</div>
                  </PillHeader>

                  {rankings.map((item, idx) => {
                    return chartRow(item, idx);
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompaniesByService;
