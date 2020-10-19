import {Company} from "@src/types";
import Head from "next/head";
import Link from "next/link";

interface HomeProps {
  companies: Company[];
}

export const getStaticProps = async () => {
  const data = await fetch(
    "https://rankingdigitalrights.org/index2019/assets/static/overview.json",
  ).then((resp) => resp.json());
  return {
    props: {
      companies: data.map(({id, display}: Company) => ({
        id,
        display,
      })),
    },
  };
};

const Home = ({companies}: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="md:flex">
        Click on any of the companies to see the company details.
        <ul>
          {companies.map(({id, display}) => {
            return (
              <li key={id}>
                <Link href={`/companies/${encodeURIComponent(id)}`}>
                  <a>{display}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Home;
