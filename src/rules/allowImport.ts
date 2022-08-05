import { TSESLint } from "@typescript-eslint/experimental-utils";
import ignore, { Ignore } from "ignore";

type Options = {
  patterns: string[];
  includes: string[];
  excludes: string[];
}[];

type IsLintTargetType = {
  filename: string;
  allowIncludes: Ignore[];
  allowExcludes: Ignore[];
};

const getPatterns = (options: Options) => options[0].patterns;
const getIncludes = (options: Options) => options[0].includes;
const getExcludes = (options: Options) => options[0].excludes;
const convertToIgnore = (optionList: string[]) =>
  optionList.map((option) => ignore({ allowRelativePaths: true }).add(option));

const isLintTarget = ({
  filename,
  allowIncludes,
  allowExcludes,
}: IsLintTargetType) => {
  for (const include of allowIncludes) {
    if (!include.ignores(filename)) return false;
  }

  for (const execlude of allowExcludes) {
    if (execlude.ignores(filename)) return false;
  }

  return true;
};

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
        "Don't allow import source '{{ name }}'. Create internal directory or disable this rule.",
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
    const { parserServices, options, getFilename } = context;
    if (!parserServices) return {};

    const patterns = getPatterns(options);
    const includes = getIncludes(options) || [];
    const excludes = getExcludes(options) || [];

    const allowPatterns: Ignore[] = convertToIgnore(patterns);
    const allowIncludes: Ignore[] = convertToIgnore(includes);
    const allowExcludes: Ignore[] = convertToIgnore(excludes);

    const filename = getFilename();
    if (!isLintTarget({ filename, allowIncludes, allowExcludes })) {
      return {
        Program: () => {},
      };
    }

    return {
      ImportDeclaration(node): void {
        const importSource = node.source.value as string;
        if (
          importSource.charAt(0) !== "." ||
          (importSource.charAt(0) === "." && importSource.length === 1)
        ) {
          return;
        }

        const checkAllowPatterns = (importSource: string) =>
          allowPatterns.length > 0 &&
          allowPatterns.some((allowPattern) =>
            allowPattern.ignores(importSource)
          );

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
