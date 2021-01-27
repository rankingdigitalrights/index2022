import puppeteer, {Page} from "puppeteer";

export interface BrowserTask<T extends unknown> {
  (arg: T): Promise<void>;
}

export interface BrowserApi {
  page: Page;
  goto: BrowserTask<string>;
  pdf: BrowserTask<string>;
  waitSeconds: BrowserTask<number>;
}

export interface BrowserExecutor {
  (f: (api: BrowserApi) => Promise<void>): Promise<void>;
}

export interface BrowserDispose {
  (): Promise<void>;
}

export interface BrowserCtx {
  browse: BrowserExecutor;
  dispose: BrowserDispose;
}

export default async (headless = true): Promise<BrowserCtx> => {
  const instance = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setuid-sandbox"],
    headless,
  });

  const dispose: BrowserDispose = () => instance.close();

  const browse: BrowserExecutor = async (f) => {
    const page = await instance.newPage();
    await page.setViewport({width: 1279, height: 768});

    const goto: BrowserTask<string> = async (url) => {
      try {
        await page.goto(url, {waitUntil: "load"});
      } catch (error) {
        await page.close();
        throw error;
      }
    };

    const pdf: BrowserTask<string> = async (path) => {
      // const headerTemplate = `<div style="background-color:#1c5275;height:100%">
      // <span class="title text-sm font-circular" />
      // </div>`;
      // const footerTemplate = `<div class="flex items-end">
      // <span class="pageNumber" />/<span class="totalPages" />
      // </div>`;

      await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        // displayHeaderFooter: true,
        // margin: {
        //   bottom: 70, // minimum required for footer msg to display
        //   left: 0,
        //   right: 0,
        //   top: 0,
        // },
        // footerTemplate,
        // headerTemplate,
        path,
      });
    };

    const waitSeconds: BrowserTask<number> = async (seconds: number) => {
      await page.waitForTimeout(seconds * 1000);
    };

    await f({
      goto,
      waitSeconds,
      page,
      pdf,
    });

    await page.close();
  };

  return {dispose, browse};
};
