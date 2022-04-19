import Link from "next/link";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {ReadmoreKind} from "../types";

const FourOhFour = () => {
  const readmore: ReadmoreKind[] = ["key-findings", "shareholders", "ads"];

  return (
    <Layout>
      <NarrativeContainer
        backgroundClassName="bg-rdr bg-opacity-30"
        readmore={readmore}
      >
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
