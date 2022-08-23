import fs from "fs";
import path from "path";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { OUT_UI_PATH, OUT_PATH, UI_NAME, extensions, external } from "./PATH";
// 不能包含注释！！！
import tsConfig from "../tsconfig.json";

export const config = {
  external,
  plugins: [
    typescript({
      // useTsconfigDeclarationDir: true,
      // tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNEXT",
          /**
           * TODO: 略微调整，并解决workspace的问题可以解决  export * from "@hahaha-ui/components";
           * plugin: rollup-plugin-replace
           */
          // declaration: true,
          // emitDeclarationOnly: true,
          // declarationDir: `${OUT_UI_PATH}/types`,
        },
        exclude: [...tsConfig.exclude, "**/*.stories.*"],
      },
    }),
    resolve({
      extensions,
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
    bundle: {
      path: `${UI_NAME}/es`,
    },
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    output: {
      name: "lib",
      path: path.join(OUT_PATH, UI_NAME, "lib"),
    },
    bundle: {
      path: `${UI_NAME}/lib`,
    },
  },
};
