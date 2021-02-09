import React, {useState} from "react";

import HomeCategorySelector from "../components/home-category-selector";
import Layout from "../components/layout";
import RankChart from "../components/rank-chart";
import ServiceSelector from "../components/service-selector";
import ToggleSwitch from "../components/toggle-switch";
import {allServices, companyRankingData} from "../data";
import {CompanyRank, IndicatorCategoryExt, ServiceOption} from "../types";
import {uniqueBy} from "../utils";

interface ExploreProps {
  services: ServiceOption[];
  // First element are telecom rankings, second are platform rankings.
  totalRanking: [CompanyRank[], CompanyRank[]];
  governanceRanking: [CompanyRank[], CompanyRank[]];
  freedomRanking: [CompanyRank[], CompanyRank[]];
  privacyRanking: [CompanyRank[], CompanyRank[]];
}

export const getStaticProps = async () => {
  const services = await allServices();
  const serviceOptions = uniqueBy("kind", services)
    .filter(({kind}) => kind !== "Group" && kind !== "OpCom")
    .map(({kind, label}) => ({kind, label, value: kind}));

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
    props: {
      services: serviceOptions,
      totalRanking,
      governanceRanking,
      freedomRanking,
      privacyRanking,
    },
  };
};

const Explore = ({
  services,
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: ExploreProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    IndicatorCategoryExt
  >("total");
  const [, setSelectedService] = useState<ServiceOption>();
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

  const handleServiceSelect = (service?: ServiceOption) => {
    setSelectedService(service);
  };

  const handleRegionSwitch = (toggle: boolean) => {
    setByRegion(toggle);
  };

  return (
    <Layout>
      <div className="lg:container lg:mx-auto flex flex-col flex-row lg:justify-between py-6 px-6">
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

        <div className="flex flex-col mt-12 md:mx-auto lg:w-3/5">
          <HomeCategorySelector
            selected={selectedCategory}
            onClick={handleSelectCategory}
          />

          <div className="flex flex-col w-full my-6 sm:flex-row">
            <ServiceSelector
              services={services}
              onSelect={handleServiceSelect}
              className="flex-grow w-full md:w-2/3 lg:w-3/5"
            />

            <ToggleSwitch
              className="flex-none w-full sm:w-max my-3 ml-3 md:mb-1"
              label="By Regions"
              onChange={handleRegionSwitch}
            />
          </div>
        </div>

        <div className="flex flex-col mt-12 sm:flex-row">
          <RankChart
            className="w-full sm:w-1/2 sm:pr-3"
            ranking={platformRankings}
            category={selectedCategory}
            byRegion={byRegion}
            hasHeader
          />

          <RankChart
            className="w-full mt-6 sm:w-1/2 sm:pl-3 sm:mt-0"
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
