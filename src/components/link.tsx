import c from "clsx";
import Link from "next/link";
import React from "react";

import {isFootnoteLink, isGlossaryLink, isInternalLink} from "../utils";
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
    return <Glossary id={glossaryId}>{children}</Glossary>;
  }

  if (isFootnoteLink(href)) {
    return (
      <a id={id} className={c(className)} href={decodeURIComponent(href)}>
        {children}
      </a>
    );
  }

  if (isInternalLink(href)) {
    const target = href
      .replace(/^https:\/\/[.w]?rankingdigitalrights.org\/index2020/, "")
      .replace(/^\/(index2020|index2020-stg)/, "");

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
