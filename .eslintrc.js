module.exports = {
   env: {
      node: true,
      es2021: true,
   },
   extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
   overrides: [],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
   },
   plugins: ["@typescript-eslint"],
   rules: {
      "linebreak-style": ["error", "unix"],
      "no-var": ["error"],
      "arrow-body-style": ["error", "always"],
      "no-new-func": ["error"],
   },
};
