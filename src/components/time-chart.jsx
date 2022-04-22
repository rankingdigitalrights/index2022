import React, { useMemo, useState } from "react";

import CompanySelector from "./company-selector-simple";
import CompanyYearOverYearTable from "./company-year-over-year-table";
import FlipTimeChart from "./flip-time-chart";
import NarrativeContainer from "./narrative-container";
import NarrativeTitle from "./narrative-title";

const strategies = new Map();
strategies.set(
  "Alphabetically",
  options => {
    return options.sort((a, b) => {
      if (a.company > b.company) return 1;
      if (a.company < b.company) return -1;
      return 0;
    });
  },
);
strategies.set(
  "By Region",
  options => {
    return options.sort((a, b) => {
      if (a.region > b.region) return 1;
      if (a.region < b.region) return -1;
      return 0;
    });
  },
);

const identitySortFn = (xs) => xs;

const TimeCharts = (props) => {
  const { companySelectors, yoyScores } = props
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [timeChart, setTimeChart] = useState(true);
  const [sortStrategy, setSortStrategy] = useState("Alphabetically");
  const years = useMemo(() => ["2017", "2018", "2019", "2020", "2022"], []);

  const handleSelectCompany = (ids) => {
    setSelectedCompanies(ids);
  };

  const handleFlipTimeChart = (toggle) => {
    setTimeChart(toggle);
  };

  const handleSelectSortStrategy = (strategy) => {
    if (strategy) setSortStrategy(strategy);
  };

  const sortStrategyFn = strategies.get(sortStrategy) || identitySortFn;

  const dataGrids =
    selectedCompanies.length === 0
      ? sortStrategyFn(yoyScores)
      : sortStrategyFn(
        yoyScores.filter(({ company }) => selectedCompanies.includes(company)),
      );

  return (
    <div>
      <NarrativeTitle title="Performance Over Time" />

      <p className="pb-3">
        Here we show the total scores of companies year-over-year
        since their inclusion in the ranking. Note that between 2019
        and 2020 we expanded our methodology to include standards
        around targeted advertising and algorithmic systems. The
        expansion resulted in overall decline in total score for many
        of the companies in 2020.
      </p>

      <div className="flex flex-row justify-between items-center w-full">
        <CompanySelector
          className="flex-none w-10/12 md:w-9/12 "
          companies={companySelectors}
          selected={selectedCompanies}
          onSelect={handleSelectCompany}
        />

        <FlipTimeChart
          label={timeChart ? "Bars" : "Lines"}
          onChange={handleFlipTimeChart}
          toggle={timeChart}
        />
      </div>

      <CompanyYearOverYearTable
        years={years}
        data={dataGrids}
        axis={timeChart}
        onChangeSorting={handleSelectSortStrategy}
        sortOrder={sortStrategy}
      />
    </div>
  );
};

export default TimeCharts;
