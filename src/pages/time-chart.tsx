import React, {useMemo, useState} from "react";

import CompanySelector from "../components/company-selector-simple";
import CompanyYearOverYearTable from "../components/company-year-over-year-table";
import FlipAxis from "../components/flip-axis";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {allCompanies, companyYearOverYearCategoryScoreData} from "../data";
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
  const companySelectors = companies.map(({id: companyId, name, region}) => {
    return {
      value: companyId,
      label: name,
      region,
    };
  });

  const yoyScores = await Promise.all(
    companies.map(async ({id, name, region}) => {
      const {scores} = await companyYearOverYearCategoryScoreData(id, "total");
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

const TimeCharts = ({companySelectors, yoyScores}: TimeChartProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [axis, setAxis] = useState(true);
  const [sortStrategy, setSortStrategy] = useState<
    "Alphabetically" | "By Region"
  >("Alphabetically");
  const years = useMemo(() => ["2017", "2018", "2019", "2020", "2022"], []);

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleFlipAxis = (toggle: boolean) => {
    setAxis(toggle);
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
          yoyScores.filter(({company}) => selectedCompanies.includes(company)),
        );

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <>
              <Container>
                <NarrativeTitle title="Time" />

                <div className="flex flex-row justify-between items-center w-full">
                  <CompanySelector
                    className="flex-none w-10/12 md:w-9/12 "
                    companies={companySelectors}
                    selected={selectedCompanies}
                    onSelect={handleSelectCompany}
                  />

                  <FlipAxis
                    label="Flip"
                    onChange={handleFlipAxis}
                    toggle={axis}
                  />
                </div>

                <CompanyYearOverYearTable
                  years={years}
                  data={dataGrids}
                  axis={axis}
                  onChangeSorting={handleSelectSortStrategy}
                  sortOrder={sortStrategy}
                />
              </Container>
            </>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default TimeCharts;
