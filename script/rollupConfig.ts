import fs from "fs";
import path from "path";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { getExternals } from "./utils";
import { OUT_UI_PATH, OUT_PATH, UI_NAME, extensions } from "./PATH";
// 不能包含注释！！！
import tsConfig from "../tsconfig.json";

export const config = {
  external: getExternals(),
  plugins: [
    replace({
      preventAssignment: true,
      __DEV__: "true",
    }),
    resolve({
      extensions,
    }),
    typescript({
      tsconfigOverride: {
        exclude: [...tsConfig.exclude, "**/*.stories.*"],
      },
    }),
    commonjs(),
    json(),
    babel({
      exclude: ["node_modules/**"],
      extensions,
      // babelHelpers: "runtime",
      // plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
    }),
  ],
};

export const outConfig = {
  es: {
    format: "esm",
    dir: path.join(OUT_PATH, UI_NAME, "es"),
  },
  cjs: {
    format: "cjs",
    dir: path.join(OUT_PATH, UI_NAME, "lib"),
  },
  umd: {
    format: "umd",
    name: "mizone",
    dir: path.join(OUT_PATH, UI_NAME, "main"),
    inlineDynamicImports: true,
  },
} as const;
