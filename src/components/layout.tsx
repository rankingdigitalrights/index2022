import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <p>Navigation</p>
      {children}
    </div>
  );
};

export default Layout;
