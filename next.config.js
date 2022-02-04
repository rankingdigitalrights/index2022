/* eslint @typescript-eslint/no-var-requires: off, global-require: off */
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withImages = require("next-optimized-images");

const ensureSlash = (path) => (path.startsWith("/") ? path : `/${path}`);

module.exports = withPlugins(
  [
    withSvgr,
    [
      withImages,
      {
        optimizeImages: true,
        optimizeImagesInDev: true,
        handleImages: ["jpeg", "png", "webp"],
        responsive: {
          // eslint-disable-next-line import/no-extraneous-dependencies
          adapter: require("responsive-loader/sharp"),
        },
      },
    ],
  ],
  {
    basePath: ensureSlash(process.env.BASE_PATH || "/index2020"),
    assetPrefix: ensureSlash(process.env.BASE_PATH || "/index2020"),
  },
);
