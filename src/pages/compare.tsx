import React from "react";

import CompanyKindLabel from "../components/company-kind-label";
import CompareScoresChart from "../components/compare-scores-chart";
import Layout from "../components/layout";
import {companyDiffScoresData} from "../data";
import {CompanyScoreDiff} from "../types";

interface ScoresOverTimeProps {
  diffScores: CompanyScoreDiff[];
}

export const getStaticProps = async () => {
  const scores = await companyDiffScoresData("2020", "total");

  return {props: {diffScores: scores}};
};

const ScoresOverTime = ({diffScores}: ScoresOverTimeProps) => {
  return (
    <Layout>
      <div className="lg:container lg:mx-auto flex flex-col flex-row lg:justify-between">
        <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
          <span className="mt-3 md:mt-0">Scores Over Time</span>
        </h1>

        <div className="flex flex-col lg:flex-row mt-6">
          <div className="flex flex-col">
            <CompanyKindLabel kind="internet" theme="dark" />
            <CompareScoresChart
              className="flex-none w-full lg:w-1/2 mt-3"
              scores={diffScores.filter(({kind}) => kind === "internet")}
            />
          </div>

          <div className="flex flex-col">
            <CompanyKindLabel kind="telecom" theme="dark" />

            <CompareScoresChart
              className="flex-none w-full lg:w-1/2 lg:ml-3 mt-3"
              scores={diffScores.filter(({kind}) => kind === "telecom")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScoresOverTime;
