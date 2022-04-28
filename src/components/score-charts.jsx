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

const ScoreCharts = ({
  companySelectors,
  companyScores,
  companiesByServiceScores,
  servicesByCompanyScores,
}) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("total");
  const [platformRankings, setPlatformRankings] = useState(companyScores.total);
  const [companiesByServiceRankings, setCompaniesByServiceRankings] = useState(
    companiesByServiceScores.total,
  );
  const [typeOfGraph, setTypeOfGraph] = useState("total");
  const [chartHeaders, setChartHeaders] = useState("companies");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setPlatformRankings(companyScores[category]);
    setCompaniesByServiceRankings(companiesByServiceScores[category]);
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

  const hasSelectedCompanies = selectedCompanies.length > 0;

  return (
    <div className="flex flex-col px-2 lg:px-0">
      <NarrativeTitle title="2022 Company & Service Scores" />

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
          id="score-charts"
          className="md:mb-0 self-center"
          label="Change View"
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
            category={selectedCategory}
            ranking={
              hasSelectedCompanies
                ? platformRankings.filter(({id}) =>
                    selectedCompanies.includes(id),
                  )
                : platformRankings
            }
          />
        )}

        {typeOfGraph === "services" && chartHeaders === "companies" && (
          <ServicesByCompany
            category={selectedCategory}
            scores={
              hasSelectedCompanies
                ? servicesByCompanyScores.filter(({id}) =>
                    selectedCompanies.includes(id),
                  )
                : servicesByCompanyScores
            }
          />
        )}

        {typeOfGraph === "services" && chartHeaders === "services" && (
          <CompaniesByService
            category={selectedCategory}
            scores={
              hasSelectedCompanies
                ? companiesByServiceRankings
                    .map(({rankings, ...rest}) => ({
                      ...rest,
                      rankings: rankings.filter(({id}) =>
                        selectedCompanies.includes(id),
                      ),
                    }))
                    .filter(({rankings}) => rankings.length > 0)
                : companiesByServiceRankings
            }
          />
        )}
      </div>
    </div>
  );
};

export default ScoreCharts;
