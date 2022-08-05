import { TSESLint } from "@typescript-eslint/experimental-utils";
import { checkAbsolutePath, checkAllowPatterns, isLintTarget } from "./core";

export const allowImport: TSESLint.RuleModule<"messageId", []> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: "",
      recommended: "error",
      url: "https://github.com/takurinton/allow-import#README",
    },
    messages: {
      messageId:
        "Don't allow import source from '{{ name }}'. Create internal directory or disable this rule.",
    },
    schema: [
      {
        type: "object",
        properties: {
          patterns: "object",
          includes: "array",
          excludes: "array",
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const { options, getFilename } = context;
    const filename = getFilename();
    if (!isLintTarget({ filename, options })) {
      return {
        Program: () => {},
      };
    }

    return {
      ImportDeclaration(node): void {
        const importSource = node.source.value as string;
        if (checkAbsolutePath(importSource)) {
          return;
        }

        if (!checkAllowPatterns({ importSource, options })) {
          context.report({
            node,
            messageId: "messageId",
            data: {
              name: importSource,
            },
          });
        }
      },
    };
  },
};
