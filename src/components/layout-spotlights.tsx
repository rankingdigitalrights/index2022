import Head from "next/head";
import React from "react";

import Navigation from "./navigation";
import Footer from "./spotlight-footer";

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

      <header className="spotlight">
        <Navigation />
      </header>

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
