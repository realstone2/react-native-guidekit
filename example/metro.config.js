const path = require("path");
const escape = require("escape-string-regexp");
const exclusionList = require("metro-config/src/defaults/exclusionList");
const { getDefaultConfig } = require("@expo/metro-config");

const root = path.resolve(__dirname, "..");
const packageJson = require("../package.json");

const modules = [
  ...Object.keys(packageJson.peerDependencies || {}),
  "react",
  "react-native",
];

const config = getDefaultConfig(__dirname);

config.watchFolders = [root];

config.resolver = {
  ...config.resolver,
  blacklistRE: exclusionList(
    modules.map(
      (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`)
    )
  ),
  extraNodeModules: modules.reduce((acc, name) => {
    acc[name] = path.join(__dirname, "node_modules", name);
    return acc;
  }, {}),
};

module.exports = config;
