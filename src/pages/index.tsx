import {useRouter} from "next/router";
import React, {useState} from "react";
import {Swiper as SwiperType} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import HomeBox from "../components/home-box";
import HomeCategorySelector from "../components/home-category-selector";
import HomeRankChart from "../components/home-rank-chart";
import Layout from "../components/layout";
import {companyRankingData} from "../data";
import ChevronLeft from "../images/icons/chevron-left.svg";
import ChevronRight from "../images/icons/chevron-right.svg";
import HomeDocument from "../images/icons/home-document.svg";
import HomeSearch from "../images/icons/home-search.svg";
import {CompanyRank, IndicatorCategoryExt} from "../types";

interface HomeProps {
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
  const router = useRouter();
  const [swiper, setSwiper] = useState<SwiperType>();
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

  const handleCompanyClick = (id: string) => {
    router.push(`/companies/${id}`);
  };

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-1/2 w-full md:bg-accent-red" />
          <div className="md:w-1/2 w-full md:bg-light-freedom" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 flex-grow items-center bg-accent-red z-10">
            <HomeBox title="2020 RDR Corporate Accountability Index" href="">
              <div className="flex flex-col h-full justify-end">
                <p>
                  Soluta omnis exercitationem dolorem qui eos. At libero alias
                  aut. Voluptas sint omnis ullam velit eius. Soluta omnis
                  exercitationem dolorem qui eos. At libero alias aut. Voluptas
                  sint omnis ullam velit eius.
                </p>
              </div>
            </HomeBox>
          </div>
          <div className="md:w-1/3 flex-grow items-center bg-diff-add z-10">
            <HomeBox title="Key Findings" href="key-findings">
              <div className="flex flex-col h-full justify-between">
                <p>
                  Soluta omnis exercitationem dolorem qui eos. At libero alias
                  aut. Voluptas sint omnis ullam velit eius.
                </p>

                <HomeSearch />
              </div>
            </HomeBox>
          </div>
          <div className="md:w-1/3 flex-grow items-center bg-light-freedom z-10">
            <HomeBox
              title="Recommendations"
              href="policy-recommendations"
              theme="dark"
            >
              <div className="flex flex-col h-full justify-end">
                <HomeDocument />
              </div>
            </HomeBox>
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between my-6">
        <div className="md:w-1/3 border">AAA</div>
        <div className="flex flex-col md:w-2/3">
          <HomeCategorySelector
            selected={selectedCategory}
            onClick={handleSelectCategory}
            className="px-3"
          />

          <div className="flex flex-col md:flex-row mt-3">
            <HomeRankChart
              className="w-full md:w-1/2 px-3"
              ranking={platformRankings}
              onClick={handleCompanyClick}
            />

            <HomeRankChart
              className="w-full md:w-1/2 mt-6 md:mt-0 px-3"
              ranking={telecomRankings}
              onClick={handleCompanyClick}
            />
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
      </div>

      <div className="md:container md:mx-auto flex flex-row md:justify-between items-center my-6">
        <div className="relative w-full flex items-center">
          <div className="w-full">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSwiper={(s) => setSwiper(s)}
              pagination={{clickable: true}}
              loop
            >
              <SwiperSlide>
                <div className="h-64 border">A</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">B</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">C</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">D</div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="h-64 border">E</div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="cursor-pointer absolute z-10">
            <ChevronLeft
              onClick={() => {
                if (swiper) swiper.slidePrev();
              }}
            />
          </div>

          <div className="cursor-pointer absolute right-0 z-10">
            <ChevronRight
              className="float-right"
              onClick={() => {
                if (swiper) swiper.slideNext();
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
