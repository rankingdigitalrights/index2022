import c from "clsx";
import Link from "next/link";
import React from "react";

import {
  isFootnoteLink,
  isFootnoteReferenceLink,
  isGlossaryLink,
  isInternalLink,
} from "../utils";
import FootnoteBacklink from "./footnote-backlink";
import FootnoteReference from "./footnote-reference";
import Glossary from "./glossary";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const NarrativeLink = ({id, href, children, className}: LinkProps) => {
  if (isGlossaryLink(href)) {
    const glossaryId = href.replace(/.*#glossary-(\w+)$/, "$1");
    return <Glossary id={`glossary-${glossaryId}`}>{children}</Glossary>;
  }

  if (isFootnoteReferenceLink(href) && id) {
    const footnoteId = id.replace(/ftnt_ref(\d*)$/, "$1");

    return <FootnoteReference className={className} id={footnoteId} />;
  }

  if (isFootnoteLink(href) && id) {
    const footnoteId = id.replace(/ftnt(\d*)$/, "$1");

    return <FootnoteBacklink className={className} id={footnoteId} />;
  }

  if (isInternalLink(href)) {
    const target = href
      .replace(/^https:\/\/[.w]?rankingdigitalrights.org\/index2022/, "")
      .replace(/^\/(index2022|index2022-stg)/, "");

    return (
      <Link passHref href={decodeURIComponent(target)}>
        <a className={c(className)}>{children}</a>
      </Link>
    );
  }

  // Spaces in front of links are sometimes swallowed therefore I enforce a
  // space in any case.
  return (
    <>
      {" "}
      <a
        className={c(className)}
        href={decodeURIComponent(href)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </>
  );
};

export default NarrativeLink;
