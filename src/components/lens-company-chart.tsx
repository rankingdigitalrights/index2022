import c from "clsx";
import React from "react";

import type {IndicatorLensCompanyIndex} from "../types";
import LensRankChart from "./lens-rank-chart";

interface LensCompanyChartProps {
  companyLenses: IndicatorLensCompanyIndex[];
  className?: string;
  companyList: [];
}

const LensCompanyChart = ({
  companyLenses,
  className,
  companyList,
}: LensCompanyChartProps) => {
  const selectedCompanies =
    companyList.length > 0
      ? companyLenses.filter((companyLens) =>
          companyList.includes(companyLens.company),
        )
      : companyLenses;

  const divider = Math.ceil(selectedCompanies.length / 2);

  return (
    <div className="flex flex-col space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        <ul className={c("space-y-12 list-none list-outside ml-0", className)}>
          {selectedCompanies
            .slice(0, divider)
            .map(({company, companyPretty, scores}) => {
              return (
                <li key={company} className="flex flex-col mt-2">
                  <div className="rounded-full bg-beige font-sans font-bold py-5 pl-4">
                    {companyPretty}
                  </div>

                  <LensRankChart ranking={scores} />
                </li>
              );
            })}
        </ul>
      </div>

      <div className="w-full md:w-1/2">
        <ul className={c("space-y-12 list-none list-outside ml-0", className)}>
          {selectedCompanies
            .slice(divider)
            .map(({company, companyPretty, scores}) => {
              return (
                <li key={company} className="flex flex-col mt-2">
                  <div className="rounded-full bg-beige font-sans font-bold py-5 pl-4">
                    {companyPretty}
                  </div>

                  <LensRankChart ranking={scores} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default LensCompanyChart;
