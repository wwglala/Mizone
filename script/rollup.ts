import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { ROOT_PATH, OUT_PATH, UI_NAME, extensions, external } from "./PATH";

export const oneOfConfig = {
  external,
  plugins: [
    typescript({
      // useTsconfigDeclarationDir: true,
      // tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNEXT",
          // declarationDir: `${OUT_PATH}/types`,
          // declaration: true,
        },
        include: [`${ROOT_PATH}/packages/${UI_NAME}`],
        exclude: ["**/*.stories.*"],
      },
    }),
    resolve({
      extensions,
    }),
    // commonjs(),
    // json(),
    // babel({
    //   exclude: "node_modules/**",
    //   extensions,
    // }),
  ],
};
