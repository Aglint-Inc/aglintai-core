
/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
  ]
    .map(require.resolve)
    .concat(["eslint-config-prettier"]),
  parserOptions: {
    project: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: true,
      },
      node: {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  ignorePatterns: ['cli/', 'cli/index.mjs', "node_modules/", "dist/"],
  rules: {
    "@next/next/no-img-element": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/no-default-export": "off",
    "jsx-a11y/no-autofocus": "off",
    "no-alert": "off",
    "react/no-array-index-key": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'eslint-comments/require-description': 'off',
    "no-console": ["error", { "allow": ["error", "warn"] }],
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "unicorn/filename-case": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "camelcase": 'off'
  },
};
