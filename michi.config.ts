import { ServerConfig } from '@michijs/server';

export const config: ServerConfig = (environment) => {
  if (environment === 'DISTRIBUTION')
    return {
      esbuildOptions: {
        tsconfig: 'dist.tsconfig.json'
      }
    }

  return {};
};

export default config;