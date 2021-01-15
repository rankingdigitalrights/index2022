import React from "react";

// import HtmlHead from "./html-head";
import Navigation from "./navigation";
import Footer from "./spotlight-footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      {/* <HtmlHead /> */}

      <header className="spotlight">
        <Navigation />
      </header>

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
