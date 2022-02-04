import React from "react";

interface FootnoteBacklinkProps {
  id: string;
  className?: string;
}

const FootnoteBacklink = ({id, className}: FootnoteBacklinkProps) => {
  return (
    <a
      id={`ftnt${id}`}
      href={`#ftnt_ref${id}`}
      aria-label="Back to content"
      role="doc-backlink"
      className={className}
    >
      [{id}]
    </a>
  );
};

export default FootnoteBacklink;
