import React, { useMemo, useState } from "react";

import CompanySelector from "../components/company-selector-simple";
import CompanyYearOverYearTable from "../components/company-year-over-year-table";
import FlipTimeChart from "../components/flip-time-chart";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import { allCompanies, companyYearOverYearCategoryScoreData } from "../data";
import type {
  CompanySelectOption,
  CompanyYearOverYear,
  SortStrategiesYOY,
  SortStrategyYOY,
} from "../types";

interface TimeChartProps {
  companySelectors: CompanySelectOption[];
  yoyScores: CompanyYearOverYear[];
}

export const getStaticProps = async () => {
  const companies = await allCompanies();
  const companySelectors = companies.map(({ id: companyId, name, region }) => {
    return {
      value: companyId,
      label: name,
      region,
    };
  });

  const yoyScores = await Promise.all(
    companies.map(async ({ id, name, region }) => {
      const { scores } = await companyYearOverYearCategoryScoreData(id, "total");
      return {
        company: id,
        companyPretty: name,
        region,
        scores,
      };
    }),
  );

  return {
    props: {
      companySelectors,
      yoyScores,
    },
  };
};

const strategies: SortStrategiesYOY<CompanyYearOverYear> = new Map<
  string,
  SortStrategyYOY<CompanyYearOverYear>
>();
strategies.set(
  "Alphabetically",
  (options: CompanyYearOverYear[]): CompanyYearOverYear[] => {
    return options.sort((a, b) => {
      if (a.company > b.company) return 1;
      if (a.company < b.company) return -1;
      return 0;
    });
  },
);
strategies.set(
  "By Region",
  (options: CompanyYearOverYear[]): CompanyYearOverYear[] => {
    return options.sort((a, b) => {
      if (a.region > b.region) return 1;
      if (a.region < b.region) return -1;
      return 0;
    });
  },
);

const identitySortFn: SortStrategyYOY<CompanyYearOverYear> = (xs) => xs;

const TimeCharts = ({ companySelectors, yoyScores }: TimeChartProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [timeChart, setTimeChart] = useState(true);
  const [sortStrategy, setSortStrategy] = useState<
    "Alphabetically" | "By Region"
  >("Alphabetically");
  const years = useMemo(() => ["2017", "2018", "2019", "2020", "2022"], []);

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleFlipTimeChart = (toggle: boolean) => {
    setTimeChart(toggle);
  };

  const handleSelectSortStrategy = (
    strategy: "Alphabetically" | "By Region",
  ) => {
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
    <NarrativeContainer transparent>
      {({ Container }) => {
        return (
          <>
            <Container>
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
            </Container>
          </>
        );
      }}
    </NarrativeContainer>
  );
};

export default TimeCharts;
