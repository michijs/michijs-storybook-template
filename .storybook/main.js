const path = require("path");
// const { ESBuildPlugin } = require('esbuild-loader')

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    '@storybook/addon-a11y',
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config, { configType }) => {
    const rules = [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2019',
          // sourcemap: true,
          tsconfigRaw: require('../tsconfig.json')
        },
      },
      //@storybook/addon-storysource config
      {
        test: /\.stories\.tsx?$/,
        //@ts-ignore
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: {
              prettierConfig: {
                printWidth: 100,
                singleQuote: false,
              },
            },
          },
        ],
        enforce: 'pre',
      }
    ]

    // config.plugins.push(new ESBuildPlugin());//ESBuild

    return { ...config, module: { ...config.module, rules } };
  },
}