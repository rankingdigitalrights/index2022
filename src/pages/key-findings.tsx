import React from "react";

import Footnotes from "../components/footnotes";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {keyFindings} from "../data";
import {hydrateNarrativePage, renderNarrativePage} from "../mdx";
import {NarrativeProps} from "../types";

export const getStaticProps = async () => {
  const details = await keyFindings();
  const {pageTitle, body, footnotes} = await renderNarrativePage(details);

  return {props: {details: {pageTitle, body, footnotes}}};
};

const KeyFindings = ({details}: NarrativeProps) => {
  const {pageTitle, body, footnotes} = hydrateNarrativePage(details);

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-key-findings"
        backgroundClassName="bg-accent-gold bg-opacity-30"
      >
        {({Container}) => {
          return (
            <Container>
              <NarrativeTitle title={pageTitle} />

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
