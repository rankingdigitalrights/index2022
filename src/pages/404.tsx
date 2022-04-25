import Link from "next/link";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";

const FourOhFour = () => {
  return (
    <Layout>
      <NarrativeContainer backgroundClassName="bg-rdr bg-opacity-30">
        {({Container}) => {
          return (
            <Container>
              <NarrativeTitle title="404 - Page Not Found" />

              <Link href="/">
                <a>Go back home</a>
              </Link>
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default FourOhFour;
