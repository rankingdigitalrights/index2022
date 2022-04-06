/* eslint react/no-danger: off */
import React, {useContext} from "react";

import {GlossaryContext, ModalContext} from "../context";

interface GlossaryProps {
  id: string;
  children?: React.ReactNode;
}

const Glossary = ({id, children}: GlossaryProps) => {
  const modal = useContext(ModalContext);
  const glossary = useContext(GlossaryContext);

  const entry = glossary[id];

  if (!entry) return <span>XXXX {id} XXXX</span>;

  const handleClick = () => {
    modal?.toggleModal({
      title: entry.title,
      content: entry.text,
      hasHtmlTitle: true,
    });
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLSpanElement>) => {
    const key = ev.key || ev.keyCode;
    if (key === "Enter" || key === 13) {
      handleClick();
    }
  };

  return (
    <>
      {" "}
      <span
        className="inline text-prissian font-bold cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
    </>
  );
};

export default Glossary;
