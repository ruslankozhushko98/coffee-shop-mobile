import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact, { rules } from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { after: true }],
      'object-curly-spacing': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-multi-spaces': 'error',
      'max-lines': ['error', 150],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      eqeqeq: 'error',
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react-native/no-inline-styles': 2,
      'react-native/no-color-literals': 2,
      'react-native/no-raw-text': 2,
      'react-native/no-single-element-style-arrays': 2,
    },
  },
];