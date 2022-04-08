import React, {useState} from "react";

import CompanySelector from "../components/company-selector-simple";
import CompanyYearOverYearSlope from "../components/company-year-over-year-slope";
import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {allCompanies, companyYearOverYearCategoryScoreData} from "../data";
import type {CompanySelectOption, CompanyYearOverYear} from "../types";

interface TimeChartProps {
  companySelectors: CompanySelectOption[];
  yoyScores: CompanyYearOverYear[];
}

export const getStaticProps = async () => {
  const companies = await allCompanies();
  const companySelectors = companies.map(({id: companyId, name, kind}) => {
    // FIXME: Score is hardcoded and it is unclear if it is even required.
    const score = {score: 20};

    return {
      value: companyId,
      label: name,
      score: score ? score.score : "NA",
      kind,
    };
  });

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
      yoyScores,
    },
  };
};

const TimeCharts = ({companySelectors, yoyScores}: TimeChartProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <>
              <Container>
                <NarrativeTitle title="Time" />

                <div className="flex flex-row">
                  <CompanySelector
                    className="flex-none w-full md:w-10/12 "
                    companies={companySelectors}
                    selected={selectedCompanies}
                    onSelect={handleSelectCompany}
                  />
                </div>

                <CompanyYearOverYearSlope
                  data={yoyScores.filter(({company}) => {
                    if (selectedCompanies.length > 0)
                      return selectedCompanies.includes(company);
                    return true;
                  })}
                />
              </Container>
            </>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default TimeCharts;
