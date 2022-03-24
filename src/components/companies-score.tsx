import React, { useContext, useState } from "react";

import CategorySelector from "../components/category-selector";
import Selector from "../components/selector";
import Layout from "../components/layout";
import RankChart from "../components/rank-chart";
import ToggleLeftRight from "../components/toggle-left-right"
import FlipAxis from "../components/flip-axis"
import Help from "../../images/icons/help.svg";
import { companyRankingData } from "../data";
import { CompanyRank, CompanySelectOption, IndicatorCategoryExt } from "../types";
import { Option, SingleValue } from "../components/service-selector";
import { ModalContext } from "../context";



interface CompaniesScoreProps {
  // First element are telecom rankings, second are platform rankings.
  totalRanking: [CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
  governanceRanking: [CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
  freedomRanking: [CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
  privacyRanking: [CompanyRank[]];
}

export const getStaticProps = async () => {
  const [
    totalRanking,
    governanceRanking,
    freedomRanking,
    privacyRanking,
  ] = await Promise.all(
    ([
      "total",
      "governance",
      "freedom",
      "privacy",
    ] as IndicatorCategoryExt[]).map(async (category) => {
      return [
        await companyRankingData("internet", category),
      ];
    }),
  );

  return {
    props: {
      totalRanking,
      governanceRanking,
      freedomRanking,
      privacyRanking,
    },
  };
};

const CompaniesScore = ({
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: CompaniesScoreProps) => {
  const [selectedCategory, setSelectedCategory] = useState<IndicatorCategoryExt>("total");
  const [platformRankings, setPlatformRankings] = useState<CompanyRank[]>(totalRanking[0]);
  const { toggleModal } = useContext(ModalContext); // useModalCtx();


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

  const handleToggleLeftRight = (toggle: boolean) => {
    // fill this out to switch between companies & services chart displays
    // 
  };

  const handleFlipAxis = (toggle: boolean) => {
    // fill this out to switch between axes
  }

  const helpText = (
    <div className="flex flex-col">
    </div>
  );

  return (
    <Layout hideScrollArrow>
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
            <RankChart
              className="w-full sm:w-1/2 mr-3"
              ranking={platformRankings}
              category={selectedCategory}
              hasHeader
            />
            {/* insert rank-chart-columns here - with options */}
          </div>
        </div>
      </div>

    </Layout >
  );
};

export default CompaniesScore;
