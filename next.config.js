/* eslint @typescript-eslint/no-var-requires: off, global-require: off */
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");

const ensureSlash = (path) => (path.startsWith("/") ? path : `/${path}`);

module.exports = withPlugins([withSvgr], {
  basePath: ensureSlash(process.env.BASE_PATH || "/index2022"),
  assetPrefix: ensureSlash(process.env.BASE_PATH || "/index2022"),
});
