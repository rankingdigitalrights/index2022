import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="md:flex">
        <div className="md:flex-shrink-0">Hello World</div>

        <div className="mt-4 md:mt-0 md:ml-6">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
            Marketing
          </div>
          <p className="mt-2 text-gray-600">
            Getting a new business off the ground is a lot of hard work. Here
            are five ideas you can use to find your first customers.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
