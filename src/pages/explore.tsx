import React, {useState} from "react";

import HomeCategorySelector from "../components/home-category-selector";
import Layout from "../components/layout";
import RankChart from "../components/rank-chart";
import ToggleSwitch from "../components/toggle-switch";
import {companyRankingData} from "../data";
import {CompanyRank, IndicatorCategoryExt} from "../types";

interface ExploreProps {
  // First element are telecom rankings, second are platform rankings.
  totalRanking: [CompanyRank[], CompanyRank[]];
  governanceRanking: [CompanyRank[], CompanyRank[]];
  freedomRanking: [CompanyRank[], CompanyRank[]];
  privacyRanking: [CompanyRank[], CompanyRank[]];
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
        await companyRankingData("telecom", category),
        await companyRankingData("internet", category),
      ];
    }),
  );

  return {
    props: {totalRanking, governanceRanking, freedomRanking, privacyRanking},
  };
};

const Explore = ({
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: ExploreProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    IndicatorCategoryExt
  >("total");
  const [telecomRankings, setTelecomRankings] = useState<CompanyRank[]>(
    totalRanking[0],
  );
  const [platformRankings, setPlatformRankings] = useState<CompanyRank[]>(
    totalRanking[1],
  );
  const [byRegion, setByRegion] = useState(false);

  const handleSelectCategory = (category: IndicatorCategoryExt): void => {
    switch (category) {
      case "total": {
        setSelectedCategory("total");
        setTelecomRankings(totalRanking[0]);
        setPlatformRankings(totalRanking[1]);
        break;
      }
      case "governance": {
        setSelectedCategory("governance");
        setTelecomRankings(governanceRanking[0]);
        setPlatformRankings(governanceRanking[1]);
        break;
      }
      case "freedom": {
        setSelectedCategory("freedom");
        setTelecomRankings(freedomRanking[0]);
        setPlatformRankings(freedomRanking[1]);
        break;
      }
      case "privacy": {
        setSelectedCategory("privacy");
        setTelecomRankings(privacyRanking[0]);
        setPlatformRankings(privacyRanking[1]);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleRegionSwitch = (toggle: boolean) => {
    setByRegion(toggle);
  };

  return (
    <Layout>
      <div className="lg:container lg:mx-auto flex flex-col flex-row lg:justify-between py-6">
        <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
          <span className="mt-3 md:mt-0">Explore the data</span>
        </h1>

        <p className="font-circular mt-6">
          The 2019 Ranking Digital Rights Corporate Accountability Index
          evaluated 24 internet, mobile, and telecommunications companies on
          their disclosed commitments and policies affecting freedom of
          expression and privacy. RDR Index scores are based on company
          disclosure of policies evaluated according to 35 indicators in three
          categories.
        </p>

        <HomeCategorySelector
          selected={selectedCategory}
          onClick={handleSelectCategory}
          className="mx-auto mt-12"
        />
        <div className="flex my-6">
          <ToggleSwitch
            className="flex-none self-end w-full md:w-max sm:float-right my-3 md:mb-1"
            label="By Regions"
            onChange={handleRegionSwitch}
          />
        </div>

        <div className="flex flex-col sm:flex-row mt-12">
          <RankChart
            className="w-full sm:w-1/2 px-3"
            ranking={platformRankings}
            category={selectedCategory}
            byRegion={byRegion}
            hasHeader
          />

          <RankChart
            className="w-full sm:w-1/2 mt-6 sm:mt-0 px-3"
            ranking={telecomRankings}
            category={selectedCategory}
            byRegion={byRegion}
            hasHeader
          />
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
