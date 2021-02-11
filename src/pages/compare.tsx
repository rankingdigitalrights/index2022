import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";
import React from "react";

import CompanyKindLabel from "../components/company-kind-label";
import CompareScoresChart from "../components/compare-scores-chart";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import {companyDiffScoresData, compareDetails} from "../data";
import ScoresOverTimeLogo from "../images/icons/scores-over-time.svg";
import {components} from "../mdx";
import {CompanyScoreDiff} from "../types";

interface ScoresOverTimeProps {
  diffScores: CompanyScoreDiff[];
  details: {
    pageTitle: MdxRemote.Source;
    introduction: MdxRemote.Source;
    body: MdxRemote.Source;
    footnotes?: MdxRemote.Source;
  };
}

export const getStaticProps = async () => {
  const diffScores = await companyDiffScoresData("2020", "total");
  const details = await compareDetails();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const introduction = await renderToString(details.introduction, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

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
  const pageTitle = hydrate(details.pageTitle, {components});
  const introduction = hydrate(details.introduction, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <div>
              <Container>
                <div className="flex mb-12 border-b border-prissian py-6 md:py-12">
                  <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                    <ScoresOverTimeLogo className="flex-none h-14 w-14 mt-1 hidden md:block" />
                    <span className="mt-3 md:mt-0 md:ml-6">{pageTitle}</span>
                  </h1>
                </div>

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
