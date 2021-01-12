import slugify from "@sindresorhus/slugify";
import cheerio from "cheerio";
import pretty from "pretty";

import {CompanyDetails} from "./types";

type CheerioTag = string | cheerio.Element | cheerio.Cheerio;

const removeEmptyTag = (tag: CheerioTag, $: cheerio.Root): void => {
  $(tag).each((_idx, el) => {
    const $el = $(el);
    if ($el.text().trim() === "") $el.remove();
  });
};

const removeTag = (
  tag: CheerioTag,
  filter: string | undefined,
  $: cheerio.Root,
): void => {
  if (filter) {
    $(tag).has(filter).remove();
  } else {
    $(tag).remove();
  }
};

const extractSection = (
  fromId: string,
  untilId: string,
  $: cheerio.Root,
): cheerio.Cheerio => {
  const fromSelector = `h1[id="${fromId}"], h2[id="${fromId}"], h3[id="${fromId}"], h4[id="${fromId}"], h5[id="${fromId}"], h6[id="${fromId}"]`;
  const untilSelector = `h1[id="${untilId}"], h2[id="${untilId}"], h3[id="${untilId}"], h4[id="${untilId}"], h5[id="${untilId}"], h6[id="${untilId}"]`;
  return $("<div></div>").append($(fromSelector).nextUntil(untilSelector));
};

export const normalizeHtml = (src: string): string => {
  // scrub escaped spaces
  const html = src.replace(/&nbsp;/g, "");

  const $ = cheerio.load(html);

  // remove comments container in footer
  removeTag("div", "a[href^=#cmnt_ref][id^=cmnt]", $);

  // as well as inline comment references
  removeTag("sup", "a[id^=cmnt]", $);

  // empty paragraphs can sneak in, lets get rid of them
  removeEmptyTag("p", $);

  // rewrite the id's to something more friendly.
  $("h2").each((_idx, el) => {
    const id = slugify($(el).text());
    $(el).attr("id", id);
  });

  $("body *").map((_idx, el) => {
    const $el = $(el);

    // Remove all classes. We add classes as we go along where necessary.
    $el.removeAttr("class");

    // Remove all styles. Replace bold, italic and underline with
    // appropriate classes.
    const elStyle = $el.attr("style");
    if (elStyle) {
      // FIXME: I'm filtering out width styles of images. Right now I
      // assume that images are not a requirement. But, I need to deal
      // with those if the need ever arises.
      // Keep italic, bold and underline style definitions.
      elStyle
        .split(";")
        .filter((styleRule) => {
          return /font-style:italic|font-weight:700|text-decoration:underline/.test(
            styleRule,
          );
        })
        .forEach((style) => {
          if (style === "font-style:italic") $(el).addClass("italic");
          if (style === "font-weight:700") $(el).addClass("font-bold");
          // FIXME: Ignore underlined text since it clashes with the style of
          // links.
          // if (style === "text-decoration:underline")
          // $(el).addClass("underline");
        });

      $el.removeAttr("style");
    }

    // remove unnecessary <span> tags (whose styles were completely scrubbed)
    if (!$el.attr("class") && el.tagName === "span") {
      $el.replaceWith(el.children);
    }

    // Google HTML wraps links in a google.com redirector, extract the original link at set this as an href
    if (el.tagName === "a" && $(el).attr("href")) {
      const [isRedirected, redirectUrl] =
        ($el.attr("href") || "").match(
          "https://www.google.com/url\\?q=(.+)&sa=",
        ) || [];
      if (!isRedirected) return el;

      $el.attr("href", decodeURI(redirectUrl));
    }

    return el;
  });

  // Generating HTML might fail. In this case we simply crash.
  const normalizedHtml = $("body").html();
  if (!normalizedHtml) {
    throw new Error("Failed to convert to HTML");
  }
  return normalizedHtml;
};

export const processHtml = (src: string): string => {
  let html = src;
  html = normalizeHtml(src);
  html = pretty(html);
  return html;
};

export const emptyCompany = (id: string): CompanyDetails => ({
  id,
  basicInformation: "basic information missing",
  keyFindings: "key findings missing",
  analysis: "analysis missing",
  keyRecommendation: "key recommendations missing",
  governance: "governance missing",
  freedom: "freedom of expression missing",
  privacy: "privacy missing",
  footnotes: "footnotes missing",
});

export const companyDetails = (id: string, src: string): CompanyDetails => {
  const scaffold = emptyCompany(id);
  const $ = cheerio.load(src);

  const footnotes =
    $("<div></div>").append($("p").has("a[href^=#ftnt_ref]")).html() ||
    "footnotes missing";

  // Since we extracted the footnotes already, remove them.
  removeTag("p", "a[href^=#ftnt_ref]", $);
  // The footnotes were separated by a divider, we don't need it anymore.
  removeTag("hr", undefined, $);
  // By extracting the footnotes we leave a whole bunch of empty div's behind.
  removeEmptyTag("div", $);

  const basicInformation = extractSection(
    "basic-information",
    "key-findings",
    $,
  ).html();
  const keyFindings = extractSection(
    "key-findings",
    "key-recommendations",
    $,
  ).html();
  const keyRecommendation = extractSection(
    "key-recommendations",
    "analysis",
    $,
  ).html();
  const analysis = extractSection("analysis", "governance", $).html();
  const governance = extractSection(
    "governance",
    "freedom-of-expression",
    $,
  ).html();
  const freedom = extractSection("freedom-of-expression", "privacy", $).html();
  const privacy = extractSection("privacy", "", $).html();

  return {
    ...scaffold,
    ...(basicInformation ? {basicInformation} : undefined),
    ...(keyFindings ? {keyFindings} : undefined),
    ...(keyRecommendation ? {keyRecommendation} : undefined),
    ...(analysis ? {analysis} : undefined),
    ...(governance ? {governance} : undefined),
    ...(freedom ? {freedom} : undefined),
    ...(privacy ? {privacy} : undefined),
    ...(footnotes ? {footnotes} : undefined),
  };
};
