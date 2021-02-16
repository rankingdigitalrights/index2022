import React from "react";

import Footer from "./footer";
import HeaderBar from "./header-bar";
import HtmlHead from "./html-head";
import ScrollArrow from "./scroll-arrow";

interface LayoutProps {
  hideScrollArrow?: boolean;
  children: React.ReactNode;
}

const Layout = ({hideScrollArrow, children}: LayoutProps) => {
  return (
    <div>
      <HtmlHead />

      <HeaderBar className="print:hidden" />

      {children}

      {!hideScrollArrow && <ScrollArrow />}

      <Footer className="print:hidden" />
    </div>
  );
};

export default Layout;
