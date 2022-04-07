import c from "clsx";
import {promises as fsP} from "fs";
import {useRouter} from "next/router";
import path from "path";
import React, {useEffect, useReducer, useState} from "react";

import CategorySelector from "../components/category-selector";
import CompaniesByService from "../components/companies-per-service";
import CompanySelector from "../components/company-selector-simple";
import FlipAxis from "../components/flip-axis";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import RankChart from "../components/rank-chart-nolabel";
import ServicesByCompany from "../components/services-per-company";
import ToggleLeftRight from "../components/toggle-left-right";
import {
  allCompanies,
  allServices,
  companyRankingData,
  companyServiceRankingData,
  companyServices,
} from "../data";
import {uniqueBy} from "../utils";

export const getStaticProps = async () => {
  const services = (await allServices()).filter(
    ({kind}) => kind !== "Group" && kind !== "Operating Company",
  );
  const serviceOptions = uniqueBy("kind", services).map(({kind, kindName}) => ({
    kind,
    label: kindName,
    value: kind,
  }));

  const companies = await allCompanies();
  const companySelectors = companies.map(({id: companyId, name, kind}) => {
    // FIXME: Score is hardcoded and it is unclear if it is even required.
    const score = {score: 20};

    return {
      value: companyId,
      label: name,
      score: score ? score.score : "NA",
      kind,
    };
  });

  const servicesByCompany = await Promise.all(
    companies.map(async ({id, name}) => {
      // FIXME: Scores are missing from the company services.
      const servicesForCompany = await companyServices(id);

      return {
        id,
        name,
        services: servicesForCompany,
      };
    }),
  );

  const companyRankings = await ["internet"].reduce(async (memo, kind) => {
    return ["total", "governance", "freedom", "privacy"].reduce(
      async (agg, category) => {
        const data = await agg;
        const rankings = await companyRankingData(kind, category);

        if (!data[category]) {
          data[category] = {};
        }

        data[category][kind] = rankings;
        return data;
      },
      memo,
    );
  }, Promise.resolve({}));

  const serviceRankings = await serviceOptions.reduce(
    async (memo, {kind: service}) => {
      const files = await fsP.readdir(
        path.join(process.cwd(), "data/rankings", service),
      );
      return files.reduce(async (agg, file) => {
        const data = await agg;

        const match = file.match(
          /^(internet)-(total|governance|privacy|freedom).json$/,
        );
        if (!match) return data;

        const kind = match[1];
        const category = match[2];

        const rankings = await companyServiceRankingData(
          service,
          kind,
          category,
        );

        if (!data[service]) {
          data[service] = {};
        }
        if (!data[service][category]) {
          data[service][category] = {};
        }
        data[service][category][kind] = rankings;

        return data;
      }, memo);
    },
    Promise.resolve({}),
  );

  return {
    props: {
      companySelectors,
      serviceOptions,
      serviceRankings,
      companyRankings,
      servicesByCompany,
    },
  };
};

const serviceQueryParam = (url) => {
  const re = /[&?]s=(.*)(&|$)/;
  const match = url.match(re);

  if (!match) return undefined;
  return match[1];
};

const initializeState = (state) => {
  const platformRankings = state.service
    ? state.serviceRankings[state.service.kind]?.[state.category]?.internet
    : state.companyRankings[state.category]?.internet;
  return {
    ...state,
    platformRankings,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCategory":
      return {
        ...state,
        category: action.category,
        platformRankings: state.service
          ? state.serviceRankings[state.service.kind]?.[action.category]
              ?.internet
          : state.companyRankings[action.category]?.internet,
      };
    default:
      throw new Error(`No match for action ${action.type}.`);
  }
};

const Explorer = ({
  companySelectors,
  serviceOptions,
  serviceRankings,
  companyRankings,
  servicesByCompany,
}) => {
  const router = useRouter();
  const queryService = serviceQueryParam(router.asPath);

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [typeOfGraph, setTypeOfGraph] = useState("total");
  const [axis, setAxis] = useState(true);

  const [state, dispatch] = useReducer(
    reducer,
    {
      category: "total",
      service: serviceOptions.find(({kind}) => kind === queryService),
      platformRankings: undefined,
      serviceRankings,
      companyRankings,
    },
    initializeState,
  );

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    // Ensure that we run this hook only once.
    if (!firstRender) return;

    router.push("/explore", undefined, {shallow: true});
    setFirstRender(false);
  }, [router, firstRender]);

  const handleSelectCategory = (category) => {
    dispatch({type: "setCategory", category});
  };

  const handleTypeOfGraphToggle = (toggle) => {
    if (toggle) {
      setTypeOfGraph("services");
    } else {
      setTypeOfGraph("total");
    }
  };

  const handleFlipAxis = (toggle) => {
    setAxis(toggle);
  };

  const handleSelectCompany = (ids) => {
    setSelectedCompanies(ids);
  };

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title="2022 Companies Score" />

                <p className="font-circular mt-6">
                  Some new text about the 2022 explore companies views.
                </p>

                <div className="flex flex-col md:flex-row mt-10 justify-between items-center w-full">
                  <ToggleLeftRight
                    labelLeft="Totals"
                    labelRight="Services"
                    toggle={typeOfGraph !== "total"}
                    onChange={handleTypeOfGraphToggle}
                  />
                  {typeOfGraph === "services" && (
                    <FlipAxis label="Flip axis" onChange={handleFlipAxis} />
                  )}
                </div>
                <div className="flex flex-col items-center mt-8">
                  <CompanySelector
                    className="flex-none w-full md:w-10/12 "
                    companies={companySelectors}
                    selected={selectedCompanies}
                    onSelect={handleSelectCompany}
                  />

                  <CategorySelector
                    selected={state.category}
                    onClick={handleSelectCategory}
                  />
                </div>
              </Container>

              <div className="relative mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12">
                <div
                  style={{minHeight: "22rem"}}
                  className={c(
                    "flex flex-col mx-auto mt-12 overflow-x-scroll sm:flex-row lg:overflow-x-visible px-3",
                  )}
                >
                  {typeOfGraph === "total" && (
                    <RankChart
                      ranking={
                        selectedCompanies.length > 0
                          ? state.platformRankings.filter(({id}) =>
                              selectedCompanies.includes(id),
                            )
                          : state.platformRankings
                      }
                      category={state.category}
                      hasHeader
                    />
                  )}
                  {typeOfGraph === "services" && axis && (
                    <ServicesByCompany
                      category={state.category}
                      axis="toggle up or down"
                      props="find props"
                      data={servicesByCompany}
                    />
                  )}
                  {typeOfGraph === "services" && !axis && (
                    <CompaniesByService
                      category={state.category}
                      axis="toggle up or down"
                      props="find props"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default Explorer;
