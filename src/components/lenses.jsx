import React, {useState} from "react";
import CompanySelector from "./company-selector-simple";
import FlipAxis from "./flip-axis";
import LensCompanyChart from "./lens-company-chart";
import LensScoreChart from "./lens-score-chart";
import NarrativeContainer from "./narrative-container";
import NarrativeTitle from "./narrative-title";

const LensCharts = (props) => {
  const {companySelectors, indicatorLenses, indicatorCompanyLenses} = props
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [lenseChart, setLenseCharts] = useState(true);

  const handleSelectCompany = (ids) => {
    setSelectedCompanies(ids);
  };

  const handleFlipLenseCharts = (toggle) => {
    setLenseCharts(toggle);
  };

  return (
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <>
              <Container>
                <NarrativeTitle title="Lenses (in beta)" />

                <p className="pb-3">
                  Lenses are a new look at our data that let us create scores
                  from groups of indicators across all three of our main
                  categories: governance, freedom of expression and information,
                  and privacy. Below we’ve created two Lenses from indicators
                  related to algorithmic transparency and targeted advertising,
                  so that we can illuminate companies’ lag in these two policy
                  areas.
                </p>

                <ul>
                  <li>
                    <span className="font-bold">
                      Algorithmic transparency -
                    </span>{" "}
                    This Lens groups indicators that ask questions about whether
                    companies make a commitment to human rights in the
                    development and deployment of their algorithmic systems,
                    conduct human rights impact assessments on those systems,
                    make related policies accessible, disclose how they use
                    algorithms to curate, recommend, and rank content, and how
                    they use algorithms to collect, process, and make inferences
                    about user data.
                  </li>

                  <li>
                    <span className="font-bold">Targeted advertising -</span>{" "}
                    This Lens groups indicators that ask whether companies
                    conduct human rights impact assessments on their targeted
                    advertising systems, as well as whether they clearly
                    disclose rules around ad targeting and how those rules are
                    enforced.
                  </li>
                </ul>

                <div className="flex flex-row justify-between items-center w-full">
                  <CompanySelector
                    className="flex-none w-10/12 md:w-9/12 "
                    companies={companySelectors}
                    selected={selectedCompanies}
                    onSelect={handleSelectCompany}
                  />

                  <FlipAxis
                    label="Flip"
                    onChange={handleFlipLenseCharts}
                    flip={lenseChart}
                  />
                </div>
              </Container>

              <div className="relative mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12">
                {lenseChart ? (
                  <LensScoreChart className="w-full" lenses={indicatorLenses} />
                ) : (
                  <LensCompanyChart
                    className="w-full"
                    companyLenses={indicatorCompanyLenses}
                  />
                )}
              </div>
            </>
          );
        }}
      </NarrativeContainer>
  );
};

export default LensCharts;
