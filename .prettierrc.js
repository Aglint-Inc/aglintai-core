module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  semi: true,
  overrides: [
    {
      files: ['*.sql'],
      options: {
        parser: 'none',
      },
    },
  ],
};
