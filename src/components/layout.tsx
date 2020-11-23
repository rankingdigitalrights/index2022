import React from "react";

import Navigation from "./navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <header className="container mx-auto">
        <Navigation />
      </header>

      {children}
    </div>
  );
};

export default Layout;
