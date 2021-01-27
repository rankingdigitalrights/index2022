import {BrowserApi} from "./browser";

export const companyPdf = async (
  href: string,
  target: string,
  browser: BrowserApi,
): Promise<void> => {
  await browser.goto(href);
  await browser.pdf(target);
};
