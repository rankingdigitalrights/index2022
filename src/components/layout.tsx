import React from "react";

import Navigation from "./navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <header className="container mx-auto pt-4 mb-8">
        <Navigation />
      </header>

      {children}
    </div>
  );
};

export default Layout;
