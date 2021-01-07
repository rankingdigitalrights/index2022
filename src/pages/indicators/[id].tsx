import {useRouter} from "next/router";
import React, {useState} from "react";

import CompanyElements from "../../components/company-elements";
import CompanySelector from "../../components/company-selector";
import ExpandableDescription from "../../components/expandable-description";
import IndicatorCompaniesChart from "../../components/indicator-companies-chart";
import IndicatorSelector, {
  IndicatorSelectOption,
} from "../../components/indicator-selector";
import Layout from "../../components/layout";
import SortSelector from "../../components/sort-selector";
import ToggleSwitch from "../../components/toggle-switch";
import {allIndicators, companyIndices, indicatorData} from "../../data";
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

interface CompanySelectOption extends SelectOption {
  score: number;
}

interface IndicatorPageProps {
  index: IndicatorIndex;
  indicators: IndicatorSelectOption[];
  companies: CompanySelectOption[];
}

export const getStaticPaths = async () => {
  const data = await allIndicators();
  const paths = data
    .filter(({isParent}) => !isParent)
    .map(({id}) => ({
      params: {id},
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id: indicatorId}}: Params) => {
  const index = (await indicatorData(indicatorId)) as IndicatorIndex;
  const indicators = (await allIndicators()).map(
    ({id: value, label, isParent, parent}) => ({
      value,
      isParent,
      hasParent: !!parent,
      label: `${value}. ${label}`,
    }),
  );
  const companyIndex = await companyIndices();
  const companies = companyIndex.map(({id: value, companyPretty: label}) => {
    const score = index.scores[value];
    return {
      value,
      label,
      score: score === "NA" || !score ? 0 : score,
    };
  });

  return {
    props: {
      index,
      indicators,
      companies,
    },
  };
};

const strategies: SortStrategies<CompanySelectOption> = new Map<
  string,
  SortStrategy<CompanySelectOption>
>();
strategies.set(
  "Alphabetically",
  (options: CompanySelectOption[]): CompanySelectOption[] => {
    return options.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
  },
);
strategies.set(
  "Score",
  (options: CompanySelectOption[]): CompanySelectOption[] => {
    return options.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  },
);

const identitySortFn: SortStrategy = (xs) => xs;

const IndicatorPage = ({index, indicators, companies}: IndicatorPageProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortStrategy, setSortStrategy] = useState<string>("Alphabetically");
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
  const companySortStrategyFn =
    strategies.get("Alphabetically") || identitySortFn;

  const activeSelector: IndicatorSelectOption = {
    value: index.id,
    isParent: index.isParent,
    hasParent: index.hasParent,
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

  const elementDescriptions = Object.values(
    Object.values(index.elements)[0] || {},
  )[0];

  const hasScores = Object.keys(index.scores).length > 0;

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col mx-auto md:w-3/5 w-11/12">
          <IndicatorSelector
            indicators={indicators}
            selected={activeSelector}
            onSelect={handleSelectIndicator}
          />

          <section className="w-full mt-6 mx-auto  text-sm font-circular">
            {index.description}
          </section>

          <section className="w-full mt-6 mx-auto">
            <ExpandableDescription label="Elements">
              <ol className="list-none list-decimal mt-1">
                {elementDescriptions.map(({description, label}) => {
                  return (
                    <li key={`element-description-${label}`} className="ml-4">
                      {description}
                    </li>
                  );
                })}
              </ol>
            </ExpandableDescription>
          </section>

          <section className="w-full mt-2 mx-auto">
            <ExpandableDescription label="Research guidance">
              <p className="mt-1">{index.guidance}</p>
            </ExpandableDescription>
          </section>

          <div className="mt-10">
            {hasScores && (
              <IndicatorCompaniesChart
                category={index.category}
                scores={index.scores}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <div className="container mx-auto md:w-8/12 w-11/12">
          <div className="flex flex-row w-9/12 mx-auto justify-between items-center">
            <div className="w-1/2 flex flex-col justify-between h-14">
              <span className="text-sm font-circular">Select companies:</span>

              <CompanySelector
                companies={companySortStrategyFn(
                  companies.map((obj) => ({...obj})),
                )}
                selected={selectedCompanies}
                onSelect={handleSelectCompany}
              />
            </div>

            <div className="w-1/4 flex flex-col justify-between h-14 mx-6">
              <span className="text-sm font-circular">Sort:</span>

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

          {dataGrids.map(({value, label}) => (
            <CompanyElements
              key={`company-element-${value}`}
              indicatorLabel={index.label}
              company={label}
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
