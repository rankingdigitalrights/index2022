import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import {aboutUs} from "../data";
import {components} from "../mdx";
import {NarrativeProps} from "../types";

export const getStaticProps = async () => {
  const details = await aboutUs();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {props: {details: {pageTitle, body, footnotes}}};
};

const AboutUs = ({details}: NarrativeProps) => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  return (
    <Layout>
      <NarrativeContainer backgroundClassName="bg-prissian bg-opacity-30">
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                  <span className="mt-3 md:mt-0">{pageTitle}</span>
                </h1>
              </div>

              {body}

              {footnotes}
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default AboutUs;
