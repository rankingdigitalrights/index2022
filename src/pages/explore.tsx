import c from "clsx";
import {promises as fsP} from "fs";
import {useRouter} from "next/router";
import path from "path";
import React, {useContext, useEffect, useReducer, useState} from "react";

import CategorySelector from "../components/category-selector";
import CompaniesByService from "../components/companies-per-service";
import CompanySelector from "../components/company-selector-simple";
import FlipAxis from "../components/flip-axis";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import RankChart from "../components/rank-chart-nolabel";
import Selector, {SingleValue} from "../components/selector";
import ServicesByCompany from "../components/services-per-company";
import ToggleLeftRight from "../components/toggle-left-right";
import {ModalContext} from "../context";
import {
  allCompanies,
  allServices,
  companyRankingData,
  companyServiceRankingData,
} from "../data";
import Help from "../images/icons/help.svg";
import {
  CompanyKind,
  CompanyRank,
  CompanySelectOption,
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
  platformRankings: CompanyRank[] | ServiceCompanyRank[] | undefined;
  serviceRankings: ServiceCompanyRanks;
  companyRankings: CompanyRanks;
  axis: boolean;
};

type Action =
  | {type: "setCategory"; category: IndicatorCategoryExt}
  | {type: "setCompany"; company: CompanyRank | undefined}
  | {type: "updateRankings"};
interface ExplorerProps {
  // companies: CompanySelectOption[];
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

  // const allcompanies = (await allCompanies());
  // const companies = allcompanies.map(({id: companyId, name, kind}) => {
  //   const rank = companyRankings.find(({id}) => id === companyId);

  //   return {
  //     value: companyId,
  //     label: name,
  //     score: score ? score.score : "NA",
  //     kind,
  //   };
  // });

  const companyRankings = await (["internet"] as CompanyKind[]).reduce(
    async (memo, kind) => {
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
    },
    Promise.resolve({} as CompanyRanks),
  );

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
      // companies,
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
// type State = {
// export type IndicatorCategory = "gov" | "free" | "privacy";
//   category: IndicatorCategoryExt;
// export interface ServiceOption {
//   value: string;
//   label: string;
//   kind: ServiceKind;
// }
// export type ServiceKind = | "broadband" | "eCommerce" | etc
//   service: ServiceOption | undefined;
// export type CompanyRank = {
//   id: string;
//   companyPretty: string;
//   score: IndicatorScore;
//   kind: CompanyKind;
//   category: IndicatorCategoryExt;
//   rank: number;
// };
// export type ServiceCompanyRank = CompanyRank & {service: string}
//   platformRankings: CompanyRank[] | ServiceCompanyRank[] | undefined;
//   serviceRankings: ServiceCompanyRanks;
//   companyRankings: CompanyRanks;
// };
const initializeState = (state: State) => {
  const platformRankings = state.service
    ? state.serviceRankings[state.service.kind]?.[state.category]?.internet
    : state.companyRankings[state.category]?.internet;
  return {
    ...state,
    platformRankings,
  };
};

const reducer = (state: State, action: Action) => {
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
    case "setCompany":
      return {
        ...state,
        service: action.company,
        platformRankings: action.company
          ? state.companyRankings[action.company]?.[state.category]?.internet
          : state.companyRankings[state.category]?.internet,
      };
    default:
      throw new Error(`No match for action ${action.type}.`);
  }
};

const Explorer = ({
  // companies,
  serviceOptions,
  serviceRankings,
  companyRankings,
}: ExplorerProps) => {
  const router = useRouter();
  const queryService = serviceQueryParam(router.asPath);
  // const { toggleModal } = useContext(ModalContext); // useModalCtx();

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
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

  const handleSelectCategory = (category: IndicatorCategoryExt): void => {
    dispatch({type: "setCategory", category});
  };

  const handleCompanySelect = (company?: CompanyRank) => {
    dispatch({type: "setCompany", company});
  };

  const handleTypeOfGraphToggle = (toggle: boolean) => {
    if (toggle) {
      setTypeOfGraph("services");
    } else {
      setTypeOfGraph("total");
    }
  };

  const handleFlipAxis = (toggle: boolean) => {
    setAxis(toggle);
  };

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  // const helpText = (
  //   <div className="flex flex-col">
  //   </div>
  // );

  // TODO toggles for totals/services & flip axis are currently working, but not predictably or consistently - FIX THIS

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
                  {/* <button
                      onClick={() => {
                      toggleModal({
                      title:
                      "Toggle between displaying company totals, or displaying the breakdown of scores by the services that each company provides.",
                      content: helpText,
                      });
                      }}
                      >
                      <Help className="w-5 h-5 ml-3" aria-label="Help icon" />
                      </button> */}

                  {typeOfGraph === "services" && (
                    <FlipAxis label="Flip axis" onChange={handleFlipAxis} />
                  )}
                </div>
                <div className="flex flex-col items-center mt-8">
                  {/* pass a list of companies here */}
                  <CompanySelector
                    className="flex-none w-full md:w-10/12 "
                    // companies={companies}
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
                      ranking={state.platformRankings}
                      category={state.category}
                      hasHeader
                    />
                  )}
                  {typeOfGraph === "services" && axis && (
                    <ServicesByCompany
                      category={state.category}
                      axis="toggle up or down"
                      props="find props"
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
