module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["local-rules", "@typescript-eslint", "local-rules"],
  rules: {
    semi: ["error", "always"],
    "no-extra-semi": "error",
    quotes: ["error", "double"],
    "space-before-blocks": ["error", { functions: "always" }],
    "no-undef": ["off"],
    "local-rules/": [
      "error",
      {
        patterns: ["./**/*", "utils", "a", "Piyo"], // 自分のディレクトリの下だったら許可
        // includes: [],
        execludes: ["utils"], // 除外するパス
      },
    ],
  },
};
