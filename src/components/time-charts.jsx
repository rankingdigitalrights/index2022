import c from "clsx";
import React, {useMemo, useState} from "react";

import Bars from "../images/icons/yoy-bars.svg";
import Lines from "../images/icons/yoy-lines.svg";
import CompanySelector from "./company-selector-simple";
import CompanyYearOverYearTable from "./company-year-over-year-table";
import NarrativeTitle from "./narrative-title";
import ToggleLeftRight from "./toggle-left-right";

const strategies = new Map();
strategies.set("Alphabetically", (options) => {
  return options.sort((a, b) => {
    if (a.company > b.company) return 1;
    if (a.company < b.company) return -1;
    return 0;
  });
});
strategies.set("By Region", (options) => {
  return options.sort((a, b) => {
    if (a.region > b.region) return 1;
    if (a.region < b.region) return -1;
    return 0;
  });
});

const identitySortFn = (xs) => xs;

const TimeCharts = (props) => {
  const {companySelectors, yoyScores} = props;
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [timeChart, setTimeChart] = useState(false);
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
          yoyScores.filter(({company}) => selectedCompanies.includes(company)),
        );

  return (
    <div className="px-2 lg:px-0">
      <NarrativeTitle title="Performance Over Time" />

      <p className="pb-3">
        Here we show the total scores of companies year-over-year since their
        inclusion in the ranking. Note that between 2019 and 2020 we expanded
        our methodology to include standards around targeted advertising and
        algorithmic systems. The expansion resulted in overall decline in total
        score for many of the companies in 2020.
      </p>

      <div className="flex flex-row space-x-2 justify-between items-center w-full my-12">
        <CompanySelector
          className="w-9/12 md:w-1/2 self-center"
          companies={companySelectors}
          selected={selectedCompanies}
          onSelect={handleSelectCompany}
        />

        <ToggleLeftRight
          id="time-chart"
          onChange={handleFlipTimeChart}
          toggle={timeChart}
          labelLeft={(labelClassName) => {
            return (
              <span
                className={c("flex items-center space-x-1", labelClassName)}
              >
                <span>Lines</span> <Lines className="w-5 h-5 hidden md:block" />
              </span>
            );
          }}
          labelRight={(labelClassName) => {
            return (
              <span
                className={c("flex items-center space-x-1", labelClassName)}
              >
                <span>Bars</span> <Bars className="w-5 h-5 hidden md:block" />
              </span>
            );
          }}
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
