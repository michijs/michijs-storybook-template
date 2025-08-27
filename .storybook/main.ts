import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "storybook-dark-mode",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
  ],

  framework: "@storybook/web-components-vite",

  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },

  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

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
        exclude: ["@michijs/michijs", "@ffmpeg/ffmpeg"],
      },
    } satisfies typeof config);
  },
};

export default config;
