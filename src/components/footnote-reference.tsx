import Link from "next/link";
import React from "react";

interface FootnoteReferenceProps {
  id: string;
  className?: string;
}

const FootnoteReference = ({id, className}: FootnoteReferenceProps) => {
  return (
    <Link href={`#ftnt${id}`}>
      <a
        id={`ftnt_ref${id}`}
        aria-describedby="footnotes-label"
        role="doc-noteref"
        className={className}
      >
        [{id}]
      </a>
    </Link>
  );
};

export default FootnoteReference;
