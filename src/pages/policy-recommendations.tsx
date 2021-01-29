import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";
import React from "react";

import Layout from "../components/layout";
import NarrativeImage from "../components/narrative-image";
import {policyRecommendations} from "../data";

interface PolicyRecommendationsProps {
  source: MdxRemote.Source;
}

const components = {
  img: NarrativeImage,
};

export const getStaticProps = async () => {
  const source = await policyRecommendations();
  const mdxSource = await renderToString(source, {components});

  return {props: {source: mdxSource}};
};

const PolicyRecommendations = ({source}: PolicyRecommendationsProps) => {
  const content = hydrate(source, {components});

  return (
    <Layout>
      <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
        {content}
      </div>
    </Layout>
  );
};

export default PolicyRecommendations;
