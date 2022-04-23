/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off, import/no-unresolved: off */
import Head from "next/head";
import {useRouter} from "next/router";
import React from "react";

import htmlMeta from "../../data/html-meta.json";

const HtmlHead = () => {
  const router = useRouter();

  const path = router.pathname.replace(/\/index2022|\/index2022-stg(.*)/, "$1");
  const metaTags = htmlMeta;

  const title = metaTags[path]?.title ? metaTags[path]?.title : metaTags.title;
  const description = metaTags[path]?.description
    ? metaTags[path]?.description
    : metaTags.description;

  const twitterTags = Object.keys(metaTags).filter((key) =>
    key.startsWith("twitter"),
  );
  const ogTags = Object.keys(metaTags).filter((key) => key.startsWith("og"));
  const otherTags = Object.keys(metaTags).filter(
    (key) =>
      !(
        key.startsWith("twitter") ||
        key.startsWith("og") ||
        key.startsWith("/")
      ),
  );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <link
        rel="icon"
        href="https://rankingdigitalrights.org/wp-content/uploads/2022/01/header-no-text-150x150.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        href="https://rankingdigitalrights.org/wp-content/uploads/2022/01/header-no-text.png"
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon"
        href="https://rankingdigitalrights.org/wp-content/uploads/2022/01/header-no-text.png"
      />
      <>
        {twitterTags.map((name) => {
          const content = metaTags[path]?.[name]
            ? metaTags[path]?.[name]
            : metaTags[name];
          return <meta key={name} name={name} content={content} />;
        })}
      </>

      <>
        {ogTags.map((name) => {
          const content = metaTags[path]?.[name]
            ? metaTags[path]?.[name]
            : metaTags[name];
          return <meta key={name} property={name} content={content} />;
        })}
      </>

      <>
        {otherTags.map((name) => {
          const content = metaTags[path]?.[name]
            ? metaTags[path]?.[name]
            : metaTags[name];

          return <meta key={name} name={name} content={content} />;
        })}
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

      {/* <link
        rel="icon"
        href={require("../images/cropped-rdr_icon_black-32x32.png?url")}
        sizes="32x32"
      />
      <link
        rel="icon"
        href={require("../images/cropped-rdr_icon_black-192x192.png?url")}
        sizes="192x192"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href={require("../images/cropped-rdr_icon_black-180x180.png?url")}
      />
       */}
    </Head>
  );
};

export default HtmlHead;
