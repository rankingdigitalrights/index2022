/* eslint react/no-danger: off */
import React, {useState} from "react";

import glossary from "../../data/glossary.json";
import Modal from "./modal";

interface GlossaryProps {
  id: string;
  children?: React.ReactNode;
}

const Glossary = ({id, children}: GlossaryProps) => {
  const [hasModal, setHasModal] = useState(false);

  const handleToggle = () => {
    setHasModal(!hasModal);
  };

  const entry = glossary.find((item) => item.id === id);

  if (!entry) return <span>XXXX {id} XXXX</span>;

  return (
    <>
      {hasModal && (
        <Modal title={entry.title} hasHtmlTitle onCancel={handleToggle}>
          <div
            dangerouslySetInnerHTML={{
              __html: entry.text,
            }}
          />
        </Modal>
      )}{" "}
      <button
        className="font-circular text-prissian font-bold"
        onClick={handleToggle}
      >
        {children}
      </button>
    </>
  );
};

export default Glossary;
