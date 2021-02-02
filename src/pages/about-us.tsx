import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeImage from "../components/narrative-image";
import {aboutUs} from "../data";
import {NarrativeProps} from "../types";

const components = {
  img: NarrativeImage,
};

export const getStaticProps = async () => {
  const source = await aboutUs();
  const mdxSource = await renderToString(source, {components});

  return {props: {source: mdxSource}};
};

const AboutUs = ({source}: NarrativeProps) => {
  const content = hydrate(source, {components});

  return (
    <Layout>
      <NarrativeContainer>
        <>
          <div className="flex mb-12 border-b border-prissian py-12">
            <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
              <span className="mt-3 md:mt-0">About Us</span>
            </h1>
          </div>

          {content}
        </>
      </NarrativeContainer>
    </Layout>
  );
};

export default AboutUs;
