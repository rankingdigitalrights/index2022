import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";
import {companyIndices} from "../data";
import {CompanyIndex} from "../types";

interface HomeProps {
  companies: CompanyIndex[];
}

export const getStaticProps = async () => {
  const companies = await companyIndices();

  return {
    props: {companies},
  };
};

const Home = ({companies}: HomeProps) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="md:flex">
          Click on any of the companies to see the company details.
          <ul>
            {companies.map(({id, company}) => {
              return (
                <li key={id}>
                  <Link href={`/companies/${encodeURIComponent(id)}`}>
                    <a>{company}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
