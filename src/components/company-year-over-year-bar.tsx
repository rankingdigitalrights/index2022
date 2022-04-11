import React from "react";

import type {CompanyYearOverYear} from "../types";
import CompanyYearOverYearBarChart from "./company-year-over-year-bar-chart";
import CompanyYearOverYearBarLegend from "./company-year-over-year-bar-legend";

interface CompanyYearOverYearBarProps {
  data: CompanyYearOverYear[];
}

const CompanyYearOverYearBar = ({data}: CompanyYearOverYearBarProps) => {
  return (
    <tbody className="bg-white">
      <tr>
        <td>&nbsp;</td>
        <td className="hidden lg:table-cell">&nbsp;</td>
        <td className="pl-1 md:pl-3">
          <CompanyYearOverYearBarLegend />
        </td>
      </tr>

      {data.map((company, idx) => (
        <tr
          key={company.company}
          className={idx % 2 !== 0 ? undefined : "bg-beige"}
        >
          <td className="pl-4 pr-3 text-sm font-normal text-prissian sm:w-auto sm:max-w-none sm:pl-6">
            {company.companyPretty}
            <dl className="font-normal lg:hidden text-black">
              <dt className="sr-only">Region</dt>
              <dd className="mt-1 truncate font-normal">{company.region}</dd>
            </dl>
          </td>
          <td className="hidden px-3 text-sm text-center lg:table-cell">
            {company.region}
          </td>
          <td className="pl-3">
            <CompanyYearOverYearBarChart data={company} />
          </td>
        </tr>
      ))}

      <tr>
        <td>&nbsp;</td>
        <td className="hidden lg:table-cell">&nbsp;</td>
        <td className="md:pl-3">
          <CompanyYearOverYearBarLegend />
        </td>
      </tr>
    </tbody>
  );
};

export default CompanyYearOverYearBar;
