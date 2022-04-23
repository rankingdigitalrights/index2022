import React from "react";

import {useChartResize} from "../hooks";
import {mapIcon} from "./evaluated-service";
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
  const {companies, category, serviceRankings, serviceOptions} = props;

  const [chartRef, chartWidth] = useChartResize();
  const chartHeight = 10;

  const categoryClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
    "text-prissian": category === "total",
  };

  const rankClassName = "bg-diff-del";

  // keys is an array of serviceKind strings
  const keys = Object.keys(serviceRankings);

  // collect together the data relevant to the selected category
  // prepRanks is an array of objects of the form:
  // [ {serviceKind: [ { id: company }, { id: company } ] } ]
  const prepRanks = keys.map((key) => {
    const companiesArr = serviceRankings[key][category].internet;
    return {[key]: companiesArr};
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
    return companies.includes(company.id) ? (
      <div
        key={`chart-row-${category}-${company.service}`}
        className="flex items-center space-x-1 pr-1.5 pl-1.5 font-sans"
      >
        <div
          key={`chart-label-${company.companyPretty}`}
          className="grow-0 flex flex-col align-left w-24"
        >
          <span className="text-prissian text-xs font-bold">
            {company.companyPretty}
          </span>
          <span className="text-xs font-thin">{company.service}</span>
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
    ) : // eslint-disable-next-line unicorn/no-null
    null;
  };

  // rankings is an array of objects of the form:
  // [ {serviceKind: [ {id: company }, {id: company } ] } ]
  // entry is an object: {serviceKind: [ {id: company}, {id: company} ] }
  const chartBlock = (rankings) => {
    return (
      <div className="space-y-5">
        {rankings.map((entry) => {
          // key is the serviceKind name
          const key = Object.keys(entry);
          // values is an array of companies that provide services of that kind
          const values = entry[key[0]];
          const list = values.filter((value) => companies.includes(value.id));
          return (
            <div
              key={`chartBlock-${key[0]}`}
              className="flex flex-col space-y-5"
            >
              {list.length > 0 && chartHeader(key[0])}
              {list.map((item, idx) => {
                return chartRow(item, idx);
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const divider = Math.ceil(prepRanks.length / 2);

  // TODO: add a conditional here so that if entries.length is 1, it shows only one column
  // TODO: this creates a chartblock before the selected companies have been filtered => rearrange this flow
  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row">
      <div className="w-full md:w-1/2">
        {chartBlock(prepRanks.slice(0, divider))}
      </div>
      <div className="w-full md:w-1/2">
        {chartBlock(prepRanks.slice(divider))}
      </div>
    </div>
  );
};

export default CompaniesByService;
