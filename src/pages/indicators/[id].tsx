import {useRouter} from "next/router";
import React, {useState} from "react";

import CompanyElements from "../../components/company-elements";
import CompanySelector, {
  CompanyOption,
} from "../../components/company-selector";
import IndicatorSelector, {
  IndicatorOption,
} from "../../components/indicator-selector";
import Layout from "../../components/layout";
import ToggleSwitch from "../../components/toggle-switch";
import {companyIndices, indicatorData, indicatorIndices} from "../../data";
import {IndicatorIndex} from "../../types";

type Params = {
  params: {
    id: string;
  };
};

interface IndicatorPageProps {
  index: IndicatorIndex;
  indicators: IndicatorOption[];
  companies: CompanyOption[];
}

export const getStaticPaths = async () => {
  const data = await indicatorIndices();
  const paths = data.map(({id}) => ({
    params: {id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id: indicatorId}}: Params) => {
  const index = (await indicatorData(indicatorId)) as IndicatorIndex;
  const indicators = (await indicatorIndices()).map(({id: value, label}) => ({
    value,
    label: `${value}. ${label}`,
  }));
  const companyIndex = await companyIndices();
  const companies = companyIndex.map(({id: value, companyPretty: label}) => ({
    value,
    label,
  }));

  return {
    props: {
      index,
      indicators,
      companies,
    },
  };
};

const IndicatorPage = ({index, indicators, companies}: IndicatorPageProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [literalValues, setLiteralValues] = useState(false);

  const router = useRouter();

  const handleSelectIndicator = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  const handleSelectCompany = (ids: string[]) => {
    setSelectedCompanies(ids);
  };

  const handleToggleSwitch = (toggle: boolean) => {
    setLiteralValues(toggle);
  };

  const activeSelector: IndicatorOption = {
    value: index.id,
    label: `${index.id}. ${index.label}`,
  };

  const dataGrids =
    selectedCompanies.length === 0
      ? index.companies
      : index.companies.filter((company) =>
          selectedCompanies.includes(company),
        );

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col w-9/12 mx-auto">
          <IndicatorSelector
            indicators={indicators}
            selected={activeSelector}
            onSelect={handleSelectIndicator}
          />

          <section className="w-full mt-6 mx-auto">{index.description}</section>
        </div>
      </div>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-row w-9/12 mx-auto justify-between items-center">
            <div className="w-1/2 flex flex-col justify-between h-14">
              <span className="text-xs font-circular">Select companies:</span>

              <CompanySelector
                companies={companies}
                selected={selectedCompanies}
                onSelect={handleSelectCompany}
              />
            </div>

            <div className="w-1/4 flex flex-col justify-between h-14 mx-6">
              <span className="text-xs font-circular">Sort:</span>
              <span>&nbsp;</span>
            </div>

            <div className="flex flex-col justify-between h-14">
              <span className="text-xs font-circular">&nbsp;</span>

              <div>
                <ToggleSwitch
                  label="Literal values"
                  onChange={handleToggleSwitch}
                />
              </div>
            </div>
          </div>

          {dataGrids.map((company) => (
            <CompanyElements
              key={`company-element-${company}`}
              indicatorLabel={index.label}
              company={company}
              companyElements={index.elements[company] || {}}
              literalValues={literalValues}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
