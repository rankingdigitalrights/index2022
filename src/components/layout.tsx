import Head from "next/head";
import React from "react";

import Navigation from "./navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Ranking Digital Rights - Index 2020</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto pt-4 mb-8">
        <Navigation />
      </header>

      {children}
    </div>
  );
};

export default Layout;
