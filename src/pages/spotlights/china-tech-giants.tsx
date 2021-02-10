import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Layout from "../../components/layout";
import NarrativeContainer from "../../components/narrative-container";
import {chinaTechGiants} from "../../data";
import {components} from "../../mdx";
import {NarrativeProps} from "../../types";

export const getStaticProps = async () => {
  const source = await chinaTechGiants();
  const mdxSource = await renderToString(source, {components});

  return {props: {source: mdxSource}};
};

const ChinaTechGiants = ({source}: NarrativeProps) => {
  const content = hydrate(source, {components});

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-tech-giants"
        heroCaption="People queue for milk during the pandemic in Srinagar, Kashmir. Photo by Abid Bhat, used with permission."
        backgroundClassName="bg-rdr bg-opacity-30"
        transparent
      >
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                  <span className="mt-3 md:mt-0">
                    Chinese tech giants have proven they can change. But the
                    state is still their number one stakeholder.
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

export default ChinaTechGiants;
