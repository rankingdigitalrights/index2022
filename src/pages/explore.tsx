import React, { useState, useReducer, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { promises as fsP } from "fs";
import path from "path";
import c from "clsx";


import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import RankChart from "../components/rank-chart-nolabel";
import ServicesByCompany from "../components/services-per-company"
import CompaniesByService from "../components/companies-per-service"
import FlipAxis from "../components/flip-axis";
import ToggleLeftRight from "../components/toggle-left-right";
import Help from "../images/icons/help.svg";

import { ModalContext } from "../context";
import {
  allCompanies,
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
import { uniqueBy } from "../utils";
import Selector, { SingleValue } from "../components/selector";
import CategorySelector from "../components/category-selector";


// import StateManager from "react-select";
// import CompaniesScore from "../components/companies-score";
// import { services } from "../csv";
// import { string } from "yargs";

// import ScoresOverTime from "./compare";
// import IndicatorScoresChart from "../components/indicator-scores-chart";

// ServiceCompanyRanks =
// { broadband: 
//   { governance: 
//     { internet: 
//       { id: string, 
//         score: IndicatorScore, 
//         kind: internet, 
//         category: broadband, 
//         rank: number, 
//         service: broadband 
//       }
//     }
//   }
// }}
type ServiceCompanyRanks = {
  [service in ServiceKind]: {
    [category in IndicatorCategoryExt]: {
      [kind in CompanyKind]: ServiceCompanyRank[];
    };
  };
};

// CompanyServiceRanks = {
// company:
//  { broadband: 
//     { governance: 
//       { internet: 
//         { id: string, 
//           score: IndicatorScore, 
//           kind: internet, 
//           category: broadband, 
//           rank: number, 
//           service: broadband 
//          }
//        }
//      }
//    }
//  }
// type CompanyServiceRanks = {
//   [service in Services]: ServiceCompanyRanks
// }

// CompanyRanks = {
//   governance: {
//     internet: {
//       id: string;
//       companyPretty: string;
//       score: IndicatorScore;
//       kind: CompanyKind;
//       category: IndicatorCategoryExt;
//       rank: number;
//     };
//   }
// }

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
  axis: Boolean;
};

type Action =
  | { type: "setCategory"; category: IndicatorCategoryExt }
  | { type: "setCompany"; company: CompanyRank | undefined }
  | { type: "updateRankings" };
interface ExplorerProps {
  serviceOptions: ServiceOption[];
  serviceRankings: ServiceCompanyRanks;
  companyRankings: CompanyRanks;
}

export const getStaticProps = async () => {
  const services = (await allServices()).filter(
    ({ kind }) => kind !== "Group" && kind !== "Operating Company",
  );
  const serviceOptions = uniqueBy("kind", services).map(({ kind, kindName }) => ({
    kind,
    label: kindName,
    value: kind,
  }));

  const companies = (await allCompanies());

  const companyRankings = await ([
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
    async (memo, { kind: service }) => {
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
      companies,
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
  console.log('match: ', match)
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
//   axis: Boolean;
// };
const initializeState = (state: State) => {
  const platformRankings = state.service
    ? state.serviceRankings[state.service.kind]?.[state.category]?.internet
    : state.companyRankings[state.category]?.internet;

  console.log('state: ', {
    ...state,
    platformRankings,
  })
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
      };
    case "setCompany":
      return {
        ...state,
        service: action.company,
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
  const { toggleModal } = useContext(ModalContext); // useModalCtx();

  const [literalValues, setLiteralValues] = useState(false);

  const [state, dispatch] = useReducer(
    reducer,
    {
      category: "total",
      // FIGURE OUT WHAT TO DO WITH THIS COMPANY PROPERTY
      company: undefined,
      service: serviceOptions.find(({ kind }) => kind === queryService),
      platformRankings: undefined,
      serviceRankings,
      companyRankings
    },
    initializeState,
  );

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    // Ensure that we run this hook only once.
    if (!firstRender) return;

    router.push("/explore", undefined, { shallow: true });
    setFirstRender(false);
  }, [router, firstRender]);

  const handleSelectCategory = (category: IndicatorCategoryExt): void => {
    dispatch({ type: "setCategory", category });
  };

  const handleCompanySelect = (company?: CompanyRank) => {
    dispatch({ type: "setCompany", company });
  };

  // Need here all the props that are passed down to company rank chart & company services chart 
  // -> for each company: list the services (and scores) they provide (for each of the four categories).
  // create new chart 'services-per-company-chart'
  // company: { service: 
  // { total: xx, 
  // gov: xx, 
  // free: xx, 
  // priv: xx
  // }
  // service: 
  // { total: xx, 
  // gov: xx, 
  // free: xx, 
  // priv: xx
  // }
  //}
  // for each service: list the companies (and their score, for each of the four categories) that provide this service 
  // create new chart 'companies-per-service-chart'
  // { service: 
  // { company: 
  // { total: xx,
  // gov: xx,
  // free: xx,
  // priv: xx
  //  },
  // { company: 
  // { total: xx,
  // gov: xx,
  // free: xx,
  // priv: xx
  //  },
  // }
  // }
  // the data for these two new charts is the same, but different sort functions

  // interface RankChartProps {
  //   ranking: CompanyRank[];
  //   className?: string;
  //   activeCompany?: string;
  //   category?: IndicatorCategoryExt;
  //   chartHeight?: number;
  //   hasHeader?: boolean;
  //   isPrint?: boolean;
  // }

  // const Explorer = ({
  //   totalRanking,
  //   governanceRanking,
  //   freedomRanking,
  //   privacyRanking,
  // }: ExplorerProps) => {
  //   const [selectedCategory, setSelectedCategory] = useState<IndicatorCategoryExt>("total");
  //   const [platformRankings, setPlatformRankings] = useState<CompanyRank[]>(totalRanking[0]);

  const handleServicesToggle = (toggle: boolean) => {
    console.log('handle toggle left-right')
    setLiteralValues(toggle)
    // fill this out to switch between companies & services chart displays
    // 
    // if toggle right (services chart), show flip axis toggle, if left, don't
  };

  const handleFlipAxis = (toggle: boolean) => {
    console.log('handle flip axis')
    // fill this out to switch between axes
  }

  const helpText = (
    <div className="flex flex-col">
    </div>
  );


  return (
    <Layout>
      <NarrativeContainer transparent>
        {({ Container }) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title="2022 Companies Score" />

                <p className="font-circular mt-6">
                  Some new text about the 2022 explore companies views.
                </p>

                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                  <ToggleLeftRight
                    labelLeft="Totals"
                    labelRight="Services"
                    onChange={handleServicesToggle}
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


                  {/* fix the toggle function */}
                  {state.services && (
                  <FlipAxis
                    label="Flip axis"
                    onChange={handleFlipAxis}
                  />
                  )}

                </div>
                {/* <div className="flex flex-col items-center mt-12"> */}
                <div className="flex flex-col items-center mt-12">
                  {/* finish the associated functions */}
                  <Selector<ServiceOption>
                    id="service-selector"
                    // options={companyOptions}
                    defaultValue={state.company}
                    isClearable
                    // onSelect={handleCompanySelect}
                    // LocalOption={Option}
                    LocalSingleValue={SingleValue}
                    className="my-6 self-stretch"
                  />

                  <CategorySelector
                    selected={state.category}
                    onClick={handleSelectCategory}
                  />
                </div>
              </Container>

      <div className="relative mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12">
        <div
          style={{ minHeight: "22rem" }}
          className={c(
            "flex flex-col mx-auto mt-12 overflow-x-scroll sm:flex-row lg:overflow-x-visible px-3"
          )}
        >

          {/* state1: company ranking */}

          {/* state2a: services ranking by company */}
          {/* switch i: axis1 */}
          {/* switch ii: axis2 */}

          {/* state 2b: company ranking by service */}
          {/* switch i: axis1 */}
          {/* switch ii: axis2 */}
          {state.companies &&
            //  MAKE SURE THIS STATE.COMPANIES = BOOLEAN PROPERTY EXISTS ON THE STATE OBJECT
            <RankChart
              className="w-full sm:w-1/2 sm:pr-3"
              ranking={state.platformRankings}
              category={state.category}
              hasHeader
            />
          }
          ({!state.companies &&
            // if state.axis is true, show services by company
            state.axis ?
            <ServicesByCompany
            // category={state.category}
            // axis="toggle up or down"
            // props="find props"
            />
            :
            // if state.axis is false, show companies by service
            <CompaniesByService
            // category={state.category}
            // axis="toggle up or down"
            // props="find props"
            />
          });

        </div>
      </div>
    </div >
  );
}}
      </NarrativeContainer >
    </Layout >
  );
};

export default Explorer;
