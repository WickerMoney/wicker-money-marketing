import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

// Mirrors the wicker-money-dev eslint.config.mjs style. Standalone repo, not
// part of the wicker-money pnpm workspace, so kept minimal rather than
// sharing config across repos.
export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/.astro/**', '**/node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['astro.config.mjs'],
    languageOptions: {
      globals: { process: 'readonly' },
    },
  },
)
