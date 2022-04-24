import React, {useState} from "react";

import {useMobileSize} from "../hooks";
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
  const isNarrow = useMobileSize(768);
  const [highlightedYear, setHighlightedYear] = useState<string>();

  return (
    <div className="mt-8 flex flex-col font-sans">
      <div className="-my-2 -mx-2 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <div>
            <table className="min-w-full">
              <thead className="bg-gray-50">
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
                    className="lg:w-7/12 sticky top-0 z-10 bg-white backdrop-blur backdrop-filter px-3 py-3.5 font-normal text-left text-sm sm:table-cell"
                  >
                    <CompanyYearOverYearHeader
                      years={years}
                      isNarrow={isNarrow}
                      onHoverYear={setHighlightedYear}
                    />
                  </th>
                </tr>
              </thead>

              {axis ? (
                <CompanyYearOverYearBar
                  data={data}
                  highlightedYear={highlightedYear}
                />
              ) : (
                <CompanyYearOverYearSlope
                  data={data}
                  highlightedYear={highlightedYear}
                  isNarrow={isNarrow}
                />
              )}
            </table>

            <p className="text-center text-xs">
              * Most companies’ scores dropped between 2019 and 2020 with the
              inclusion of our new indicators on targeted advertising and
              algorithmic systems. To learn more, please visit our{" "}
              <a href="https://rankingdigitalrights.org/methods-and-standards/#methodology-archive">
                Methodology development archive
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyYearOverYearTable;
