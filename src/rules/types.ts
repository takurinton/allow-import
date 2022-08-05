type Options = {
  patterns: string[];
  includes: string[];
  excludes: string[];
}[];

type IsLintTargetType = {
  filename: string;
  options: Options;
};

type CheckAllowPatternsType = {
  importSource: string;
  options: Options;
};

export { Options, IsLintTargetType, CheckAllowPatternsType };
