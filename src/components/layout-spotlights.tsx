import React from "react";

import HtmlHead from "./html-head";
import Navigation from "./navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <HtmlHead />

      <header className="spotlight">
        <Navigation />
      </header>

      {children}
    </div>
  );
};

export default Layout;
