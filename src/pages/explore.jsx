import React from "react";
import CompaniesScores from "../components/companies-scores";
import LensCharts from "../components/lenses";
import TimeCharts from "../components/time-chart";
import Layout from "../components/layout"


export const getStaticProps = async () => {
  return {} 
}

const Explorer = ({
  CompaniesScores, LensCharts, TimeCharts
}) => {
  return (
    <Layout>
      <CompaniesScores />
      <LensCharts />
      <TimeCharts />
    </Layout>
  );
};

export default Explorer;
