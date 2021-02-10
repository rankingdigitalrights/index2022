import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import {policyRecommendations} from "../data";
import PolicyRecommendationsLogo from "../images/icons/policy-recommendations.svg";
import {components} from "../mdx";
import {NarrativeProps} from "../types";

export const getStaticProps = async () => {
  const source = await policyRecommendations();
  const mdxSource = await renderToString(source, {components});

  return {props: {source: mdxSource}};
};

const PolicyRecommendations = ({source}: NarrativeProps) => {
  const content = hydrate(source, {components});

  return (
    <Layout>
      <NarrativeContainer backgroundClassName="bg-cat-freedom bg-opacity-30">
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none ml-6">
                  <PolicyRecommendationsLogo className="flex-none h-8 w-8 mt-1" />
                  <span className="mt-3 md:mt-0 md:ml-6">
                    Policy Recommendations for Governments
                  </span>
                </h1>
              </div>

              {content}
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default PolicyRecommendations;
