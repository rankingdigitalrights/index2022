import React from "react";

import {IndicatorCategory, IndicatorCompanyScore} from "../types";
import CompanyKindLabel from "./company-kind-label";
import IndicatorCompaniesChart from "./indicator-companies-chart";

interface IndicatorCompaniesChartContainerProps {
  category: IndicatorCategory;
  scores: IndicatorCompanyScore[];
}

const IndicatorCompaniesChartContainer = ({
  scores,
  category,
}: IndicatorCompaniesChartContainerProps) => {
  const telecomScores = scores.filter(({kind}) => kind === "telecom");
  const platformScores = scores.filter(({kind}) => kind === "internet");

  const hasTelecomScores = telecomScores.length > 0;
  const hasPlatformScores = platformScores.length > 0;

  // If we have scores for both company kinds we render two charts next to each
  // other.
  if (hasTelecomScores && hasPlatformScores)
    return (
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col pr-3 w-full md:w-1/2">
          <CompanyKindLabel kind="telecom" theme="dark" />

          <IndicatorCompaniesChart
            category={category}
            scores={telecomScores}
            className="mt-3"
          />
        </div>

        <div className="flex flex-col pl-3 w-full md:w-1/2">
          <CompanyKindLabel kind="internet" theme="dark" />

          <IndicatorCompaniesChart
            category={category}
            scores={platformScores}
            className="mt-3"
          />
        </div>
      </div>
    );

  // There are some indicators that have only scores for one company kind. There
  // is no situation where an indicator has no scores for either company kind. So
  // we can safely assume that our scores are either telecom or digital platform
  // scores.
  const singleScores = hasTelecomScores ? telecomScores : platformScores;
  return (
    <div className="flex justify-center mx-auto">
      <div className="flex flex-col w-1/2">
        <CompanyKindLabel
          kind={hasTelecomScores ? "telecom" : "internet"}
          theme="dark"
        />

        <IndicatorCompaniesChart
          category={category}
          scores={singleScores}
          className="mt-3"
        />
      </div>
    </div>
  );
};

export default IndicatorCompaniesChartContainer;
