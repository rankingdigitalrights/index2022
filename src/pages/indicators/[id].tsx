import React from "react";

import Layout from "../../components/layout";
import {indicatorIndices} from "../../data";
import {Indicator} from "../../types";
import {unreachable} from "../../utils";

type Params = {
  params: {
    id: string;
  };
};

interface IndicatorPageProps {
  indicator: Indicator;
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
  const indices = await indicatorIndices();
  const indicator =
    indices.find((i) => i.id === id) ||
    unreachable(`Indicator ${id} not found in indicator index.`);
  return {
    props: {
      indicator,
    },
  };
};

const IndicatorPage = ({indicator}: IndicatorPageProps) => {
  return (
    <Layout>
      <div>{indicator.label}</div>
    </Layout>
  );
};

export default IndicatorPage;
