import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['functions/api/**', 'src/lib/enquiry.ts', 'worker/**'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    files: ['scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.wrangler/**',
      'legacy/**',
      'synapse web/**',
      'reference/**',
      'node_modules/**',
    ],
  },
];
