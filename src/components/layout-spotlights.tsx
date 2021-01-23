import React from "react";

import Footer from "./footer";
// import HtmlHead from "./html-head";
import HeaderBar from "./header-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      {/* <HtmlHead /> */}

      <HeaderBar />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
