const babel = require("@rollup/plugin-babel").babel;
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const typescript = require("rollup-plugin-typescript2");

const extensions = [".tsx", ".ts", ".js", ".json"];

module.exports = {
  input: "./packages/orange-design/index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
    },
    {
      file: "es/index.js",
      format: "esm",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        include: ["packages/orange-design"],
        exclude: ["packages/orange-design/**/*.stories.tsx"],
      },
    }),
    resolve({
      extensions,
    }),
    commonjs(),
    json(),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
  ],
};
