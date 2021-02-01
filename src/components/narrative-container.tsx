import React from "react";

import NarrativeBox from "./narrative-box";

interface NarrativeContainerProps {
  children: React.ReactNode;
}

const NarrativeContainer = ({children}: NarrativeContainerProps) => {
  return (
    <div>
      <div className="narrative flex justify-around bg-light-freedom py-12">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12 max-w-screen-lg bg-white px-4 md:px-12 py-3 shadow-md">
          {children}
        </div>
      </div>

      <div className="bg-beige flex justify-around py-3 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <NarrativeBox kind="scores" />
          <NarrativeBox kind="findings" />
          <NarrativeBox kind="methodology" />
        </div>
      </div>
    </div>
  );
};

export default NarrativeContainer;
