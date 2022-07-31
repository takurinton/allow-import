import { TSESLint } from "@typescript-eslint/experimental-utils";
import { allowImport } from "../rules/allowImport";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("espree"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

tester.run("allowImport", allowImport, {
  valid: [{ code: "describe valid code pattern" }],
  invalid: [
    {
      code: "describe invalid code pattern",
      errors: [{ messageId: "messageId" }],
    },
  ],
});
