const path = require("path");

module.exports = {
  stories: ["../stories/**/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    const assetRule = config.module.rules.find(({test}) => test.test(".svg"));

    assetRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("awesome-typescript-loader"),
          options: {
            configFileName: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            tsconfigPath: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
