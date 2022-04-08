import React from "react";

import type {CompanyYearOverYear} from "../types";
import CompnayYearOverYearSlopeChart from "./company-year-over-year-slope-chart";
import CompanyYearOverYearSlopeHeader from "./company-year-over-year-slope-header";

interface CompanyYearOverYearSlopeProps {
  data: CompanyYearOverYear[];
}

const CompanyYearOverYearSlope = ({data}: CompanyYearOverYearSlopeProps) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-beige bg-white backdrop-blur backdrop-filter py-3.5 pl-4 pr-3 font-normal text-left text-sm sm:pl-6"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-beige bg-white backdrop-blur backdrop-filter hidden px-3 py-3.5 font-normal text-left text-sm lg:table-cell"
                  >
                    Region
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-beige bg-white backdrop-blur backdrop-filter px-3 py-3.5 font-normal text-left text-sm sm:table-cell"
                  >
                    <CompanyYearOverYearSlopeHeader data={data[0]} />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((company, idx) => (
                  <tr
                    key={company.company}
                    className={idx % 2 !== 0 ? undefined : "bg-beige"}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm font-normal  text-prissian sm:w-auto sm:max-w-none sm:pl-6">
                      {company.companyPretty}
                      <dl className="font-normal lg:hidden text-black">
                        <dt className="sr-only">Region</dt>
                        <dd className="mt-1 truncate font-normal">
                          {company.region}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-center lg:table-cell">
                      {company.region}
                    </td>
                    <td className="px-3 py-4">
                      <CompnayYearOverYearSlopeChart data={company} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyYearOverYearSlope;
