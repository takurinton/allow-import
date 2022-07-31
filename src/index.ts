import { allowImport } from "./rules/allowImport";

export = {
  rules: {
    "": allowImport,
  },
  configs: {
    all: {
      plugins: ["allow-import"],
      rules: {
        "allow-import": "error",
      },
    },
  },
};
