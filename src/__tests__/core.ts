import { checkAbsolutePath, isLintTarget } from "../rules/core";

describe("test isLintTarget", () => {
  it("Should return true includes and excludes are empty", () => {
    const filename = "/path/to/src/Hoge/a";
    const options = [
      {
        patterns: [
          /** some patterns */
        ],
        includes: [],
        excludes: [],
      },
    ];
    expect(isLintTarget({ filename, options })).toBe(true);
  });
  it("Should return true if filename is included in includes", () => {
    const filename = "/path/to/src/Hoge/a";
    const options = [
      {
        patterns: [],
        includes: ["**/*/Hoge/**/*"],
        excludes: [],
      },
    ];
    expect(isLintTarget({ filename, options })).toBe(true);
  });
  it("Should return false if filename is not included in includes", () => {
    const filename = "/path/to/src/Hoge/a";
    const options = [
      {
        patterns: [],
        includes: ["**/*/Piyo/**/*"],
        excludes: [],
      },
    ];
    expect(isLintTarget({ filename, options })).toBe(false);
  });
  it("Should return true if filename is in excludes", () => {
    const filename = "/path/to/src/Hoge/a";
    const options = [
      {
        patterns: [],
        includes: [],
        excludes: ["**/*/Hoge/**/*"],
      },
    ];
    expect(isLintTarget({ filename, options })).toBe(false);
  });
  it("If the file name is included in includes, but the file exists in the directory below it in excludes, false should be returned.", () => {
    const filename = "/path/to/src/Hoge/a";
    const options = [
      {
        patterns: [],
        includes: ["**/*Hoge/**/*"],
        excludes: ["**/*/Hoge/a"],
      },
    ];
    expect(isLintTarget({ filename, options })).toBe(false);
  });
});

describe("test checkAbsolutePath", () => {
  it("Should return true if importSource is absolute path", () => {
    const importSource = "react";
    expect(checkAbsolutePath(importSource)).toBe(true);
  });
  it("Should return false if importSource is relative path", () => {
    const importSource = "./Hoge";
    expect(checkAbsolutePath(importSource)).toBe(false);
  });
  it("Should return true if importSource is relative path, but current directory", () => {
    const importSource = ".";
    expect(checkAbsolutePath(importSource)).toBe(true);
  });
});

describe("test checkAllowPatterns", () => {});
