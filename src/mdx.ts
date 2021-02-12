import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";

import NarrativeImage from "./components/narrative-image";
import PullQuote from "./components/pull-quote";
import {NarrativePage} from "./types";

type NarrativeDetails = {
  pageTitle: MdxRemote.Source;
  body: MdxRemote.Source;
  footnotes: MdxRemote.Source | null;
};

type NarrativeComponents = {
  pageTitle: React.ReactNode;
  body: React.ReactNode;
  footnotes: React.ReactNode;
};

export const components = {
  img: NarrativeImage,
  blockquote: PullQuote,
};

export const renderNarrativePage = async (
  details: NarrativePage,
): Promise<NarrativeDetails> => {
  const pageTitle = await renderToString(details.pageTitle, {components});
  const body = await renderToString(details.body, {components});
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  return {pageTitle, body, footnotes};
};

export const hydrateNarrativePage = (
  details: NarrativeDetails,
): NarrativeComponents => {
  const pageTitle = hydrate(details.pageTitle, {components});
  const body = hydrate(details.body, {components});
  const footnotes = details.footnotes
    ? hydrate(details.footnotes, {components})
    : undefined;
  return {pageTitle, body, footnotes};
};
