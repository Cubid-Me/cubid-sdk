/* global require, module, __dirname */
/* eslint @typescript-eslint/no-require-imports: "off" -- Metro loads this CommonJS configuration. */
const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.useWatchman = false;
// Shared reference transport is one directory above this isolated app package.
config.watchFolders = [...config.watchFolders, path.resolve(__dirname, "..")];
module.exports = config;
