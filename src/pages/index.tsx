import React, {useState} from "react";

import CategorySelector from "../components/category-selector";
import HomeBox from "../components/home-box";
import HomeHighlightsSlider from "../components/home-highlights-slider";
import HomeSpotlightBox from "../components/home-spotlight-box";
import Layout from "../components/layout";
import LearnMore from "../components/learn-more";
import RankChart from "../components/rank-chart";
import {companyHighlights, companyRankingData} from "../data";
import {CompanyHighlight, CompanyRank, IndicatorCategoryExt} from "../types";

interface HomeProps {
  highlights: CompanyHighlight[];
  // First element are telecom rankings, second are platform rankings.
  totalRanking: [CompanyRank[], CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
  governanceRanking: [CompanyRank[], CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
  freedomRanking: [CompanyRank[], CompanyRank[]];
  // First element are telecom rankings, second are platform rankings.
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
  const highlights = await companyHighlights();

  return {
    props: {
      highlights,
      totalRanking,
      governanceRanking,
      freedomRanking,
      privacyRanking,
    },
  };
};

const Home = ({
  highlights,
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: HomeProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    IndicatorCategoryExt
  >("total");
  const [telecomRankings, setTelecomRankings] = useState<CompanyRank[]>(
    totalRanking[0],
  );
  const [platformRankings, setPlatformRankings] = useState<CompanyRank[]>(
    totalRanking[1],
  );

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

  return (
    <Layout hideScrollArrow>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="lg:w-1/2 w-full lg:bg-accent-red" />
          <div className="lg:w-1/2 w-full lg:bg-light-freedom" />
        </div>

        <div className="lg:container lg:mx-auto flex flex-col lg:flex-row lg:justify-between">
          <div className="lg:w-1/3 lg:flex-grow items-center bg-accent-red z-10">
            <HomeBox
              title="Will we govern tech? Or will we let it govern us?"
              href="/intro-essay"
              className="md:h-56 lg:h-80"
            >
              <div className="flex flex-col h-full justify-end">
                <p>
                  RDR Director Jessica Dheere on our fifth index and the path
                  forward
                </p>
              </div>
            </HomeBox>
          </div>

          <div className="flex flex-col sm:flex-row lg:w-2/3 bg-diff-add z-10">
            <div className="w-full sm:w-1/2 sm:flex-grow items-center bg-diff-add z-10 h-full">
              <HomeBox
                className="h-60 lg:h-80 bg-key-findings"
                title="Key findings"
                href="/key-findings"
              >
                <div className="flex flex-col h-full justify-end">
                  <p>
                    Companies are improving in principle, but failing in
                    practice
                  </p>
                </div>
              </HomeBox>
            </div>
            <div className="w-full sm:w-1/2 sm:flex-grow md:items-center bg-light-freedom z-10">
              <HomeBox
                title="How can companies change?"
                href="/recommendations"
                theme="dark"
                className="h-60 lg:h-80"
              >
                <div className="flex flex-col h-full justify-end text-black">
                  <p>
                    Our recommendations for companies and policymakers committed
                    to protecting and promoting human rights online
                  </p>
                </div>
              </HomeBox>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex flex-col lg:flex-row lg:justify-between my-10">
        <div className="font-circular lg:flex-grow w-full lg:w-1/3 pl-6 pr-10 mb-10">
          <h2 className="font-bold text-xl leading-10">The 2022 RDR Index</h2>

          <p className="mt-4">
            We evaluated 26 of the world’s most powerful digital platforms and
            telecommunications companies on their disclosed policies and
            practices affecting people’s rights to freedom of expression and
            privacy.
          </p>

          <LearnMore href="/explore-services" />
        </div>

        <div className="flex flex-col sm:flex-row lg:w-2/3 px-6">
          <div className="flex flex-col w-full">
            <CategorySelector
              selected={selectedCategory}
              onClick={handleSelectCategory}
            />

            <div className="flex flex-col sm:flex-row mt-10">
              <RankChart
                className="w-full sm:w-1/2 mr-3"
                ranking={platformRankings}
                category={selectedCategory}
                hasHeader
              />

              <RankChart
                className="w-full sm:w-1/2 mt-6 sm:mt-0 md:ml-3"
                ranking={telecomRankings}
                category={selectedCategory}
                hasHeader
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex flex-col md:flex-row md:justify-between bg-black">
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-context-over-code"
          title="Context before code"
          href="/spotlights/context-before-code"
          text="Protecting human rights in a state of emergency"
        />
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-unaccountable-algorithms"
          title="Moving fast and breaking us all"
          href="/spotlights/unaccountable-algorithms"
          text="Big Tech’s unaccountable algorithms"
        />
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-tech-giants"
          title="China’s tech giants can change:"
          href="/spotlights/china-tech-giants"
          text="But the state is still their number one stakeholder"
        />
      </div>

      <div className="lg:container lg:mx-auto flex flex-row md:justify-between items-center my-10 px-6">
        <HomeHighlightsSlider highlights={highlights} />
      </div>
    </Layout>
  );
};

export default Home;
