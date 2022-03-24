import React, { useState } from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import CompaniesScore from "../components/companies-score";

export const getStaticProps = async () => {
  ///
}

const ExploreData = ({
  ///
})


  return(
  <Layout>
  <NarrativeContainer transparent>
    {({ Container }) => {
      return (
        <div>
          <Container>
            <CompaniesScore />
            {/* topics-score */}
            {/* time-score */}
          </Container>
        </div>
      );
    }}
  </NarrativeContainer>
  </Layout >
);


export default ExploreData;
