import slugify from "@sindresorhus/slugify";
import cheerio from "cheerio";
import path from "path";
import pretty from "pretty";

import {CompanyDetails, ComparePage, NarrativePage} from "./types";
import {unreachable} from "./utils";

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

const extractSectionOuter = (
  fromId: string,
  untilId: string,
  $: cheerio.Root,
): cheerio.Cheerio => {
  const fromSelector = `h1[id="${fromId}"], h2[id="${fromId}"], h3[id="${fromId}"], h4[id="${fromId}"], h5[id="${fromId}"], h6[id="${fromId}"]`;
  const untilSelector = `h1[id="${untilId}"], h2[id="${untilId}"], h3[id="${untilId}"], h4[id="${untilId}"], h5[id="${untilId}"], h6[id="${untilId}"]`;

  return $("<div></div>")
    .append($(fromSelector).clone())
    .append($(fromSelector).nextUntil(untilSelector));
};

const extractSectionTitle = (id: string, $: cheerio.Root): string => {
  const selector = `h1[id="${id}"], h2[id="${id}"], h3[id="${id}"], h4[id="${id}"], h5[id="${id}"], h6[id="${id}"]`;
  return $(selector).text();
};

export const normalizeHtml = (src: string): string => {
  // scrub escaped spaces
  const html = src.replace(/&nbsp;/g, " ");

  const $ = cheerio.load(html);

  // remove comments container in footer
  removeTag("div", "a[href^=#cmnt_ref][id^=cmnt]", $);

  // as well as inline comment references
  removeTag("sup", "a[id^=cmnt]", $);

  // We don't need break lines and Google Docs formats them non closing anyways
  removeTag("br", undefined, $);

  // empty paragraphs and div's can sneak in, lets get rid of them
  removeEmptyTag("p", $);
  removeEmptyTag("div", $);

  // rewrite the id's to something more friendly.
  $("h2").each((_idx, el) => {
    const id = slugify($(el).text());
    $(el).attr("id", id);
  });

  // We make two passes over the Google Doc HTML. The first pass trasnforms the
  // HTML tree itself. In the second pass we transform attributes of HTML tags.
  $("body *").map((_idx, el) => {
    const $el = $(el);

    // Extract pull quotes.
    if (el.tagName === "p" && $el.hasClass("subtitle")) {
      const quote = $el.html();
      $el.replaceWith(`<blockquote><p>${quote}</p></blockquote>`);
    }

    // Unnest images
    if (el.tagName === "p" && $el.has("img").get().length > 0) {
      $el.replaceWith(el.children);
    }
    return el;
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
  printName: "print name missing",
  basicInformation: "basic information missing",
  keyTakeawaysTitle: "Key takeaways",
  keyTakeaways: "key takeaways missing",
  keyFindingsTitle: "Key findings",
  keyFindings: "key findings missing",
  changesTitle: "Changes since 2019",
  changes: "analysis missing",
  keyRecommendationTitle: "Key recommendations",
  keyRecommendation: "key recommendations missing",
  governance: "governance missing",
  freedom: "freedom of expression missing",
  privacy: "privacy missing",
});

export const companyDetails = (id: string, src: string): CompanyDetails => {
  const scaffold = emptyCompany(id);
  const $ = cheerio.load(src);

  const footnotes = $("<div></div>")
    .append($("p").has("a[href^=#ftnt_ref]"))
    .html();

  // Since we extracted the footnotes already, remove them.
  removeTag("p", "a[href^=#ftnt_ref]", $);
  // The footnotes were separated by a divider, we don't need it anymore.
  removeTag("hr", undefined, $);
  // By extracting the footnotes we leave a whole bunch of empty div's behind.
  removeEmptyTag("div", $);

  const printName = $("h1").text();

  const basicInformation = extractSection(
    "basic-information",
    "key-findings",
    $,
  ).html();
  const keyFindingsTitle = extractSectionTitle("key-findings", $);
  const keyFindings = extractSection("key-findings", "key-takeaways", $).html();
  const keyTakeawaysTitle = extractSectionTitle("key-takeaways", $);
  const keyTakeaways = extractSection(
    "key-takeaways",
    "key-recommendations",
    $,
  ).html();
  const keyRecommendationTitle = extractSectionTitle("key-recommendations", $);
  const keyRecommendation = extractSection(
    "key-recommendations",
    "changes-since-2019",
    $,
  ).html();
  const changesTitle = extractSectionTitle("changes-since-2019", $);
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
    ...(printName ? {printName} : undefined),
    ...(basicInformation ? {basicInformation} : undefined),
    ...(keyFindingsTitle ? {keyFindingsTitle} : undefined),
    ...(keyFindings ? {keyFindings} : undefined),
    ...(keyTakeawaysTitle ? {keyTakeawaysTitle} : undefined),
    ...(keyTakeaways ? {keyTakeaways} : undefined),
    ...(keyRecommendationTitle ? {keyRecommendationTitle} : undefined),
    ...(keyRecommendation ? {keyRecommendation} : undefined),
    ...(changesTitle ? {changesTitle} : undefined),
    ...(changes ? {changes} : undefined),
    ...(governance ? {governance} : undefined),
    ...(freedom ? {freedom} : undefined),
    ...(privacy ? {privacy} : undefined),
    ...(footnotes ? {footnotes} : undefined),
  };
};

export const narrativeMdx = (imgPath: string, src: string): string => {
  const $ = cheerio.load(src);

  // The footnotes were separated by a divider, we don't need it anymore.
  removeTag("hr", undefined, $);

  return $("body > *")
    .toArray()
    .map((el) => {
      const $el = $(el);

      if (el.tagName === "img") {
        const title = $el.attr("title");
        const alt = $el.attr("alt");
        const attrs = [];

        const imageSrc = $el.attr("src");

        if (title && title !== "") {
          attrs.push(`title="${title}}"`);
        }
        if (alt && alt !== "") {
          attrs.push(`alt="${alt.replace(/\r?\n|\r/g, " ")}"`);
        }

        if (!imageSrc) return unreachable(`Image lacks a source.`);

        const href = path.join(imgPath, path.basename(imageSrc));

        // Google doesn't properly terminate <img> tags and this trips up the
        // MDXProvider. Rewrite the <img> to have a proper closing tag.
        return `<img src="${href}" ${attrs.join(" ")} />`;
      }

      return $.html(el);
    })
    .join("\n");
};

export const narrativeDetails = (src: string): NarrativePage => {
  const $ = cheerio.load(src, {xmlMode: true});

  const footnotes = $("<div></div>")
    .append($("p").has("a[href^=#ftnt_ref]"))
    .html();

  // Since we extracted the footnotes already, remove them.
  removeTag("p", "a[href^=#ftnt_ref]", $);
  // The footnotes were separated by a divider, we don't need it anymore.
  removeTag("hr", undefined, $);
  // By extracting the footnotes we leave a whole bunch of empty div's behind.
  removeEmptyTag("div", $);

  const pageTitle = $("h1").text();
  const body =
    extractSection($("h1").attr("id") || "", "", $).html() || "MISSING";

  return {
    pageTitle,
    body,
    ...(footnotes ? {footnotes} : undefined),
  };
};

export const compareDetails = (src: string): ComparePage => {
  const $ = cheerio.load(src, {xmlMode: true});

  const footnotes = $("<div></div>")
    .append($("p").has("a[href^=#ftnt_ref]"))
    .html();

  // Since we extracted the footnotes already, remove them.
  removeTag("p", "a[href^=#ftnt_ref]", $);
  // The footnotes were separated by a divider, we don't need it anymore.
  removeTag("hr", undefined, $);
  // By extracting the footnotes we leave a whole bunch of empty div's behind.
  removeEmptyTag("div", $);

  const pageTitle = $("h1").text() || "MISSING";

  const introduction =
    extractSection(
      "introduction",
      "how-did-we-calculate-the-year-on-year-result-for-each-company",
      $,
    ).html() || "MISSING";
  const body =
    extractSectionOuter(
      "how-did-we-calculate-the-year-on-year-result-for-each-company",
      "",
      $,
    ).html() || "MISSING";

  return {
    pageTitle,
    introduction,
    body,
    ...(footnotes ? {footnotes} : undefined),
  };
};
