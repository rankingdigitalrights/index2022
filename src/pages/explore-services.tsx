import c from "clsx";
import {promises as fsP} from "fs";
import {useRouter} from "next/router";
import path from "path";
import React, {useEffect, useReducer, useState} from "react";

import CategorySelector from "../components/category-selector";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import RankChart from "../components/rank-chart";
import Selector from "../components/selector";
import ServiceRankChart from "../components/service-rank-chart";
import {Option, SingleValue} from "../components/service-selector";
import {
  allServices,
  companyRankingData,
  companyServiceRankingData,
} from "../data";
import {
  CompanyKind,
  CompanyRank,
  IndicatorCategoryExt,
  ServiceCompanyRank,
  ServiceKind,
  ServiceOption,
} from "../types";
import {uniqueBy} from "../utils";

type ServiceCompanyRanks = {
  [service in ServiceKind]: {
    [category in IndicatorCategoryExt]: {
      [kind in CompanyKind]: ServiceCompanyRank[];
    };
  };
};

type CompanyRanks = {
  [category in IndicatorCategoryExt]: {
    [kind in CompanyKind]: CompanyRank[];
  };
};

type State = {
  category: IndicatorCategoryExt;
  service: ServiceOption | undefined;
  telecomRankings: CompanyRank[] | ServiceCompanyRank[] | undefined;
  platformRankings: CompanyRank[] | ServiceCompanyRank[] | undefined;
  serviceRankings: ServiceCompanyRanks;
  companyRankings: CompanyRanks;
};

type Action =
  | {type: "setCategory"; category: IndicatorCategoryExt}
  | {type: "setService"; service: ServiceOption | undefined}
  | {type: "updateRankings"};

interface ExploreProps {
  serviceOptions: ServiceOption[];
  serviceRankings: ServiceCompanyRanks;
  companyRankings: CompanyRanks;
}

export const getStaticProps = async () => {
  const services = (await allServices()).filter(
    ({kind}) => kind !== "Group" && kind !== "Operating Company",
  );
  const serviceOptions = uniqueBy("kind", services).map(({kind, kindName}) => ({
    kind,
    label: kindName,
    value: kind,
  }));

  const companyRankings = await ([
    "telecom",
    "internet",
  ] as CompanyKind[]).reduce(async (memo, kind) => {
    return ([
      "total",
      "governance",
      "freedom",
      "privacy",
    ] as IndicatorCategoryExt[]).reduce(async (agg, category) => {
      const data = await agg;
      const rankings = await companyRankingData(kind, category);

      if (!data[category]) {
        data[category] = {} as {
          [kind in CompanyKind]: CompanyRank[];
        };
      }

      data[category][kind] = rankings;
      return data;
    }, memo);
  }, Promise.resolve({} as CompanyRanks));

  const serviceRankings = await serviceOptions.reduce(
    async (memo, {kind: service}) => {
      const files = await fsP.readdir(
        path.join(process.cwd(), "data/rankings", service),
      );
      return files.reduce(async (agg, file) => {
        const data = await agg;

        const match = file.match(
          /^(internet|telecom)-(total|governance|privacy|freedom).json$/,
        );
        if (!match) return data;

        // I read somewhere Typescript will receive RegEx Types in the future.
        // Until then I coerce the strings to the right type and just assume that
        // it's alright.
        const kind = match[1] as CompanyKind;
        const category = match[2] as IndicatorCategoryExt;

        const rankings = await companyServiceRankingData(
          service,
          kind,
          category,
        );

        if (!data[service]) {
          data[service] = {} as {
            [category in IndicatorCategoryExt]: {
              [kind in CompanyKind]: ServiceCompanyRank[];
            };
          };
        }
        if (!data[service][category]) {
          data[service][category] = {} as {
            [kind in CompanyKind]: ServiceCompanyRank[];
          };
        }
        data[service][category][kind] = rankings;

        return data;
      }, memo);
    },
    Promise.resolve({} as ServiceCompanyRanks),
  );

  return {
    props: {
      serviceOptions,
      serviceRankings,
      companyRankings,
    },
  };
};

const serviceQueryParam = (url: string): ServiceKind | undefined => {
  const re = /[&?]s=(.*)(&|$)/;
  const match = url.match(re);

  if (!match) return undefined;
  return match[1] as ServiceKind;
};

const initializeState = (state: State) => {
  const telecomRankings = state.service
    ? state.serviceRankings[state.service.kind]?.[state.category]?.telecom
    : state.companyRankings[state.category]?.telecom;
  const platformRankings = state.service
    ? state.serviceRankings[state.service.kind]?.[state.category]?.internet
    : state.companyRankings[state.category]?.internet;

  return {
    ...state,
    telecomRankings,
    platformRankings,
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setCategory":
      return {
        ...state,
        category: action.category,
        telecomRankings: state.service
          ? state.serviceRankings[state.service.kind]?.[action.category]
              ?.telecom
          : state.companyRankings[action.category]?.telecom,
        platformRankings: state.service
          ? state.serviceRankings[state.service.kind]?.[action.category]
              ?.internet
          : state.companyRankings[action.category]?.internet,
      };
    case "setService":
      return {
        ...state,
        service: action.service,
        telecomRankings: action.service
          ? state.serviceRankings[action.service.kind]?.[state.category]
              ?.telecom
          : state.companyRankings[state.category]?.telecom,
        platformRankings: action.service
          ? state.serviceRankings[action.service.kind]?.[state.category]
              ?.internet
          : state.companyRankings[state.category]?.internet,
      };
    default:
      throw new Error(`No match for action ${action.type}.`);
  }
};

const Explore = ({
  serviceOptions,
  serviceRankings,
  companyRankings,
}: ExploreProps) => {
  const router = useRouter();
  // The router query object isn't yet available on first render. We extract the
  // service query parameter ourselves from the router path to have a preselected
  // service on firts render.
  // See: https://nextjs.org/docs/routing/dynamic-routes#caveats
  const queryService = serviceQueryParam(router.asPath);

  const [state, dispatch] = useReducer(
    reducer,
    {
      category: "total",
      service: serviceOptions.find(({kind}) => kind === queryService),
      telecomRankings: undefined,
      platformRankings: undefined,
      serviceRankings,
      companyRankings,
    },
    initializeState,
  );

  // We are only interested in the preselected query object on first render.
  // After that we don't use routing anymore to preselect services. This is a
  // simple flag that is used below to preselect a service.
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    // Ensure that we run this hook only once.
    if (!firstRender) return;

    router.push("/explore-services", undefined, {shallow: true});
    setFirstRender(false);
  }, [router, firstRender]);

  const handleSelectCategory = (category: IndicatorCategoryExt): void => {
    dispatch({type: "setCategory", category});
  };

  const handleServiceSelect = (service?: ServiceOption) => {
    dispatch({type: "setService", service});
  };

  const chartClassName = {
    "sm:justify-center": state.telecomRankings && state.platformRankings,
    "sm:justify-around": !state.telecomRankings || !state.platformRankings,
  };

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title="Explore the data: Scores for platforms and services" />

                <p className="mt-6">
                  Which companies are strongest on privacy? How does WhatsApp
                  compare to WeChat? Use the tools below to sort by category or
                  service.
                </p>

                <div className="flex flex-col items-center mt-12">
                  <div>
                    <CategorySelector
                      selected={state.category}
                      onClick={handleSelectCategory}
                    />

                    <Selector<ServiceOption>
                      id="service-selector"
                      title="Select service"
                      options={serviceOptions}
                      defaultValue={state.service}
                      isClearable
                      onSelect={handleServiceSelect}
                      LocalOption={Option}
                      LocalSingleValue={SingleValue}
                      className="my-6 self-stretch"
                    />
                  </div>
                </div>
              </Container>

              <div className="relative mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12">
                <div
                  style={{minHeight: "22rem"}}
                  className={c(
                    "flex flex-col mx-auto mt-12 overflow-x-scroll sm:flex-row lg:overflow-x-visible px-3",

                    chartClassName,
                  )}
                >
                  {state.platformRankings &&
                    (state.service ? (
                      <ServiceRankChart
                        className="w-full sm:pr-3"
                        ranking={state.platformRankings as ServiceCompanyRank[]}
                        serviceKind={state.service.kind}
                        category={state.category}
                        hasHeader
                      />
                    ) : (
                      <RankChart
                        className="w-full sm:w-1/2 sm:pr-3"
                        ranking={state.platformRankings}
                        category={state.category}
                        hasHeader
                      />
                    ))}

                  {state.telecomRankings &&
                    (state.service ? (
                      <ServiceRankChart
                        className="w-full mt-6 sm:pl-3 sm:mt-0"
                        ranking={state.telecomRankings as ServiceCompanyRank[]}
                        serviceKind={state.service.kind}
                        category={state.category}
                        hasHeader
                      />
                    ) : (
                      <RankChart
                        className="w-full mt-6 sm:w-1/2 sm:pl-3 sm:mt-0"
                        ranking={state.telecomRankings}
                        category={state.category}
                        hasHeader
                      />
                    ))}
                </div>
              </div>
            </div>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default Explore;
