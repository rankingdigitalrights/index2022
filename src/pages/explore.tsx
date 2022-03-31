import React, { useState, useReducer, useEffect } from "react";
import StateManager from "react-select";
import { useRouter } from "next/router";
import path from "path";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import CompaniesScore from "../components/companies-score";
import ServicesByCompany from "../components/services-per-company"
import CompaniesByService from "../components/companies-per-service"
import FlipAxis from "../components/flip-axis";
import { services } from "../csv";
import { companyRankingData } from "../data";
import {
  CompanyKind,
  CompanyRank,
  IndicatorCategoryExt,
  ServiceCompanyRank,
  ServiceKind,
  ServiceOption,
} from "../types";
import { axisBottom } from "d3";

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
  axis: Boolean;
};

interface ExplorerProps {
  totalRanking: [CompanyRank[]];
  governanceRanking: [CompanyRank[]];
  freedomRanking: [CompanyRank[]];
  privacyRanking: [CompanyRank[]];
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

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setCategory":
      return {
        ...state,
        category: action.category,
      };
    case "setService":
      return {
        ...state,
        service: action.service,
      };
    default:
      throw new Error(`No match for action ${action.type}.`);
  }
};

const Explorer = ({ }) => {
  const [state, dispatch] = useReducer(reducer, {}, initializeState);
}

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

const handleToggleLeftRight = (toggle: boolean) => {
  console.log('handle toggle left-right')
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


const handleSelectCategory = (category: IndicatorCategoryExt): void => {
  switch (category) {
    case "total": {
      setSelectedCategory("total");
      setPlatformRankings(totalRanking[0]);
      break;
    }
    case "governance": {
      setSelectedCategory("governance");
      setPlatformRankings(governanceRanking[0]);
      break;
    }
    case "freedom": {
      setSelectedCategory("freedom");
      setPlatformRankings(freedomRanking[0]);
      break;
    }
    case "privacy": {
      setSelectedCategory("privacy");
      setPlatformRankings(privacyRanking[0]);
      break;
    }
    default: {
      break;
    }
  }
};

return (
  <Layout>
    <div className="relative">
      <div className="absolute flex flex-row w-full h-full top-0">
        <div className="lg:w-1/2 w-full lg:bg-accent-red" />
        <div className="lg:w-1/2 w-full lg:bg-light-freedom" />
      </div>
    </div>
    {/* <div className="enter css for putting companies/services & flip-axis toggles on one line"> */}
    <div className="flex-none self-end flex w-full my-3 sm:float-left md:w-max md:mb-1">
      <ToggleLeftRight labelLeft="View Totals" labelRight="View Services" onChange={handleToggleLeftRight} />
      <button
        onClick={() => {
          toggleModal({
            title:
              "Toggle between displaying company totals, or displaying the breakdown of scores by the services that each company provides.",
            content: helpText,
          });
        }}
      >
        <Help className="w-5 h-5 ml-3" aria-label="Help icon" />
      </button>
    </div>
    <div className="flex-none self-end flex w-full my-3 sm:float-right md:w-max md:mb-1">
      {/* add if ToggleLeft : show FlipAxis */}
      <FlipAxis label="Flip axis" onChange={handleFlipAxis} />
    </div>
    {/* </div> */}
    <div className="lg:container lg:mx-auto flex flex-col lg:flex-row lg:justify-between my-10">
      <div className="flex flex-col sm:flex-row lg:w-2/3 px-6">
        <div>
          <Selector<CompanySelectOption>
            id="company-selector"
            isClearable
            defaultValue="Select company..."
            LocalSingleValue={SingleValue}
            className="w-full sm:w-1/2 mr-3"
          />
        </div>
        <div className="flex flex-col w-full">
          <CategorySelector
            selected={selectedCategory}
            onClick={handleSelectCategory}
          />
        </div>
        <NarrativeContainer transparent>
          {({ Container }) => {
            return (
              <div>
                <Container>
                  {/* state1: company ranking */}
                  {/* state2a: services ranking by company */}
                  {/* switch i: axis1 */}
                  {/* switch ii: axis2 */}
                  {/* state 2b: company ranking by service */}
                  {/* switch i: axis1 */}
                  {/* switch ii: axis2 */}
                  {state.companies ?
                    <RankChart
                      className="w-full sm:w-1/2 sm:pr-3"
                      ranking={state.platformRankings}
                      category={state.category}
                      hasHeader
                    />
                    : next
                  }
                  {state.services &&
                    // if state.axis is true, show services by company
                    state.axis ?
                    <ServicesByCompany
                      category={state.category}
                      axis="toggle up or down"
                      props="find props"
                    />
                    :
                    // if state.axis is false, show companies by service
                    <CompaniesByService
                      category={state.category}
                      axis="toggle up or down"
                      props="find props"
                    />
                  }

                  {/* time-score */}
                </Container>
              </div>
            );
          }}
        </NarrativeContainer>
      </div>
  </Layout >
);

export default Explorer;
