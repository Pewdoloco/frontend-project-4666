import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    ignores: [
      "node_modules/",
      "__fixtures__/",
      "*.log",
    ],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        test: "readonly",
      },
    },
    plugins: {
      jest: jest,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "indent": ["error", 4],
      "no-trailing-spaces": "error",
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
      "no-else-return": "error"
    },
  },
  js.configs.recommended,
];