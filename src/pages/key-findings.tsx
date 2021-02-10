import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import {keyFindings} from "../data";
import {components} from "../mdx";
import {NarrativeProps} from "../types";

export const getStaticProps = async () => {
  const source = await keyFindings();
  const mdxSource = await renderToString(source, {components});

  return {props: {source: mdxSource}};
};

const KeyFindings = ({source}: NarrativeProps) => {
  const content = hydrate(source, {components});

  return (
    <Layout>
      <NarrativeContainer backgroundClassName="bg-accent-gold bg-opacity-30">
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                  <span className="mt-3 md:mt-0">KeyFindings</span>
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

export default KeyFindings;
