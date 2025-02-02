import type { StorybookConfig } from "@storybook/react-webpack5";
import webpack from "webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config: any) => {
    // Add polyfills for Node.js modules
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      http: "stream-http",
      https:"https-browserify",
      stream: "stream-browserify",
      buffer: "buffer",
      util: "util",
      process: "process",
    };

    // Provide global variables
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      })
    );

    return config;
  },
};
export default config;
