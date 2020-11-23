import Head from "next/head";

import Layout from "../components/layout";

const Home = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto md:flex">Home!</main>
      </div>
    </Layout>
  );
};

export default Home;
