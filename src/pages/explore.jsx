import {promises as fsP} from "fs";
import path from "path";
import React from "react";

import Divider from "../components/divider";
import ExploreContainer from "../components/explore-container";
import ExploreHeader from "../components/explore-header";
import Layout from "../components/layout";
import LensCharts from "../components/lens-charts";
import ScoreCharts from "../components/score-charts";
import TimeCharts from "../components/time-charts";
import {
  allCompanies,
  allIndicatorLenses,
  allIndicatorLensesCompanies,
  allServices,
  companyRankingData,
  companyServiceRankingData,
  companyServices,
  companyYearOverYearCategoryScoreData,
} from "../data";
import {byScore, byServiceKind} from "../sort";
import {uniqueBy} from "../utils";

const betaLenses = new Set([
  "algorithmic-transparency",
  "targeted-advertising",
  // "content-governance-moderation",
  // "data-handling",
  // "demands-data-censorship",
  // "private-requests",
  // "security",
  // "user-agency",
]);

export const getStaticProps = async () => {
  const [
    companies,
    indicatorLenses,
    indicatorCompanyLenses,
  ] = await Promise.all([
    allCompanies(),
    allIndicatorLenses(),
    allIndicatorLensesCompanies(),
  ]);

  const services = (await allServices()).filter(
    ({kind}) => kind !== "Group" && kind !== "Operating Company",
  );

  const companySelectors = companies.map(
    ({id: companyId, name, kind, region}) => {
      return {
        value: companyId,
        label: name,
        kind,
        region,
      };
    },
  );

  const [
    totalRanking,
    governanceRanking,
    freedomRanking,
    privacyRanking,
  ] = await Promise.all(
    ["total", "governance", "freedom", "privacy"].map(async (category) =>
      companyRankingData("internet", category),
    ),
  );

  const servicesByCompanyScores = await Promise.all(
    companies.map(async ({id, name}) => {
      const servicesPerCompany = await companyServices(id);
      const filteredServices = servicesPerCompany.filter((service) => {
        return service.kind !== "Group" && service.kind !== "Operating Company";
      });
      const serviceScores = await Promise.all(
        filteredServices.map(async (filteredService) => {
          const service = {...filteredService, categoryScore: {}};

          const files = await fsP.readdir(
            path.join(process.cwd(), "data/rankings", service.kind),
          );
          // eslint-disable-next-line no-restricted-syntax
          for (const file of files) {
            // eslint-disable-next-line no-await-in-loop
            const fileData = await fsP.readFile(
              path.join(process.cwd(), "data/rankings", service.kind, file),
            );
            const parsed = JSON.parse(fileData);
            parsed.forEach((item) => {
              if (item.service === service.id) {
                // eslint-disable-next-line no-param-reassign
                service.categoryScore[item.category] = item.score;
              }
            });
          }
          return service;
        }),
      );
      return {
        id,
        name,
        services: serviceScores,
      };
    }),
  );

  const companiesByServiceScores = await uniqueBy("kind", services)
    .sort(byServiceKind)
    .reduce(
      async (memo, {kind: serviceCategory, kindName: serviceCategoryName}) => {
        const files = await fsP.readdir(
          path.join(process.cwd(), "data/rankings", serviceCategory),
        );
        return files.reduce(async (agg, file) => {
          const data = await agg;

          const match = file.match(
            /^(internet)-(total|governance|privacy|freedom).json$/,
          );
          if (!match) return data;

          const kind = match[1];
          const category = match[2];

          const rankings = await companyServiceRankingData(
            serviceCategory,
            kind,
            category,
          );

          if (!data[category]) {
            data[category] = [];
          }

          data[category].push({
            serviceCategory,
            serviceCategoryName,
            rankings: rankings.sort(byScore),
          });

          return data;
        }, memo);
      },
      Promise.resolve({}),
    );

  const yoyScores = await Promise.all(
    companies.map(async ({id, name, region}) => {
      const {scores} = await companyYearOverYearCategoryScoreData(id, "total");
      return {
        company: id,
        companyPretty: name,
        region,
        scores,
      };
    }),
  );

  return {
    props: {
      companySelectors,

      // Company Scores
      companyScores: {
        total: totalRanking,
        governance: governanceRanking,
        freedom: freedomRanking,
        privacy: privacyRanking,
      },
      servicesByCompanyScores,
      companiesByServiceScores,

      // Lenses
      indicatorLenses: indicatorLenses.filter(({lens}) => betaLenses.has(lens)),
      indicatorCompanyLenses: indicatorCompanyLenses.map(
        ({scores, ...rest}) => ({
          ...rest,
          scores: scores.filter(({lens}) => betaLenses.has(lens)),
        }),
      ),

      // Performance over Time
      yoyScores,
    },
  };
};

// FIXME: lenses chart is not receiving companies selection

const Explorer = ({
  companySelectors,
  companyScores,
  companiesByServiceScores,
  servicesByCompanyScores,
  indicatorLenses,
  indicatorCompanyLenses,
  yoyScores,
}) => {
  return (
    <Layout>
      <ExploreHeader />
      <ExploreContainer>
        {({Container}) => {
          return (
            <>
              <Container>
                <ScoreCharts
                  companyScores={companyScores}
                  companySelectors={companySelectors}
                  companiesByServiceScores={companiesByServiceScores}
                  servicesByCompanyScores={servicesByCompanyScores}
                />
              </Container>

              <Divider />

              <Container>
                <LensCharts
                  companySelectors={companySelectors}
                  indicatorLenses={indicatorLenses}
                  indicatorCompanyLenses={indicatorCompanyLenses}
                />
              </Container>

              <Divider />

              <Container>
                <TimeCharts
                  companySelectors={companySelectors}
                  yoyScores={yoyScores}
                />
              </Container>
            </>
          );
        }}
      </ExploreContainer>
    </Layout>
  );
};

export default Explorer;
