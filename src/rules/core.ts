import ignore, { Ignore } from "ignore";
import { CheckAllowPatternsType, IsLintTargetType, Options } from "./types";

const getPatterns = (options: Options) => options[0].patterns;
const getIncludes = (options: Options) => options[0].includes;
const getExcludes = (options: Options) => options[0].excludes;
const convertToIgnore = (optionList: string[]) =>
  optionList.map((option) => ignore({ allowRelativePaths: true }).add(option));

const isLintTarget = ({ filename, options }: IsLintTargetType) => {
  const includes = getIncludes(options) || [];
  const allowIncludes = convertToIgnore(includes);
  for (const include of allowIncludes) {
    if (!include.ignores(filename)) return false;
  }

  const excludes = getExcludes(options) || [];
  const allowExcludes = convertToIgnore(excludes);
  for (const execlude of allowExcludes) {
    if (execlude.ignores(filename)) return false;
  }

  return true;
};

const checkAbsolutePath = (importSource: string) => {
  const re = /^\./;
  const isAbsolutePath = re.test(importSource);
  return (
    !isAbsolutePath || // Forexample: importSource = "react"
    importSource.startsWith("/") || // Forexample: importSource = "/hoge"
    (isAbsolutePath && importSource.length === 1) // Forexample: importSource = "."
  );
};

const checkAllowPatterns = ({
  importSource,
  options,
}: CheckAllowPatternsType) => {
  const patterns = getPatterns(options);
  const allowPatterns: Ignore[] = convertToIgnore(patterns);
  return (
    allowPatterns.length > 0 &&
    allowPatterns.some((allowPattern) => allowPattern.ignores(importSource))
  );
};

export {
  getPatterns,
  getIncludes,
  getExcludes,
  convertToIgnore,
  isLintTarget,
  checkAbsolutePath,
  checkAllowPatterns,
};
