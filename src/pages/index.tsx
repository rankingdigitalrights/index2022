import React from "react";

import FeaturedEssays from "../components/home-featured-essays";
import MainArea from "../components/home-main-area";
import Teaser from "../components/home-teaser";
import Layout from "../components/layout";
import {companyRankingData} from "../data";
import {CompanyRank, IndicatorCategoryExt} from "../types";

interface HomeProps {
  totalRanking: CompanyRank[];
  governanceRanking: CompanyRank[];
  freedomRanking: CompanyRank[];
  privacyRanking: CompanyRank[];
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
    ] as IndicatorCategoryExt[]).map(async (category) =>
      companyRankingData("internet", category),
    ),
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

const Home = ({
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: HomeProps) => {
  return (
    <Layout hideScrollArrow>
      <main>
        <Teaser />

        <MainArea
          totalRanking={totalRanking}
          governanceRanking={governanceRanking}
          freedomRanking={freedomRanking}
          privacyRanking={privacyRanking}
        />

        <FeaturedEssays />
      </main>
    </Layout>
  );
};

export default Home;
