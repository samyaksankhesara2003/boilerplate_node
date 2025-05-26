import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
    entry: ['src/index.ts'],
    format: ['esm'],
    target: 'es2022',
    clean: process.env.NODE_ENV === 'development' ? false : true,
    dts: true,
    sourcemap: true,
    splitting: true,
    bundle: true,
    skipNodeModulesBundle: true,
    outExtension: () => ({ js: '.mjs' }),
    ...options
}));
