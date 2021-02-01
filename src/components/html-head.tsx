import Head from "next/head";
import React from "react";

import htmlMeta from "../../data/html-meta.json";
import RdrIconSmall from "../images/cropped-rdr_icon_black-32x32.png";
import RdrTouchIcon from "../images/cropped-rdr_icon_black-180x180.png";
import RdrIconLarge from "../images/cropped-rdr_icon_black-192x192.png";

const HtmlHead = () => {
  const {title, description, ...metaTags} = htmlMeta as Record<string, string>;

  const twitterTags = Object.keys(metaTags).filter((key) =>
    key.startsWith("twitter"),
  );
  const ogTags = Object.keys(metaTags).filter((key) => key.startsWith("og"));
  const otherTags = Object.keys(metaTags).filter(
    (key) => !(key.startsWith("twitter") || key.startsWith("og")),
  );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <>
        {twitterTags.map((name) => (
          <meta key={name} name={name} content={metaTags[name]} />
        ))}
      </>

      <>
        {ogTags.map((name) => (
          <meta key={name} property={name} content={metaTags[name]} />
        ))}
      </>

      <>
        {otherTags.map((name) => (
          <meta key={name} name={name} content={metaTags[name]} />
        ))}
      </>

      <link
        rel="alternate"
        type="application/rss+xml"
        title="Ranking Digital Rights » Feed"
        href="https://rankingdigitalrights.org/feed/"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Ranking Digital Rights » Comments Feed"
        href="https://rankingdigitalrights.org/comments/feed/"
      />

      <link rel="icon" href={RdrIconSmall} sizes="32x32" />
      <link rel="icon" href={RdrIconLarge} sizes="192x192" />
      <link rel="apple-touch-icon-precomposed" href={RdrTouchIcon} />
    </Head>
  );
};

export default HtmlHead;
