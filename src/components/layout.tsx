import React from "react";

import Footer from "./footer";
import HeaderBar from "./header-bar";
import HtmlHead from "./html-head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <HtmlHead />

      <HeaderBar className="print:hidden" />

      {children}

      <Footer className="print:hidden" />
    </div>
  );
};

export default Layout;
