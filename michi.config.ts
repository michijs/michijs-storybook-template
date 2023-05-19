import { ServerConfigFactory } from "@michijs/dev-server";

export const config: ServerConfigFactory = (environment) => {
  if (environment === "DISTRIBUTION")
    return {
      esbuildOptions: {
        tsconfig: "dist.tsconfig.json",
      },
    };

  return {};
};

export default config;
