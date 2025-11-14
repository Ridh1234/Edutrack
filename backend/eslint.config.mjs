import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js", "server.js"],
    languageOptions: { ecmaVersion: 2021, sourceType: 'commonjs', globals: globals.node },
    rules: {
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_' }
      ],
      'no-console': 'off'
    }
  }
];
