import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          include: [path.resolve(__dirname, "../src")],
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
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "storybook-dark-mode",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-controls",
  ],
  framework: "@storybook/web-components-vite",
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    config.build?.rollupOptions;

    return mergeConfig(config, {
      cacheDir: "node_modules/.vite",
      server: {
        watch: {
          ignored: ["!**/node_modules/**"],
        },
        hmr: {
          clientPort: process.env.CODESPACES ? 443 : undefined, // Fixes storybook reloading on codespaces
        },
      },
      build: {
        target: "esnext",
        rollupOptions: {
          preserveEntrySignatures: "strict",
          output: {
            format: "esm",
            generatedCode: "es2015",
          },
        },
      },
      // Add dependencies to pre-optimization
      optimizeDeps: {
        exclude: ["@michijs/michijs"],
      },
    } satisfies typeof config);
  },
};

export default config;
