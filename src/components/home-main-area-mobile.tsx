import React from "react";
import ReactPlayer from "react-player";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBoxAlt from "./home-box-alt";
import RankChart from "./rank-chart";

interface HomeMainAreaMobileProps {
  category: IndicatorCategoryExt;
  rankings: CompanyRank[];
  onSelectCategory: (category: IndicatorCategoryExt) => void;
}

const HomeMainAreaMobile = ({
  category,
  rankings,
  onSelectCategory,
}: HomeMainAreaMobileProps) => {
  return (
    <section className="flex flex-col">
      <HomeBoxAlt
        className="px-2 pt-8"
        title="Big Tech Keeps Failing Us"
        linkTitle="Read Our Key Findings"
        href="https://rankingdigitalrights.org/mini-report/key-findings-2022"
        theme="altDark"
      >
        <p className="text-black font-sans">
          For the sixth consecutive year, not one digital platform earned a
          passing grade in our ranking. While we see some incremental progress
          overall, this is no time for business as usual. Companies must improve
          their governance and accelerate their adoption of human rights
          standards to protect their users and the public interest.
        </p>
      </HomeBoxAlt>

      <div className="py-8 px-2 flex flex-col space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart ranking={rankings} category={category} />
      </div>

      <div className="flex flex-col px-2 py-8 space-y-8 bg-beige">
        <HomeBoxAlt
          title="Explore the Data!"
          linkTitle="Visit the Data Explorer"
          href="/explore"
          theme="dark"
        >
          <p className="pb-8 text-black font-sans">
            Watch a fascinating discussion on the future of Big Tech
            accountability with RDR&apos;s superstar panel. Hear what they have
            to say and new legislation, ESG shareholder resolutions targeting
            human rights harms, and how we can hold Big Tech accountable.
          </p>
        </HomeBoxAlt>
      </div>

      <div className="pt-[56.25%] relative">
        <ReactPlayer
          className="absolute top-0 left-0"
          url={[
            {
              src:
                "/index2022/videos/Charting_the_Future_of_Big_Tech_Accountability.webm",
              type: "video/webm",
            },
            {
              src:
                "/index2022/videos/Charting_the_Future_of_Big_Tech_Accountability.mp4",
              type: "video/mp4",
            },
          ]}
          config={{
            file: {
              attributes: {
                poster:
                  "/index2022/charting-the-future-of-big-tech-accountability.webp",
              },
            },
          }}
          width="100%"
          height="100%"
          pip
          controls
        />
      </div>

      <div className="px-2 py-8 bg-disabled overflow-x-hidden">
        <h3 className="font-bold text-xl mt-0 lg:h-32 flex flex-col text-prissian">
          What’s Next for Big Tech Accountability?
        </h3>

        <p className="pt-4 pb-0 text-black font-sans">
          On May 4, RDR brought together a panel of digital rights activists
          with deep experience taking on Big Tech. We asked them to assess the
          current landscape and look to the future in terms of activism,
          regulation, and accountability. As the panelists made clear, our very
          democracies are at stake.
        </p>

        <p className="pb-0 text-black font-sans">
          RDR Director Jessica Dheere kicked off the event with key findings
          from the Big Tech Scorecard, after which Nathalie Maréchal, our policy
          director, moderated the wide-ranging discussion. Topics covered
          included European and US legislation, the threat of too much power
          over digital platforms in the hands of too few individuals, and the
          future of privacy.
        </p>

        <p className="pb-0 text-black font-sans">
          Watch the full discussion on our website, tracker-free.
        </p>
      </div>
    </section>
  );
};

export default HomeMainAreaMobile;
