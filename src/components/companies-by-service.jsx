import React from "react";

import { useChartResize } from "../hooks";
import { mapIcon } from "./evaluated-service";
import PercentageBar from "./percentage-bar";
import PillHeader from "./pill-header";
import RankLabel from "./rank-label";

// FIXME: going crazy with the 'unique key' warning (also in spc)

// TODO: add highlighting to rows?
// TODO: add links to company names?

const serviceIcon = (serviceKind) => {
  return mapIcon(serviceKind, false, "white");
};

const CompaniesByService = (props) => {
  const { companies, category, serviceRankings, serviceOptions } = props;

  const [chartRef, chartWidth] = useChartResize();
  const chartHeight = 10;

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const rankClassName = "bg-diff-del";

  const serviceKindNames = Object.keys(serviceRankings);
  // collect together the data relevant to the selected category
  // prepRanks is an array of objects of the form:
  // [ {serviceKind: [ { id: company }, { id: company } ] } ]
  const prepRanks = serviceKindNames.map((serviceKindName) => {
    const companiesByService = serviceRankings[serviceKindName][category].internet;
    return { [serviceKindName]: companiesByService };
  });

  const chartHeader = (serviceKind) => {
    const sIcon = serviceIcon(serviceKind);
    // TODO improve this kindName function
    const kindName = serviceOptions.find((service) => {
      return service.kind === serviceKind;
    });
    return (
      <PillHeader className="flex items-center">
        {sIcon}
        <div>{kindName.label}</div>
      </PillHeader>
    );
  };

  const chartRow = (company, idx) => {
    // eslint-disable-next-line unicorn/no-null
    const ref = idx === 0 ? chartRef : null;
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

        <span className="shrink-0 text-right w-9 pl-1 pr-1 select-none float-right text-prissian text-xs">
          {company.score}%
        </span>
      </div>
    </div>
  };

  // rankings is an array of objects of the form:
  // [ {serviceKind: [ {id: company }, {id: company } ] } ]
  // entry is an object: {serviceKind: [ {id: company}, {id: company} ] }
  const chartBlock = (rankingsByCategory) => {
    return (
      <div className="flex flex-col items-start space-y-12">
        {rankingsByCategory.map((entry) => {
          const serviceKindName = Object.keys(entry);
          // values is an array of companies that provide services of that kind
          const companies = entry[serviceKindName[0]];
          return (
            <div
              // key={`chartBlock-${key[0]}`}
              className="flex flex-col space-y-4"
            >
              {companies.length > 0 && chartHeader(serviceKindName[0])}
              {companies.map((company, idx) => {
                return chartRow(company, idx);
              })}
            </div>
          );
        })}
      </div>
    );
  };

 // TODO: add a conditional here so that if entries.length is 1, it shows only one column

  // prepRanks is an array of objects of the form:
  // [ {serviceKind: [ { id: company }, { id: company } ] } ]

  // we need to filter the serviceKind array for selected companies
  // how can i access the serviceKind array
  // we need to return only the serviceKinds that have filtered companies

  const selectedCompanies = prepRanks.filter(serviceKind => {
    let serviceKindName = Object.keys(serviceKind)
    serviceKind[serviceKindName[0]].filter(company => {
      return companies.includes(company.id)
    })
    if (serviceKind[serviceKindName[0]].length > 0) {
      return serviceKind
    }
  })
  const divider = Math.ceil(selectedCompanies.length / 2);

  
  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row">
      <div className="w-full md:w-1/2">
        {chartBlock(selectedCompanies.slice(0, divider))}
      </div>
      <div className="w-full md:w-1/2">
        {chartBlock(selectedCompanies.slice(divider))}
      </div>
    </div>
  );
};

export default CompaniesByService;
