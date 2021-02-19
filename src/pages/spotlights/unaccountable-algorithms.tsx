import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Footnotes from "../../components/footnotes";
import Layout from "../../components/layout";
import NarrativeContainer from "../../components/narrative-container";
import NarrativeTitle from "../../components/narrative-title";
import {algorithms} from "../../data";
import {components} from "../../mdx";
import {NarrativeProps, ReadmoreKind} from "../../types";

export const getStaticProps = async () => {
  const details = await algorithms();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {props: {details: {pageTitle, body, footnotes}}};
};

const Algorithms = ({details}: NarrativeProps) => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  const readmore: ReadmoreKind[] = [
    "key-findings",
    "recommendations",
    "china-tech-giants",
  ];

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-algorithms"
        heroCaption="Original art by Paweł Kuczyński."
        backgroundClassName="bg-rdr bg-opacity-30"
        transparent
        readmore={readmore}
      >
        {({Container}) => {
          return (
            <Container>
              <NarrativeTitle
                title={pageTitle}
                byLine="Ellery Roberts Biddle & Jie Zhang"
              />

              {body}

              {footnotes && <Footnotes source={footnotes} />}
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default Algorithms;
