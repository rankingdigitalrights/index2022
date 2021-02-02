import React, {useState} from "react";

import HomeBox from "../components/home-box";
import HomeCategorySelector from "../components/home-category-selector";
import HomeHighlightsSlider from "../components/home-highlights-slider";
import HomeRankChart from "../components/home-rank-chart";
import HomeSpotlightBox from "../components/home-spotlight-box";
import Layout from "../components/layout";
import {companyHighlights, companyRankingData} from "../data";
import HomeDocument from "../images/icons/home-document.svg";
import HomeSearch from "../images/icons/home-search.svg";
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
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="lg:w-1/2 w-full lg:bg-accent-red" />
          <div className="lg:w-1/2 w-full lg:bg-light-freedom" />
        </div>

        <div className="lg:container lg:mx-auto flex flex-col lg:flex-row lg:justify-between">
          <div className="lg:w-1/3 lg:flex-grow items-center bg-accent-red z-10">
            <HomeBox
              title="How do internet companies treat human rights?"
              href="/"
            >
              <div className="flex flex-col h-full justify-end">
                <p>
                  RDR Director Jessica Dheere on our fifth index and the path
                  forward.
                </p>
              </div>
            </HomeBox>
          </div>

          <div className="flex flex-col sm:flex-row lg:w-2/3 bg-diff-add z-10">
            <div className="w-full sm:w-1/2 sm:flex-grow items-center bg-diff-add z-10 h-full">
              <HomeBox
                className="bg-key-findings"
                title="Key Findings"
                href="/key-findings"
              >
                <div className="flex flex-col h-full justify-between">
                  <p>
                    Companies are improving in principle, but failing in
                    practice
                  </p>

                  <HomeSearch />
                </div>
              </HomeBox>
            </div>
            <div className="w-full sm:w-1/2 sm:flex-grow md:items-center bg-light-freedom z-10">
              <HomeBox
                title="Recommendations"
                href="/policy-recommendations"
                theme="dark"
              >
                <div className="flex flex-col h-full justify-between">
                  <p>What policymakers and companies need to know for 2021</p>

                  <HomeDocument />
                </div>
              </HomeBox>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex flex-col lg:flex-row lg:justify-between  my-6">
        <div className="font-circular font-bold text-xl leading-10 lg:flex-grow w-full lg:w-1/3 p-3">
          2020 RDR Index
        </div>

        <div className="flex flex-col sm:flex-row lg:w-2/3">
          <div className="flex flex-col w-full">
            <HomeCategorySelector
              selected={selectedCategory}
              onClick={handleSelectCategory}
              className="px-3"
            />

            <div className="flex flex-col sm:flex-row mt-3">
              <HomeRankChart
                className="w-full sm:w-1/2 px-3"
                ranking={platformRankings}
                category={selectedCategory}
              />

              <HomeRankChart
                className="w-full sm:w-1/2 mt-6 sm:mt-0 px-3"
                ranking={telecomRankings}
                category={selectedCategory}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container lg:mx-auto flex flex-col md:flex-row md:justify-between">
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-context-over-code"
          title="Context over code"
          href="/spotlights/spotlight-one"
          text="Protecting human rights in times of crisis"
        />
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-unaccountable-algorithms"
          title="Unaccountable algorithms"
          href="/spotlights/spotlight-two"
          text="Will company policies ever see the light of day?"
        />
        <HomeSpotlightBox
          className="md:w-1/3 h-64 bg-china-tech-giants"
          title="China’s tech giants have proven they can change."
          href="/spotlights/china-tech-giants"
          text="But the state is still their number one stakeholder."
        />
      </div>

      <div className="lg:container lg:mx-auto flex flex-row md:justify-between items-center my-6">
        <HomeHighlightsSlider highlights={highlights} />
      </div>
    </Layout>
  );
};

export default Home;
