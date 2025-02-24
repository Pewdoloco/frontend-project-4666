import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    ignores: [
      "node_modules/",
      "__fixtures__/",
      "*.log",
    ],
    plugins: ["jest"],
    env: {
      node: true,
      "jest/globals": true,
    },
    extends: ["airbnb-base", "plugin:jest/recommended"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
];
