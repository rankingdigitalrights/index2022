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

      <header className="container mx-auto pt-4 mb-8 hidden sm:block">
        <Navigation />
      </header>

      {children}
    </div>
  );
};

export default Layout;
