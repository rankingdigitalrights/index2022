import React from "react";

import type {CompanyYearOverYear} from "../types";
import CompanyYearOverYearBar from "./company-year-over-year-bar";
import CompanyYearOverYearHeader from "./company-year-over-year-header";
import CompanyYearOverYearSlope from "./company-year-over-year-slope";
import SortButton from "./company-year-over-year-sort-button";

interface CompanyYearOverYearTableProps {
  data: CompanyYearOverYear[];
  years: string[];
  axis: boolean;
  onChangeSorting: (sortOrder: "Alphabetically" | "By Region") => void;
  sortOrder: "Alphabetically" | "By Region";
}

const CompanyYearOverYearTable = ({
  data,
  years,
  axis,
  onChangeSorting,
  sortOrder,
}: CompanyYearOverYearTableProps) => {
  return (
    <div className="mt-8 flex flex-col font-sans">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 bg-white backdrop-blur backdrop-filter py-3.5 pl-4 pr-3 font-normal text-left text-sm sm:pl-6"
                  >
                    <div className="flex flex-col lg:flex-none">
                      <SortButton
                        label="Company"
                        isSelected={sortOrder === "Alphabetically"}
                        onClick={() => onChangeSorting("Alphabetically")}
                        className="text-prissian"
                      />

                      <SortButton
                        label="Region"
                        className="lg:hidden text-black"
                        onClick={() => onChangeSorting("By Region")}
                        isSelected={sortOrder === "By Region"}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 bg-white backdrop-blur backdrop-filter hidden px-3 py-3.5 font-normal text-left text-sm lg:table-cell"
                  >
                    <SortButton
                      label="Region"
                      onClick={() => onChangeSorting("By Region")}
                      isSelected={sortOrder === "By Region"}
                    />
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 bg-white backdrop-blur backdrop-filter px-3 py-3.5 font-normal text-left text-sm sm:table-cell"
                  >
                    <CompanyYearOverYearHeader years={years} />
                  </th>
                </tr>
              </thead>

              {axis ? (
                <CompanyYearOverYearSlope data={data} />
              ) : (
                <CompanyYearOverYearBar data={data} />
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyYearOverYearTable;
