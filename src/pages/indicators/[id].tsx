import {useRouter} from "next/router";
import React, {useState} from "react";

import CompanyElements from "../../components/company-elements";
import CompanySelector from "../../components/company-selector";
import ExpandableDescription from "../../components/expandable-description";
import IndicatorCompaniesChartContainer from "../../components/indicator-companies-chart-container";
import IndicatorSelector, {
  IndicatorSelectOption,
} from "../../components/indicator-selector";
import Layout from "../../components/layout";
import SortSelector from "../../components/sort-selector";
import ToggleSwitch from "../../components/toggle-switch";
import {
  allElements,
  allIndicators,
  companyServices,
  indicatorAverages,
  indicatorCompanies,
  indicatorDetails,
  indicatorElements,
  indicatorScores,
} from "../../data";
import {
  Element,
  IndicatorAverages,
  IndicatorCompanyScore,
  IndicatorDetails,
  IndicatorElements,
  SelectOption,
  SortStrategies,
  SortStrategy,
} from "../../types";
import {isValidService, unreachable} from "../../utils";

type Params = {
  params: {
    id: string;
  };
};

interface CompanySelectOption extends SelectOption {
  score: number;
}

interface IndicatorPageProps {
  details: IndicatorDetails;
  indicators: IndicatorSelectOption[];
  companies: CompanySelectOption[];
  scores: IndicatorCompanyScore[];
  averages: IndicatorAverages;
  elements: IndicatorElements;
  elementDescriptions: Element[];
  services: Record<string, string[]>;
}

export const getStaticPaths = async () => {
  const data = await allIndicators();
  const paths = data
    .filter(({isParent}) => !isParent)
    .map(({name}) => ({
      params: {id: name},
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id: indicatorId}}: Params) => {
  const indicator = (await allIndicators()).find(
    ({name}) => name === indicatorId,
  );
  const allCompanies = await indicatorCompanies(indicatorId);

  if (!indicator)
    return unreachable(`Failed to load indicator for ${indicatorId}`);

  const details = await indicatorDetails(indicatorId);
  const scores = await indicatorScores(indicatorId);
  const companies = allCompanies.map(({id: companyId, name}) => {
    const score = scores.find(({id}) => id === companyId);

    return {
      value: companyId,
      label: name,
      score: score ? score.score : "NA",
    };
  });
  const averages = await indicatorAverages(indicatorId);
  const elements = await indicatorElements(indicatorId);
  const elementDescriptions = (await allElements()).filter(
    (e) => e.indicatorId === indicator.id,
  );
  const indicators = (await allIndicators()).map(
    ({name: value, label, isParent, parent}) => ({
      value,
      isParent,
      hasParent: !!parent,
      label: `${value}. ${label}`,
    }),
  );
  const services = (
    await Promise.all(
      allCompanies.map(async ({id: companyId, kind: companyKind}) => {
        const localServices = (await companyServices(companyId))
          .filter(({id: serviceId}) =>
            isValidService(serviceId, indicator.id, companyId, companyKind),
          )
          .map(({id}) => id);
        return {
          [companyId]: localServices,
        };
      }),
    )
  ).reduce((memo, localServices) => ({...localServices, ...memo}));

  return {
    props: {
      details,
      indicators,
      companies,
      scores,
      averages,
      elements,
      elementDescriptions,
      services,
    },
  };
};

const strategies: SortStrategies<CompanySelectOption> = new Map<
  string,
  SortStrategy<CompanySelectOption>
>();
strategies.set(
  "Company",
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

const IndicatorPage = ({
  details,
  indicators,
  companies,
  scores,
  elements,
  averages,
  elementDescriptions,
  services,
}: IndicatorPageProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortStrategy, setSortStrategy] = useState<string>("Company");
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
  const companySortStrategyFn = strategies.get("Company") || identitySortFn;

  const activeSelector: IndicatorSelectOption = {
    value: details.name,
    isParent: details.isParent,
    hasParent: details.hasParent,
    label: `${details.name}. ${details.label}`,
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
        <div className="flex flex-col mx-auto md:w-3/5 w-11/12">
          <IndicatorSelector
            indicators={indicators}
            selected={activeSelector}
            onSelect={handleSelectIndicator}
          />

          <section className="w-full mt-6 mx-auto  text-sm font-circular">
            {details.description}
          </section>

          <section className="w-full mt-6 mx-auto">
            <ExpandableDescription label="Elements">
              <ol className="list-none list-decimal mt-1">
                {elementDescriptions.map(({description, id}) => {
                  return (
                    <li key={`element-description-${id}`} className="ml-4">
                      {description}
                    </li>
                  );
                })}
              </ol>
            </ExpandableDescription>
          </section>

          <section className="w-full mt-2 mx-auto">
            <ExpandableDescription label="Research guidance">
              <p className="mt-1">{details.guidance}</p>
            </ExpandableDescription>
          </section>

          <div className="mt-10">
            <IndicatorCompaniesChartContainer
              category={details.category}
              scores={scores}
            />
          </div>
        </div>
      </div>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <div className="container mx-auto md:w-8/12 w-11/12">
          <div className="flex flex-col md:flex-row md:w-9/12 md:mx-auto md:justify-between items-center">
            <div className="w-full md:w-1/2 flex flex-col justify-between h-14">
              <span className="text-sm font-circular">Select companies:</span>

              <CompanySelector
                companies={companySortStrategyFn(
                  companies.map((obj) => ({...obj})),
                )}
                selected={selectedCompanies}
                onSelect={handleSelectCompany}
              />
            </div>

            <div className="w-full mt-2 md:mt-0 md:w-1/4 flex flex-col justify-between h-14 mx-6">
              <span className="text-sm font-circular">Sort:</span>

              <SortSelector
                strategies={sortOptions}
                selected={sortStrategy}
                onSelect={handleSelectSortStrategy}
              />
            </div>

            <div className="w-full md:w-1/4 flex flex-col lg:flex-row lg:justify-between h-14">
              <span className="text-xs font-circular">&nbsp;</span>

              <div>
                <ToggleSwitch label="Points" onChange={handleToggleSwitch} />
              </div>
            </div>
          </div>

          {dataGrids.map(({value: companyId, label}) => {
            const {score} = scores.find(({id}) => id === companyId) || {
              score: "NA",
            };

            return (
              <CompanyElements
                key={`company-element-${companyId}`}
                indicator={details.name}
                label={details.label}
                company={label}
                score={score}
                averages={
                  averages[companyId] === undefined ? {} : averages[companyId]
                }
                companyElements={elements[companyId] || {}}
                elementDescriptions={elementDescriptions}
                literalValues={literalValues}
                services={services[companyId] || []}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
