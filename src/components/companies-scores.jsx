import c from "clsx";
import React, {useReducer, useState} from "react";

import CategorySelector from "./category-selector";
import CompaniesByService from "./companies-per-service";
// FIXME: eventually switch this out for the original company-selector component with an optional label property added
import CompanySelector from "./company-selector-simple";
import FlipAxis from "./flip-axis";
import NarrativeTitle from "./narrative-title";
import RankChart from "./rank-chart-nolabel";
import ServicesByCompany from "./services-per-company";
import ToggleLeftRight from "./toggle-left-right";

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

const CompaniesScores = (props) => {
  const {
    companiesIds,
    companySelector,
    serviceOptions,
    serviceRankings,
    companyRankings,
    servicesByCompany,
  } = props;

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [typeOfGraph, setTypeOfGraph] = useState("total");
  const [chartHeaders, setChartHeaders] = useState("companies");

  // serviceOptions.find(({ kind }) => kind === queryService)

  const [state, dispatch] = useReducer(
    reducer,
    {
      category: "total",
      service: undefined,
      platformRankings: undefined,
      serviceRankings,
      companyRankings,
    },
    initializeState,
  );

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

  const handleFlipAxis = (flip) => {
    if (flip) {
      setChartHeaders("companies");
    } else {
      setChartHeaders("services");
    }
  };

  const handleSelectCompany = (ids) => {
    setSelectedCompanies(ids);
  };

  return (
    <div>
      <NarrativeTitle title="2022 Companies Score" />
      <p className="mt-6">
        Select and compare total company and service scores, as well as scores
        in our three top-level categories: governance, freedom of expression and
        information, and privacy. Click on “Change View” to see scores by
        service. Learn more about how we tally our scores on our{" "}
        <a href="https://rankingdigitalrights.org/methods-and-standards">
          Methods and Standards
        </a>{" "}
        page.
      </p>

      <div className="flex flex-col md:flex-row mt-10 justify-between items-center w-full">
        <ToggleLeftRight
          labelLeft="Totals"
          labelRight="Services"
          toggle={typeOfGraph !== "total"}
          onChange={handleTypeOfGraphToggle}
        />
        {typeOfGraph === "services" && (
          <FlipAxis
            label="Flip axis"
            flip={chartHeaders === "companies"}
            onChange={handleFlipAxis}
          />
        )}
      </div>
      <div className="flex flex-col items-center mt-8">
        <CompanySelector
          className="flex-none w-full md:w-10/12 "
          companies={companySelector}
          selected={selectedCompanies}
          onSelect={handleSelectCompany}
        />

        <CategorySelector
          selected={state.category}
          onClick={handleSelectCategory}
        />
      </div>
      <div>
        <div
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
          {typeOfGraph === "services" && chartHeaders === "companies" && (
            <ServicesByCompany
              category={state.category}
              companies={
                selectedCompanies.length > 0
                  ? servicesByCompany.filter(({id}) =>
                      selectedCompanies.includes(id),
                    )
                  : servicesByCompany
              }
            />
          )}
          {typeOfGraph === "services" && chartHeaders === "services" && (
            <CompaniesByService
              category={state.category}
              companies={
                selectedCompanies.length > 0 ? selectedCompanies : companiesIds
              }
              serviceRankings={serviceRankings}
              serviceOptions={serviceOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesScores;
