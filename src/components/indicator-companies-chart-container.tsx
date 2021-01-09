import React from "react";

import {IndicatorCategory, IndicatorCompanyScore} from "../types";
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
      <div className="flex justify-between">
        <IndicatorCompaniesChart
          category={category}
          scores={telecomScores}
          className="pr-3 w-1/2"
        />

        <IndicatorCompaniesChart
          category={category}
          scores={platformScores}
          className="pl-3 w-1/2"
        />
      </div>
    );

  // There are some indicators that have only scores for one company kind. There
  // is no situation where an indicator has no scores for either company kind. So
  // we can safely assume that our scores are either telecom or digital platform
  // scores.
  const singleScores = hasTelecomScores ? telecomScores : platformScores;
  return (
    <div className="flex justify-center mx-auto">
      <IndicatorCompaniesChart
        category={category}
        scores={singleScores}
        className="w-1/2"
      />
    </div>
  );
};

export default IndicatorCompaniesChartContainer;
