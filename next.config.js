/* eslint @typescript-eslint/no-var-requires: off */
const withSvgr = require("next-svgr");

const ensureSlash = (path) => (path.startsWith("/") ? path : `/${path}`);

module.exports = withSvgr({
  basePath: ensureSlash(process.env.BASE_PATH || "/index2020"),
});
