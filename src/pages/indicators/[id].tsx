import c from "clsx";
import {useRouter} from "next/router";
import React, {useState} from "react";

import CompanyElements from "../../components/company-elements";
import CompanySelector from "../../components/company-selector";
import ExpandableDescription from "../../components/expandable-description";
import IndicatorCompaniesChartContainer from "../../components/indicator-companies-chart-container";
import IndicatorSelector from "../../components/indicator-selector";
import Layout from "../../components/layout";
import Selector from "../../components/selector";
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
  CompanySelectOption,
  Element,
  IndicatorAverages,
  IndicatorCompanyScore,
  IndicatorDetails,
  IndicatorElements,
  IndicatorSelectOption,
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
  const companies = allCompanies.map(({id: companyId, name, kind}) => {
    const score = scores.find(({id}) => id === companyId);

    return {
      value: companyId,
      label: name,
      score: score ? score.score : "NA",
      kind,
    };
  });
  const averages = await indicatorAverages(indicatorId);
  const elements = await indicatorElements(indicatorId);
  const elementDescriptions = (await allElements()).filter(
    (e) => e.indicatorId === indicator.id,
  );
  const indicators = (await allIndicators()).map(
    ({name: value, label, isParent, parent, category}) => ({
      value,
      isParent,
      category,
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
  "By Score",
  (options: CompanySelectOption[]): CompanySelectOption[] => {
    return options.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });
  },
);

const identitySortFn: SortStrategy<CompanySelectOption> = (xs) => xs;

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
  const [sortStrategy, setSortStrategy] = useState<string>("Alphabetically");
  const [literalValues, setLiteralValues] = useState(false);

  const router = useRouter();

  const handleSelectIndicator = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleSelectSortStrategy = (strategy?: SelectOption) => {
    if (strategy) setSortStrategy(strategy.value);
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
    category: details.category,
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

  const widthClassName = "lg:w-9/12 xl:w-7/12 px-2 lg:px-0";

  return (
    <Layout>
      <section className={c("lg:container lg:mx-auto mt-8", widthClassName)}>
        <IndicatorSelector
          indicators={indicators}
          selected={activeSelector}
          onSelect={handleSelectIndicator}
        />

        <p className="mt-6 pb-0 text-sm font-circular">{details.description}</p>

        <ExpandableDescription className="mt-6" label="Elements">
          <ol className="list-inside list-decimal">
            {elementDescriptions.map(({description, id}) => {
              return (
                <li key={`element-description-${id}`} className="pb-2">
                  {description}
                </li>
              );
            })}
          </ol>
        </ExpandableDescription>

        <ExpandableDescription className="mt-2" label="Research guidance">
          <p
            className="mt-1"
            dangerouslySetInnerHTML={{__html: details.guidance}}
          />
        </ExpandableDescription>
      </section>

      <section className="lg:container lg:mx-auto lg:flex xl:justify-start lg:w-9/12 xl:w-7/12 px-2 lg:px-0">
        <IndicatorCompaniesChartContainer
          className="flex-none mt-6"
          indicator={details.id}
          category={details.category}
          scores={scores}
        />
      </section>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <section className={c("lg:container lg:mx-auto", widthClassName)}>
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <CompanySelector
              className="flex-none w-full md:w-6/12"
              companies={companySortStrategyFn(
                companies.map((obj) => ({...obj})),
              )}
              selected={selectedCompanies}
              onSelect={handleSelectCompany}
            />

            <Selector<SelectOption>
              id="sort-selector"
              title="Sort"
              className="flex-grow w-full mt-2 md:mt-0 mx-6"
              options={sortOptions}
              onSelect={handleSelectSortStrategy}
            />

            <ToggleSwitch
              className="flex-none self-end w-full md:w-max sm:float-right my-3 md:mb-1"
              label="Points"
              onChange={handleToggleSwitch}
            />
          </div>
        </section>

        <section className="lg:container lg:mx-auto lg:w-10/12 xl:w-9/12 2xl:w-9/12 px-2 lg:px-0 2xl:pl-10 mt-10">
          {dataGrids.map(({value: companyId, label}) => {
            const {score} = scores.find(({id}) => id === companyId) || {
              score: "NA",
            };

            return (
              <CompanyElements
                key={`company-element-${companyId}`}
                className="mt-10"
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
        </section>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
