import React from "react";

interface GlossaryProps {
  id: string;
  children?: React.ReactNode;
}

const Glossary = ({id, children}: GlossaryProps) => {
  return <a href={`#${id}`}>{children}</a>;
};

export default Glossary;
