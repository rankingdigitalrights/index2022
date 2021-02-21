import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";

import Footnotes from "../../components/footnotes";
import Layout from "../../components/layout";
import NarrativeContainer from "../../components/narrative-container";
import NarrativeTitle from "../../components/narrative-title";
import {chinaTechGiants} from "../../data";
import {components} from "../../mdx";
import {NarrativeProps, ReadmoreKind} from "../../types";

export const getStaticProps = async () => {
  const details = await chinaTechGiants();

  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {props: {details: {pageTitle, body, footnotes}}};
};

const ChinaTechGiants = ({details}: NarrativeProps) => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;

  const readmore: ReadmoreKind[] = [
    "key-findings",
    "recommendations",
    "context-before-code",
  ];

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-tech-giants"
        heroCaption="Speech in the Age of COVID, by Rafat Alkhatib. Used with permission."
        backgroundClassName="bg-rdr bg-opacity-30"
        transparent
        readmore={readmore}
      >
        {({Container}) => {
          return (
            <Container>
              <NarrativeTitle
                title={pageTitle}
                byLine="Rebecca MacKinnon"
                transparent
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

export default ChinaTechGiants;
