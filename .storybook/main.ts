import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
          injectStoryParameters: false,
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
          },
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    'storybook-dark-mode',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-controls',
  ],
  features: {
    storyStoreV7: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
