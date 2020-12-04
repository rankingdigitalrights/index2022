import {useRouter} from "next/router";
import React, {useState} from "react";

import CompanyElements from "../../components/company-elements";
import CompanySelector from "../../components/company-selector";
import IndicatorSelector from "../../components/indicator-selector";
import Layout from "../../components/layout";
import SortSelector from "../../components/sort-selector";
import ToggleSwitch from "../../components/toggle-switch";
import {companyIndices, indicatorData, indicatorIndices} from "../../data";
import {
  IndicatorIndex,
  SelectOption,
  SortStrategies,
  SortStrategy,
} from "../../types";

type Params = {
  params: {
    id: string;
  };
};

interface IndicatorPageProps {
  index: IndicatorIndex;
  indicators: SelectOption[];
  companies: SelectOption[];
}

export const getStaticPaths = async () => {
  const data = await indicatorIndices();
  const paths = data.map(({id}) => ({
    params: {id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id: indicatorId}}: Params) => {
  const index = (await indicatorData(indicatorId)) as IndicatorIndex;
  const indicators = (await indicatorIndices()).map(({id: value, label}) => ({
    value,
    label: `${value}. ${label}`,
  }));
  const companyIndex = await companyIndices();
  const companies = companyIndex.map(({id: value, companyPretty: label}) => ({
    value,
    label,
  }));

  return {
    props: {
      index,
      indicators,
      companies,
    },
  };
};

const strategies: SortStrategies = new Map<string, SortStrategy>();
strategies.set(
  "Alphabetically Ascending",
  (options: SelectOption[]): SelectOption[] => {
    return options.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
  },
);
strategies.set(
  "Alphabetically Descending",
  (options: SelectOption[]): SelectOption[] => {
    return options.sort((a, b) => {
      if (a.label < b.label) return 1;
      if (a.label > b.label) return -1;
      return 0;
    });
  },
);

const identitySortFn: SortStrategy = (xs) => xs;

const IndicatorPage = ({index, indicators, companies}: IndicatorPageProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortStrategy, setSortStrategy] = useState<string>(
    "Alphabetically Ascending",
  );
  const [literalValues, setLiteralValues] = useState(false);

  const router = useRouter();

  const handleSelectIndicator = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleSelectSortStrategy = (strategy: string) => {
    setSortStrategy(strategy);
  };

  const handleToggleSwitch = (toggle: boolean) => {
    setLiteralValues(toggle);
  };

  const sortStrategyFn = strategies.get(sortStrategy) || identitySortFn;

  const activeSelector: SelectOption = {
    value: index.id,
    label: `${index.id}. ${index.label}`,
  };

  const sortOptions: SelectOption[] = [...strategies.keys()].map((value) => ({
    value,
    label: value,
  }));

  const dataGrids =
    selectedCompanies.length === 0
      ? sortStrategyFn(companies)
      : sortStrategyFn(
          companies.filter(({value}) => selectedCompanies.includes(value)),
        );

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col w-9/12 mx-auto">
          <IndicatorSelector
            indicators={indicators}
            selected={activeSelector}
            onSelect={handleSelectIndicator}
          />

          <section className="w-full mt-6 mx-auto">{index.description}</section>
        </div>
      </div>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-row w-9/12 mx-auto justify-between items-center">
            <div className="w-1/2 flex flex-col justify-between h-14">
              <span className="text-xs font-circular">Select companies:</span>

              <CompanySelector
                companies={companies}
                selected={selectedCompanies}
                onSelect={handleSelectCompany}
                sortStrategy={sortStrategyFn}
              />
            </div>

            <div className="w-1/4 flex flex-col justify-between h-14 mx-6">
              <span className="text-xs font-circular">Sort:</span>

              <SortSelector
                strategies={sortOptions}
                selected={sortStrategy}
                onSelect={handleSelectSortStrategy}
              />
            </div>

            <div className="flex flex-col justify-between h-14">
              <span className="text-xs font-circular">&nbsp;</span>

              <div>
                <ToggleSwitch
                  label="Literal values"
                  onChange={handleToggleSwitch}
                />
              </div>
            </div>
          </div>

          {dataGrids.map(({value}) => (
            <CompanyElements
              key={`company-element-${value}`}
              indicatorLabel={index.label}
              company={value}
              score={
                index.scores[value] === undefined ? "NA" : index.scores[value]
              }
              averages={
                index.averages[value] === undefined ? {} : index.averages[value]
              }
              companyElements={index.elements[value] || {}}
              literalValues={literalValues}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
