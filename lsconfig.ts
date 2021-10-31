import { LsServerConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = (environment) => {
  if (environment === 'DISTRIBUTION')
    return {
      esbuildOptions: {
        tsconfig: 'dist.tsconfig.json'
      }
    }

  return {};
};

export default config;