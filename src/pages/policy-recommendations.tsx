import React from "react";

import Layout from "../components/layout";
import {policyRecommendations} from "../data";

interface PolicyRecommendationsProps {
  html: string;
}

export const getStaticProps = async () => {
  const html = await policyRecommendations();

  return {props: {html}};
};

const PolicyRecommendations = ({html}: PolicyRecommendationsProps) => {
  return (
    <Layout>
      <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
        <div className="mt-6" dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  );
};

export default PolicyRecommendations;
