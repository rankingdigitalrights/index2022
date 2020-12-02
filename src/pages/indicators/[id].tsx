import {useRouter} from "next/router";
import React from "react";

import CompanyElements from "../../components/company-elements";
import IndicatorSelector from "../../components/indicator-selector";
import Layout from "../../components/layout";
import {indicatorData, indicatorIndices} from "../../data";
import {IndicatorIndex} from "../../types";

type Params = {
  params: {
    id: string;
  };
};

interface IndicatorPageProps {
  index: IndicatorIndex;
  indicators: Array<{id: string; label: string}>;
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
  const indicators = (await indicatorIndices()).map(({id, label}) => ({
    id,
    label,
  }));

  return {
    props: {
      index,
      indicators,
    },
  };
};

const IndicatorPage = ({index, indicators}: IndicatorPageProps) => {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col w-9/12 mx-auto">
          <IndicatorSelector
            indicators={indicators}
            selected={index.id}
            onSelect={handleSelect}
          />

          <section className="w-full mt-6 mx-auto">{index.description}</section>
        </div>
      </div>

      <div className="bg-beige pt-6 mt-6">
        <div className="container mx-auto">

          <div className="flex flex-row w-9/12 mx-auto justify-between">
            <div className="w-1/2">Company Selection</div>

            <div className="w-1/4">Sorting</div>

            <div className="w-1/4">Value Toggle</div>
          </div>

          {index.companies.map((company) => (
            <CompanyElements
              key={`company-element-${company}`}
              indicatorLabel={index.label}
              company={company}
              companyElements={index.elements[company] || {}}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
