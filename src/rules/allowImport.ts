import { TSESLint } from "@typescript-eslint/experimental-utils";
import ignore, { Ignore } from "ignore";

type Options = {
  patterns: string[];
  includes: string[];
  execludes: string[];
}[];

const getPatterns = (options: Options) => options[0].patterns;
// const getIncludes = (options: Options) => options[0].includes;
const getExecludes = (options: Options) => options[0].execludes;
const convertIgnore = (optionList: string[]) =>
  optionList.map((option) => ignore({ allowRelativePaths: true }).add(option));

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
      messageId: "Don't allow import '{{ name }}'",
    },
    schema: [
      {
        type: "object",
        properties: {
          patterns: "object",
          // includes: "array",
          execludes: "array",
        },
        additionalProperties: false,
      },
    ],
  },
  create: (context) => {
    const { parserServices, options, getFilename } = context;
    const patterns = getPatterns(options);
    // const includes = getIncludes(options) || ["./**/*"];
    const execludes = getExecludes(options) || [];

    if (!parserServices) return {};

    const allowPatterns: Ignore[] = convertIgnore(patterns);
    // const allowIncludes: Ignore[] = convertIgnore(includes);
    const allowExecludes: Ignore[] = convertIgnore(execludes);

    // exeludes で渡されたパスは除外
    for (const execlude of allowExecludes) {
      if (execlude.ignores(getFilename())) {
        return {
          Program: () => {},
        };
      }
    }

    const checkAllowPatterns = (importSource: string) =>
      allowPatterns.length > 0 &&
      allowPatterns.some((allowPattern) => allowPattern.ignores(importSource));

    return {
      ImportDeclaration(node): void {
        const importSource = node.source.value as string;
        if (
          importSource.charAt(0) !== "." ||
          (importSource.charAt(0) === "." && importSource.length === 1)
        ) {
          return;
        }

        if (!checkAllowPatterns(importSource)) {
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
