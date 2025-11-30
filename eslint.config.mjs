import typescriptParser from '@typescript-eslint/parser';
import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [{
  files: ['**/*.ts', '**/*.tsx'],

  plugins: {
    '@typescript-eslint': eslintPluginTypeScript,
    import: eslintPluginImport,
    react: eslintPluginReact,
    'react-hooks': eslintPluginReactHooks,
  },

  languageOptions: {
    parser: typescriptParser,
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: '19',
    },
  },

  rules: {
    ...eslintPluginReact.configs.recommended.rules,
    ...eslintPluginReact.configs['jsx-runtime'].rules,
    ...eslintPluginReactHooks.configs.recommended.rules,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    'react/display-name': 0,

    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',

        alphabetize: {
          order: 'asc',
        },

        groups: ['builtin', 'external', 'internal', ['parent', 'index', 'sibling']],
      },
    ],

    'import/extensions': ['error', 'ignorePackages'],

    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like', 'class', 'function', 'multiline-expression'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',

        next: ['block', 'block-like', 'class', 'function', 'return', 'multiline-expression'],
      },
    ],
  },
}, eslintConfigPrettier];
