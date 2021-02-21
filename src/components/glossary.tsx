/* eslint react/no-danger: off */
import React, {useContext} from "react";

import glossary from "../../data/glossary.json";
import {ModalContext} from "../context";

interface GlossaryProps {
  id: string;
  children?: React.ReactNode;
}

const Glossary = ({id, children}: GlossaryProps) => {
  const modal = useContext(ModalContext);

  const entry = glossary.find((item) => item.id === id);

  if (!entry) return <span>XXXX {id} XXXX</span>;

  const handleClick = () => {
    modal?.toggleModal({
      title: entry.title,
      content: entry.text,
      hasHtmlTitle: true,
    });
  };
  return (
    <>
      {" "}
      <span
        className="inline font-circular text-prissian font-bold"
        onClick={handleClick}
        onKeyDown={handleClick}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
    </>
  );
};

export default Glossary;
