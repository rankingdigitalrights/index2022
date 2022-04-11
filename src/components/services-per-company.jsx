import React from "react";
import Link from "next/link";

import c from "clsx";
import { useChartResize } from "../hooks";
import { mapIcon } from "./evaluated-service";
import PercentageBar from "./percentage-bar"


const ServicesByCompany = (props) => {

  let category = props.category
  let companies = props.companies
  const [chartRef, chartWidth] = useChartResize();
  const chartHeight = 10

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const chartBlock = (companies, category) => {
    return (
      <div className="space-y-5">
        {companies.map((company, idx) => {
          return (
            <div className="flex flex-col space-y-5">
              {chartHeader(company.name, company.id)}
              {company.services.map(service => {
                const sIcon = icon(service.kind)
                const score = service.categoryScore[category]
                return chartRow(sIcon, service.name, score, idx)
              })
              }
            </div>
          )
        })
        }
      </div>
    )
  }

  const chartHeader = (companyName, companyId) => {
    return (
      <rect
        className="flex-grow h-9 text-prissian font-bold indent-5 bg-beige rounded-full content-center">
        <Link passHref href={`/companies/${companyId}`}>
          <a className="">
            {companyName}
          </a >
        </Link>
      </rect >
    )
  }

  const chartRow = (icon, serviceName, score, idx) => {
    const ref = idx === 0 ? chartRef : null;
    return (
      <div className="flex items-center space-x-1 pr-1.5 pl-1.5">
        <div className="flex-none justify-center w-8">
          {icon}
        </div>

        <div className="flex-none w-24 text-xs">
          {serviceName}
        </div>

        <div ref={ref} className="flex-grow">
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
        </div>
        <span className="w-4 flex-none select-none float-right text-right text-xs">{score}%</span>
      </div>
    );
  };

  const icon = (serviceKind) => {
    return mapIcon(serviceKind, false);
  }

  const divider = Math.ceil(companies.length / 2)

  return (
    <div className="flex flex-col space-x-8 md:flex-row">
      <div className="w-full md:w-1/2">
        {chartBlock(companies.slice(0, divider), category)}
      </div>
      <div className="w-full md:w-1/2">
        {chartBlock(companies.slice(divider), category)}
      </div>
    </div>
  );
}

export default ServicesByCompany;





  // companies [
  //   { id: 'Alibaba',
  //     name: 'Alibaba',
  //     services: [
  //        {
  //          id: 'Taobao.com',
  //          kind: 'eCommerce',
  //          kindName: 'eCommerce',
  //          name: 'Taobao.com',
  //          categoryScore: { freedom: 28, governance: 13, privacy: 43, total: 34 }
  //        },
  //        {
  //          id: 'AliGenie',
  //          kind: 'pda',
  //          kindName: 'Virtual assistant',
  //          name: 'AliGenie',
  //          categoryScore: { freedom: 11, governance: 9, privacy: 31, total: 21 }
  //         }
  //       ]
  //    }
  //  .....
  // ]