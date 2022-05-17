import c from "clsx";
import React from "react";
import ReactPlayer from "react-player";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBoxAlt from "./home-box-alt";
import RankChart from "./rank-chart";
import Arrow from "./rdr-arrow";

interface HomeMainAreaDesktopProps {
  category: IndicatorCategoryExt;
  rankings: CompanyRank[];
  onSelectCategory: (category: IndicatorCategoryExt) => void;
}

const HomeMainAreaDesktop = ({
  category,
  rankings,
  onSelectCategory,
}: HomeMainAreaDesktopProps) => {
  const altBoxClassName = "lg:p-6";

  return (
    <section className="xl:container xl:mx-auto grid lg:grid-rows-2 lg:grid-cols-3">
      <div className="pt-6">
        <HomeBoxAlt
          className={c("h-10/12", altBoxClassName)}
          title="Big Tech Keeps Failing Us"
          linkTitle="Read Our Key Findings"
          href="https://rankingdigitalrights.org/mini-report/key-findings-2022"
          theme="altDark"
        >
          <p className="pb-2 text-sm text-black font-sans">
            For the sixth year, no digital platform earned a passing grade.
            While we see some progress, this is no time for business as usual.
            Companies must do better to protect their users and the public
            interest.
          </p>
        </HomeBoxAlt>
      </div>

      <div className="px-6 py-12 space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart className="" ranking={rankings} category={category} />
      </div>

      <div className="bg-beige pt-6">
        <HomeBoxAlt
          className={c("h-10/12", altBoxClassName)}
          title="Explore the Data!"
          linkTitle="Visit the Data Explorer"
          href="/explore"
          theme="dark"
        >
          <p className="pb-2 text-sm text-black font-sans">
            Which companies commit to human rights? Who discloses the most about
            how they moderate content? Where is your data safest in case of a
            breach? Drill down into more than 300 aspects of company policies to
            answer questions like these in our interactive Data Explorer.
          </p>
        </HomeBoxAlt>
      </div>

      <div className="lg:col-span-2 relative bg-black">
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
          playsinline
          pip
          controls
        />
      </div>

      <div className="relative bg-disabled">
        <div className="h-full flex ">
          <div className={c("self-center", altBoxClassName)}>
            <h3 className="font-bold text-xl mt-0 lg:h-32 flex flex-col text-prissian">
              What’s Next for Big Tech Accountability?
            </h3>

            <p className="pb-0 text-black text-sm font-sans">
              On May 4, RDR brought together a panel of digital rights activists
              with deep experience taking on Big Tech. We asked them to assess
              the current landscape and look to the future in terms of activism,
              regulation, and accountability. As the panelists made clear, our
              very democracies are at stake.
            </p>

            <p className="pb-0 text-black text-sm font-sans">
              RDR Director Jessica Dheere kicked off the event with key findings
              from the Big Tech Scorecard, after which Nathalie Maréchal, our
              policy director, moderated the wide-ranging discussion. Topics
              covered included European and US legislation, the threat of too
              much power over digital platforms in the hands of too few
              individuals, and the future of privacy.
            </p>

            <p className="pb-0 text-black text-sm font-sans">
              Watch the full discussion on our website, tracker-free.
            </p>
          </div>
        </div>

        <div className="absolute -top-8 left-0 self-center w-full">
          <div className="flex flex-row space-x-2 w-fit mx-auto">
            <Arrow color="blue" className="w-16 h-16" outline />
            <Arrow color="turquoise" className="w-16 h-16" outline />
            <Arrow color="turquoise" className="w-16 h-16" outline />
            <Arrow color="yellow" className="w-16 h-16" outline rotate />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMainAreaDesktop;
