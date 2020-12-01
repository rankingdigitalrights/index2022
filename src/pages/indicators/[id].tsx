import React from "react";

import CompanyElements from "../../components/company-elements";
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

export const getStaticProps = async ({params: {id}}: Params) => {
  const index = (await indicatorData(id)) as IndicatorIndex;

  return {
    props: {
      index,
    },
  };
};

const IndicatorPage = ({index}: IndicatorPageProps) => {
  return (
    <Layout>
      <div className="container mx-auto">
        <section>{index.description}</section>
        {index.companies.map((company) => (
          <CompanyElements
            key={`company-element-${company}`}
            indicatorLabel={index.label}
            company={company}
            companyElements={index.elements[company] || {}}
          />
        ))}
      </div>
    </Layout>
  );
};

export default IndicatorPage;
