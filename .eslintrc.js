module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module"
  },
  env: {
    node: true,
    jest: true
  },
  extends: [
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  ignorePatterns: ["node_modules/", "docker-volumes/", "docker*"],
  root: true,
  rules: {
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { 
          order: "asc",
          caseInsensitive: true,
        }
      }
    ]
  }
}
