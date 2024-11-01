module.exports = {
  extends: ['@purplefish/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['.*'],
            message: 'Use @ alias instead.',
          },
        ],
      },
    ],
  },
};
