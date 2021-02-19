import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Footnotes from "../components/footnotes";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {keyFindings} from "../data";
import {components} from "../mdx";
import {NarrativeProps, ReadmoreKind} from "../types";

export const getStaticProps = async () => {
  const details = await keyFindings();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {props: {details: {pageTitle, body, footnotes}}};
};

const KeyFindings = ({details}: NarrativeProps) => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  const readmore: ReadmoreKind[] = [
    "context-before-code",
    "recommendations",
    "services",
  ];

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-key-findings"
        heroCaption="Photo by Amy Brouillette, used with permission"
        backgroundClassName="bg-cat-freedom bg-opacity-20"
        readmore={readmore}
      >
        {({Container}) => {
          return (
            <Container>
              <NarrativeTitle title={pageTitle} byLine="Amy Brouillette" />

              {body}

              {footnotes && <Footnotes source={footnotes} />}
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default KeyFindings;
