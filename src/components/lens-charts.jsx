import React, {useState} from "react";

import CompanySelector from "./company-selector-simple";
import FlipAxis from "./flip-axis";
import LensCompanyChart from "./lens-company-chart";
import LensScoreChart from "./lens-score-chart";
import NarrativeTitle from "./narrative-title";

const LensCharts = (props) => {
  const {companySelectors, indicatorLenses, indicatorCompanyLenses} = props;
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [lensChart, setLensCharts] = useState(true);

  const handleSelectCompany = (ids) => {
    setSelectedCompanies(ids);
  };

  const handleFlipLenseCharts = (toggle) => {
    setLensCharts(toggle);
  };

  return (
    <div className="px-2 lg:px-2">
      <NarrativeTitle title="Lenses (in beta)" />

      <p className="pb-3">
        Lenses are a new look at our data that let us create scores from groups
        of indicators across all three of our main categories: governance,
        freedom of expression and information, and privacy. Below we’ve created
        two Lenses from indicators related to algorithmic transparency and
        targeted advertising, so that we can illuminate companies’ lag in these
        two policy areas.
      </p>

      <div className="flex flex-row justify-between items-center w-full my-12">
        <CompanySelector
          className="flex-none w-7/12 sm:w-9/12 md:w-1/2 self-center"
          companies={companySelectors}
          selected={selectedCompanies}
          onSelect={handleSelectCompany}
        />

        <FlipAxis
          id="lenses"
          label="Change View"
          onChange={handleFlipLenseCharts}
          flip={lensChart}
          className="ml-2"
        />
      </div>

      {lensChart ? (
        <LensScoreChart
          className="w-full"
          lenses={indicatorLenses}
          companyList={selectedCompanies}
        />
      ) : (
        <LensCompanyChart
          className="w-full"
          companyLenses={indicatorCompanyLenses}
          companyList={selectedCompanies}
        />
      )}
    </div>
  );
};

export default LensCharts;
