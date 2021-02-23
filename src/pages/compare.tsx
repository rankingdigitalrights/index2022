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
import {components} from "../mdx";
import {CompanyScoreDiff, ReadmoreKind} from "../types";

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

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;
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
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;
  const introduction = hydrate(details.introduction, {components});

  const readmore: ReadmoreKind[] = [
    "key-findings",
    "indicators",
    "methodology",
  ];

  return (
    <Layout>
      <NarrativeContainer transparent readmore={readmore}>
        {({Container}) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title={pageTitle} />

                {introduction}
              </Container>

              <div className="container mx-auto mt-10">
                <div className="flex flex-col px-6 overflow-x-scroll md:px-0 md:items-center lg:justify-center lg:flex-row lg:overflow-x-visible">
                  <div className="flex flex-col">
                    <CompanyKindLabel kind="internet" theme="dark" />
                    <CompareScoresChart
                      className="flex-none w-full lg:w-1/2 mt-3"
                      scores={diffScores.filter(
                        ({kind}) => kind === "internet",
                      )}
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
