import Head from "next/head";
import React from "react";

import htmlMeta from "../../data/html-meta.json";

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
          <meta name={name} content={metaTags[name]} />
        ))}
      </>

      <>
        {ogTags.map((property) => (
          <meta property={property} content={metaTags[property]} />
        ))}
      </>

      <>
        {otherTags.map((name) => (
          <meta name={name} content={metaTags[name]} />
        ))}
      </>

      <link rel="icon" href="/favicon.ico" />
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

      <link
        rel="icon"
        href="/index2020/cropped-rdr_icon_black-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        href="/index2020/cropped-rdr_icon_black-192x192.png"
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="/index2020/cropped-rdr_icon_black-180x180.png"
      />
    </Head>
  );
};

export default HtmlHead;
