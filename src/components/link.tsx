import c from "clsx";
import Link from "next/link";
import React from "react";

import {isInternalLink} from "../utils";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NarrativeLink = ({href, children, className}: LinkProps) => {
  if (isInternalLink(href)) {
    const target = href
      .replace(/^https:\/\/[.w]?rankingdigitalrights.org\/index2020/, "")
      .replace(/^\/index2020[gst-]?/, "");

    return (
      <Link passHref href={decodeURIComponent(target)}>
        <a className={c(className)}>{children}</a>
      </Link>
    );
  }

  return (
    <a
      className={c(className)}
      href={decodeURIComponent(href)}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default NarrativeLink;
