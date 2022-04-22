import {promises as fsP} from "fs";
import path from "path";
import React from "react";

import CompaniesScores from "../components/companies-scores";
import ExploreContainer from "../components/explore-container";
import ExploreHeader from "../components/explore-header";
import Layout from "../components/layout";
import LensCharts from "../components/lenses";
import TimeCharts from "../components/time-chart";
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
import {uniqueBy} from "../utils";

export const getStaticProps = async () => {
  const services = (await allServices()).filter(
    ({kind}) => kind !== "Group" && kind !== "Operating Company",
  );

  const serviceOptions = uniqueBy("kind", services).map(({kind, kindName}) => ({
    kind,
    label: kindName,
    value: kind,
  }));

  const [
    companies,
    indicatorLenses,
    indicatorCompanyLenses,
  ] = await Promise.all([
    allCompanies(),
    allIndicatorLenses(),
    allIndicatorLensesCompanies(),
  ]);

  const betaLenses = new Set([
    "algorithmic-transparency",
    "targeted-advertising",
  ]);
  const companiesIds = companies.reduce((agg, company) => {
    agg.push(company.id);
    return agg;
  }, []);

  const companySelector = companies.map(
    ({id: companyId, name, kind, region}) => {
      return {
        value: companyId,
        label: name,
        kind,
        region,
      };
    },
  );

  const servicesByCompany = await Promise.all(
    companies.map(async ({id, name}) => {
      const servicesPerCompany = await companyServices(id);
      const filteredServices = servicesPerCompany.filter((service) => {
        return service.kind !== "Group" && service.kind !== "Operating Company";
      });
      const serviceScores = await Promise.all(
        filteredServices.map(async (filteredService) => {
          // set an empty property on each service object to record the four category scores
          // TODO Christo, change the data files ...
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

  const companyRankings = await ["internet"].reduce(async (memo, kind) => {
    return ["total", "governance", "freedom", "privacy"].reduce(
      async (agg, category) => {
        const data = await agg;
        const rankings = await companyRankingData(kind, category);

        if (!data[category]) {
          data[category] = {};
        }

        data[category][kind] = rankings;
        return data;
      },
      memo,
    );
  }, Promise.resolve({}));

  const serviceRankings = await serviceOptions.reduce(
    async (memo, {kind: service}) => {
      const files = await fsP.readdir(
        path.join(process.cwd(), "data/rankings", service),
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
          service,
          kind,
          category,
        );

        if (!data[service]) {
          data[service] = {};
        }
        if (!data[service][category]) {
          data[service][category] = {};
        }
        data[service][category][kind] = rankings;

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
      companiesIds,
      companySelector,
      serviceOptions,
      serviceRankings,
      companyRankings,
      servicesByCompany,
      indicatorLenses: indicatorLenses.filter(({lens}) => betaLenses.has(lens)),
      indicatorCompanyLenses: indicatorCompanyLenses.map(
        ({scores, ...rest}) => ({
          ...rest,
          scores: scores.filter(({lens}) => betaLenses.has(lens)),
        }),
      ),
      yoyScores,
    },
  };
};

// FIXME: lenses chart is not receiving companies selection

const Explorer = ({
  companiesIds,
  companySelector,
  serviceOptions,
  serviceRankings,
  companyRankings,
  servicesByCompany,
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
            <Container>
              <CompaniesScores
                companiesIds={companiesIds}
                companySelector={companySelector}
                serviceOptions={serviceOptions}
                serviceRankings={serviceRankings}
                companyRankings={companyRankings}
                servicesByCompany={servicesByCompany}
              />
              <LensCharts
                companySelectors={companySelector}
                indicatorLenses={indicatorLenses}
                indicatorCompanyLenses={indicatorCompanyLenses}
              />
              <TimeCharts
                companySelectors={companySelector}
                yoyScores={yoyScores}
              />
            </Container>
          );
        }}
      </ExploreContainer>
    </Layout>
  );
};

export default Explorer;
