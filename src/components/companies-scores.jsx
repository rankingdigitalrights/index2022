import c from "clsx";
import React, {useState} from "react";

import CategorySelector from "./category-selector";
import CompaniesByService from "./companies-by-service";
// FIXME: eventually switch this out for the original company-selector component with an optional label property added
import CompanySelector from "./company-selector-simple";
import FlipAxis from "./flip-axis";
import NarrativeTitle from "./narrative-title";
import RankChart from "./rank-chart";
import ServicesByCompany from "./services-by-company";
import ToggleLeftRight from "./toggle-left-right";

const CompaniesScores = (props) => {
  const {
    totalRanking,
    governanceRanking,
    freedomRanking,
    privacyRanking,
    companySelectors,
    serviceRankings,
    servicesByCompany,
  } = props;

  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("total");
  const [platformRankings, setPlatformRankings] = useState(totalRanking);

  const [typeOfGraph, setTypeOfGraph] = useState("total");
  const [chartHeaders, setChartHeaders] = useState("companies");

  const handleSelectCategory = (category) => {
    switch (category) {
      case "total": {
        setSelectedCategory("total");
        setPlatformRankings(totalRanking);
        break;
      }
      case "governance": {
        setSelectedCategory("governance");
        setPlatformRankings(governanceRanking);
        break;
      }
      case "freedom": {
        setSelectedCategory("freedom");
        setPlatformRankings(freedomRanking);
        break;
      }
      case "privacy": {
        setSelectedCategory("privacy");
        setPlatformRankings(privacyRanking);
        break;
      }
      default: {
        break;
      }
    }
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
    <div className="flex flex-col px-2 lg:px-0">
      <NarrativeTitle title="2022 Companies Score" />

      <p className="mb-0">
        Select and compare total company and service scores, as well as scores
        in our three top-level categories: governance, freedom of expression and
        information, and privacy. Click on “Change View” to see scores by
        service. Learn more about how we tally our scores on our{" "}
        <a href="https://rankingdigitalrights.org/methods-and-standards">
          Methods and Standards
        </a>{" "}
        page.
      </p>

      <div className="flex flex-wrap-reverse justify-between items-center w-full my-12">
        <CompanySelector
          className="flex-none w-full md:w-1/2 mt-2 md:mt-0 self-center"
          companies={companySelectors}
          selected={selectedCompanies}
          onSelect={handleSelectCompany}
        />

        <ToggleLeftRight
          className="md:mb-0 self-center"
          labelLeft="Totals"
          labelRight="Services"
          toggle={typeOfGraph !== "total"}
          onChange={handleTypeOfGraphToggle}
        />

        <FlipAxis
          id="companies-scores"
          className="md:mb-0 self-center"
          label="Flip"
          flip={chartHeaders === "companies"}
          onChange={handleFlipAxis}
          disabled={typeOfGraph !== "services"}
        />
      </div>

      <CategorySelector
        className="mx-auto mb-12"
        selected={selectedCategory}
        onClick={handleSelectCategory}
      />

      <div
        className={c(
          "flex flex-col mx-auto w-full overflow-x-auto lg:overflow-x-visible",
        )}
      >
        {typeOfGraph === "total" && (
          <RankChart
            ranking={
              selectedCompanies.length > 0
                ? platformRankings.filter(({id}) =>
                    selectedCompanies.includes(id),
                  )
                : platformRankings
            }
            category={selectedCategory}
          />
        )}
        {typeOfGraph === "services" && chartHeaders === "companies" && (
          <ServicesByCompany
            category={selectedCategory}
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
            category={selectedCategory}
            serviceRankings={
              selectedCompanies.length > 0
                ? serviceRankings[selectedCategory]
                    .map(({rankings, ...rest}) => ({
                      ...rest,
                      rankings: rankings.filter(({id}) =>
                        selectedCompanies.includes(id),
                      ),
                    }))
                    .filter(({rankings}) => rankings.length > 0)
                : serviceRankings[selectedCategory]
            }
          />
        )}
      </div>
    </div>
  );
};

export default CompaniesScores;
