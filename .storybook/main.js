const path = require("path");

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      "@adapters": path.resolve(__dirname, "..", "src", "adapters"),
      "@config": path.resolve(__dirname, "..", "src", "config"),
      "@components": path.resolve(__dirname, "..", "src", "components"),
      "@modules": path.resolve(__dirname, "..", "src", "modules"),
      "@locales": path.resolve(__dirname, "..", "locales"),
      "@routes": path.resolve(__dirname, "..", "src", "routes"),
      "@styles": path.resolve(__dirname, "..", "src", "styles"),
    }

    return config;
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "../tsconfig.json")
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
        },
        include: [path.resolve(__dirname, "../src")]
      }
    },
    {
      name: "@storybook/preset-scss",
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[name]__[local]--[hash:base64:5]"
          }
        }
      }
    },
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@rogal/addon-react-translate'
  ],
};
