import slugify from "@sindresorhus/slugify";
import cheerio from "cheerio";
import path from "path";
import pretty from "pretty";

import {CompanyDetails} from "./types";
import {isString, unreachable} from "./utils";

type CheerioTag = string | cheerio.Element | cheerio.Cheerio;

const hasChildTag = (tag: string, $: cheerio.Cheerio): boolean => {
  return $.has(tag).get().length > 0;
};

const removeEmptyTag = (tag: CheerioTag, $: cheerio.Root): void => {
  $(tag).each((_idx, el) => {
    const $el = $(el);
    if ($el.text().trim() === "" && !hasChildTag("img", $el)) $el.remove();
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
  const html = src.replace(/&nbsp;/g, " ");

  const $ = cheerio.load(html);

  // remove comments container in footer
  removeTag("div", "a[href^=#cmnt_ref][id^=cmnt]", $);

  // as well as inline comment references
  removeTag("sup", "a[id^=cmnt]", $);

  // empty paragraphs and div's can sneak in, lets get rid of them
  removeEmptyTag("p", $);
  removeEmptyTag("div", $);

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
          if (["img"].includes(el.tagName) && /width/.test(styleRule)) {
            return true;
          }
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

    // Unnest images
    if (el.tagName === "p" && $el.has("img").get().length > 0) {
      $el.replaceWith(el.children);
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
  keyTakeaways: "key takeaways missing",
  keyFindings: "key findings missing",
  changes: "analysis missing",
  keyRecommendation: "key recommendations missing",
  governance: "governance missing",
  freedom: "freedom of expression missing",
  privacy: "privacy missing",
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
  const keyFindings = extractSection("key-findings", "key-takeaways", $).html();
  const keyTakeaways = extractSection(
    "key-takeaways",
    "key-recommendations",
    $,
  ).html();
  const keyRecommendation = extractSection(
    "key-recommendations",
    "changes-since-2019",
    $,
  ).html();
  const changes = extractSection("changes-since-2019", "governance", $).html();
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
    ...(keyTakeaways ? {keyTakeaways} : undefined),
    ...(keyRecommendation ? {keyRecommendation} : undefined),
    ...(changes ? {changes} : undefined),
    ...(governance ? {governance} : undefined),
    ...(freedom ? {freedom} : undefined),
    ...(privacy ? {privacy} : undefined),
    ...(footnotes ? {footnotes} : undefined),
  };
};

export const narrativeMdx = (imgPath: string, src: string): string => {
  const $ = cheerio.load(src);

  // Headlines are set manually
  removeTag("h1", undefined, $);

  $("body *").each((_idx, el) => {
    const $el = $(el);
    const className = $el.attr("class");

    if (isString(className)) {
      $el.attr("className", className);
      $el.removeAttr("class");
    }
  });

  return $("body > *")
    .toArray()
    .map((el) => {
      const $el = $(el);

      if (el.tagName === "img") {
        const imageSrc = $el.attr("src");
        const title = $el.attr("title");
        const alt = $el.attr("alt");
        const width = $el.attr("width") || 676;
        const height = $el.attr("height") || 468;

        if (!imageSrc) return unreachable(`Image lacks a source.`);

        const href = path.join(imgPath, path.basename(imageSrc));

        // Google doesn't properly terminate <img> tags and this trips up the
        // MDXProvider. Rewrite the <img> to have a proper closing tag.
        return `<img src="${href}" width="${width}" height="${height}" title="${title}" alt="${alt}" />`;
      }

      return $.html(el);
    })
    .join("\n");
};
