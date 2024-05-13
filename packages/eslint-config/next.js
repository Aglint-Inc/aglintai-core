const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
    fetch: true,
    localStorage: true,
    window: true,
    document: true,
    navigator: true
  },
  env: {
    node: true,
  },
  plugins: ["only-warn", "security"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "devlink_queries",
    "devlink",
    "src/components/Icons",
    "src/components/JobTracker/Activities/devlink",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules:
  {
    "no-unused-vars": "error",
    "no-console": "error",
  }

};
