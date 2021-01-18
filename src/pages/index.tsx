import React from "react";

import Layout from "../components/layout";

const Home = () => {
  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-1/2 w-full md:bg-accent-pink" />
          <div className="md:w-1/2 w-full md:bg-rdr" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-64 bg-accent-pink z-10 border">AAA</div>
          <div className="md:w-1/3 h-64 bg-diff-add z-10 border">AAA</div>
          <div className="md:w-1/3 h-64 bg-rdr z-10 border">AAA</div>
        </div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between my-6">
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-2/3 h-64 border">AAA</div>
      </div>

      <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
        <div className="md:w-1/3 h-64 border">AAA</div>
      </div>
    </Layout>
  );
};

export default Home;
