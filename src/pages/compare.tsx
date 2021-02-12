import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";
import React from "react";

import CompanyKindLabel from "../components/company-kind-label";
import CompareScoresChart from "../components/compare-scores-chart";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {companyDiffScoresData, compareDetails} from "../data";
import ScoresOverTimeLogo from "../images/icons/scores-over-time.svg";
import {components, hydrateNarrativePage, renderNarrativePage} from "../mdx";
import {CompanyScoreDiff} from "../types";

interface ScoresOverTimeProps {
  diffScores: CompanyScoreDiff[];
  details: {
    pageTitle: MdxRemote.Source;
    introduction: MdxRemote.Source;
    body: MdxRemote.Source;
    footnotes: MdxRemote.Source | null;
  };
}

export const getStaticProps = async () => {
  const diffScores = await companyDiffScoresData("2020", "total");
  const details = await compareDetails();

  const {pageTitle, body, footnotes} = await renderNarrativePage(details);
  const introduction = await renderToString(details.introduction, {components});

  return {
    props: {
      diffScores,
      details: {
        pageTitle,
        introduction,
        body,
        footnotes,
      },
    },
  };
};

const ScoresOverTime = ({diffScores, details}: ScoresOverTimeProps) => {
  const {pageTitle, body, footnotes} = hydrateNarrativePage(details);
  const introduction = hydrate(details.introduction, {components});

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title={pageTitle} Logo={ScoresOverTimeLogo} />

                {introduction}
              </Container>

              <div className="flex flex-col mx-auto items-center lg:justify-center my-6 lg:flex-row">
                <div className="flex flex-col">
                  <CompanyKindLabel kind="internet" theme="dark" />
                  <CompareScoresChart
                    className="flex-none w-full lg:w-1/2 mt-3"
                    scores={diffScores.filter(({kind}) => kind === "internet")}
                  />
                </div>

                <div className="flex flex-col lg:ml-10">
                  <CompanyKindLabel kind="telecom" theme="dark" />

                  <CompareScoresChart
                    className="flex-none w-full lg:w-1/2 mt-3"
                    scores={diffScores.filter(({kind}) => kind === "telecom")}
                  />
                </div>
              </div>

              <Container>
                {body}

                {footnotes}
              </Container>
            </div>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default ScoresOverTime;
