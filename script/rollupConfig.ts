import fs from "fs";
import path from "path";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import { OUT_UI_PATH, OUT_PATH, UI_NAME, extensions, external } from "./PATH";
// 不能包含注释！！！
import tsConfig from "../tsconfig.json";

export const config = {
  external,
  plugins: [
    // replace({
    //   values: {
    //     "@hahaha-ui": "../",
    //   },
    // }),
    resolve({
      extensions,
    }),
    typescript({
      // useTsconfigDeclarationDir: true,
      // tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNEXT",
          /**
           * plugin: rollup-plugin-replace
           */
        },
        exclude: [...tsConfig.exclude, "**/*.stories.*"],
      },
    }),
    commonjs(),
    json(),
    babel({
      exclude: ["node_modules/**"],
      extensions,
    }),
  ],
};

export const outConfig = {
  es: {
    module: "ESNext",
    format: "esm",
    output: {
      name: "es",
      path: path.join(OUT_PATH, UI_NAME, "es"),
    },
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    output: {
      name: "lib",
      path: path.join(OUT_PATH, UI_NAME, "lib"),
    },
  },
};
