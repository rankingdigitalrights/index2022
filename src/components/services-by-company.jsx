import Link from "next/link";
import React from "react";

import {useChartResize} from "../hooks";
import {mapIcon} from "./evaluated-service";
import PercentageBar from "./percentage-bar";
import PillHeader from "./pill-header";

const ServicesByCompany = (props) => {
  const {category, companies} = props;
  const [chartRef, chartWidth] = useChartResize();
  const chartHeight = 10;

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const chartHeader = (companyName, companyId) => {
    return (
      <PillHeader>
        <Link passHref href={`/companies/${companyId}`}>
          <a>{companyName}</a>
        </Link>
      </PillHeader>
    );
  };

  const serviceIcon = (serviceKind) => {
    return mapIcon(serviceKind, false);
  };

  const chartRow = (icon, serviceName, score, idx) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
    return (
      <div
        key={`chart-row-${category}-${serviceName}`}
        className="flex items-center space-x-1 pr-1.5 pl-1.5"
      >
        <div className="flex-none justify-center w-8">{icon}</div>

        <div className="flex-none w-24 text-xs">{serviceName}</div>

        <div ref={ref} className="grow flex items-center ml-2">
          <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height={chartHeight}
            transform="translate(0, 0)"
            aria-label={`Score bar for ${serviceName}: ${score}`}
          >
            <PercentageBar
              value={score}
              width={chartWidth}
              height={chartHeight}
              className={categoryClassName}
            />
          </svg>
          <span className="shrink-0 text-right w-9 pl-1 pr-1 select-none float-right text-prissian text-xs">
            {score}%
          </span>
        </div>
      </div>
    );
  };

  const chartBlock = (companiesArr, cat) => {
    return (
      <div className="space-y-5">
        {companiesArr.map((company, idx) => {
          return (
            <div
              key={`chartBlock-${company.name}-${company.id}`}
              className="flex flex-col space-y-5"
            >
              {chartHeader(company.name, company.id)}
              {company.services.map((service) => {
                const sIcon = serviceIcon(service.kind);
                const score = service.categoryScore[cat];
                return chartRow(sIcon, service.name, score, idx);
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const divider = Math.ceil(companies.length / 2);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        {chartBlock(companies.slice(0, divider), category)}
      </div>
      <div className="w-full md:w-1/2">
        {chartBlock(companies.slice(divider), category)}
      </div>
    </div>
  );
};

export default ServicesByCompany;