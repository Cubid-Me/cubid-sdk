import { defineConfig } from 'tsup';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.tsconfig = 'tsconfig.json';
    options.define = {
      ...options.define,
      global: 'globalThis',
      process: JSON.stringify({ env: {} }),
    };
    options.inject = ['./polyfills.js'];
    options.plugins = [
      NodeGlobalsPolyfillPlugin({
        process: true,
        buffer: true,
      }),
    ];
  },
});