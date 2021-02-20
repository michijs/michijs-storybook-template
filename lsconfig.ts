import { LsServerConfig } from '@lsegurado/ls-server';

export const config: LsServerConfig = () => ({
    esbuildOptions: {
        entryPoints: ['./storybook/manager.js', './storybook/setup-preview.js']
    }
})

export default config