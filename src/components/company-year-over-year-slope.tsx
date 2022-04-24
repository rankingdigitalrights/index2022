import React from "react";

import type {CompanyYearOverYear} from "../types";
import CompanyYearOverYearSlopeChart from "./company-year-over-year-slope-chart";

interface CompanyYearOverYearSlopeProps {
  data: CompanyYearOverYear[];
  isNarrow: boolean;
}

const CompanyYearOverYearSlope = ({
  data,
  isNarrow,
}: CompanyYearOverYearSlopeProps) => {
  return (
    <tbody className="bg-white">
      {data.map((company, idx) => (
        <tr
          key={company.company}
          className={idx % 2 !== 0 ? undefined : "bg-beige"}
        >
          <td className="py-4 pl-4 pr-3 text-sm font-normal text-prissian sm:w-auto sm:max-w-none sm:pl-6">
            {company.companyPretty}
            <dl className="font-normal lg:hidden text-black">
              <dt className="sr-only">Region</dt>
              <dd className="mt-1 truncate font-normal">{company.region}</dd>
            </dl>
          </td>
          <td className="hidden px-3 py-4 text-sm lg:table-cell">
            {company.region}
          </td>
          <td className="px-3 py-4">
            <CompanyYearOverYearSlopeChart data={company} isNarrow={isNarrow} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default CompanyYearOverYearSlope;
