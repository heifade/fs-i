import { BuildConfig } from "happywork-node-builder";

const config: BuildConfig = {
  input: "src/index.ts",
  output: [
    {
      dir: "es",
      file: "index.js",
      format: "es"
    },
    {
      dir: "lib",
      file: "index.js",
      format: "cjs"
    }
  ],
  external: [],
  mini: false
};

export default config;
