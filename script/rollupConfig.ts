import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { OUT_UI_PATH, OUT_PATH, UI_NAME, extensions, external } from "./PATH";
import path from "path";

export const config = {
  external,
  plugins: [
    typescript({
      // useTsconfigDeclarationDir: true,
      // tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNEXT",
          // declarationDir: `${OUT_UI_PATH}/types`,
          // declaration: true,
        },
        // include: [`${ROOT_PATH}/packages/${UI_NAME}`],
        // exclude: ["**/*.stories.*"],
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
