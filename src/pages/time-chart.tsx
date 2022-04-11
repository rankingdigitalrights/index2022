import React, {useMemo, useState} from "react";

import CompanySelector from "../components/company-selector-simple";
import CompanyYearOverYearTable from "../components/company-year-over-year-table";
import FlipAxis from "../components/flip-axis";
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
  const [axis, setAxis] = useState(true);
  const years = useMemo(() => ["2017", "2018", "2019", "2020", "2022"], []);

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleFlipAxis = (toggle: boolean) => {
    setAxis(toggle);
  };

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <>
              <Container>
                <NarrativeTitle title="Time" />

                <div className="flex flex-col md:flex-row justify-between items-center w-full">
                  <CompanySelector
                    className="flex-none w-full md:w-9/12 "
                    companies={companySelectors}
                    selected={selectedCompanies}
                    onSelect={handleSelectCompany}
                  />

                  <FlipAxis
                    label="Flip axis"
                    onChange={handleFlipAxis}
                    toggle={axis}
                  />
                </div>

                <CompanyYearOverYearTable
                  years={years}
                  data={yoyScores.filter(({company}) => {
                    if (selectedCompanies.length > 0)
                      return selectedCompanies.includes(company);
                    return true;
                  })}
                  axis={axis}
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
