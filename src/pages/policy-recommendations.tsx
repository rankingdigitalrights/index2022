import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Footnotes from "../components/footnotes";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import {policyRecommendations} from "../data";
import PolicyRecommendationsLogo from "../images/icons/policy-recommendations.svg";
import {components} from "../mdx";
import {NarrativeProps} from "../types";

export const getStaticProps = async () => {
  const details = await policyRecommendations();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {props: {details: {pageTitle, body, footnotes}}};
};

const PolicyRecommendations = ({details}: NarrativeProps) => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  return (
    <Layout>
      <NarrativeContainer backgroundClassName="bg-cat-freedom bg-opacity-30">
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none ml-6">
                  <PolicyRecommendationsLogo className="flex-none h-8 w-8 mt-1" />
                  <span className="mt-3 md:mt-0 md:ml-6">{pageTitle}</span>
                </h1>
              </div>

              {body}

              {footnotes && <Footnotes source={footnotes} />}
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default PolicyRecommendations;
