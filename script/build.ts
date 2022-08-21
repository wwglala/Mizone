import path from "path";
import fs from "fs/promises";
import { rollup } from "rollup";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";

import { UI_PATH, ROOT_PATH, OUT_PATH, UI_NAME, extensions } from "./PATH";
import { src } from "gulp";
import { dest } from "gulp";

const oneOfConfig = {
  external: ["react", "react-dom"],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "tsconfig.json",
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNEXT",
          declarationDir: `${OUT_PATH}/types`,
          declaration: true,
        },
        include: [`${ROOT_PATH}/packages/${UI_NAME}`],
        exclude: ["**/*.stories.*"],
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

export async function build() {
  const dirs = await fs.readdir(UI_PATH, { withFileTypes: true });
  dirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .forEach(async (filePath) => {
      const input = path.join(UI_PATH, filePath, "index.tsx");
      const rollupTask = await rollup({
        ...oneOfConfig,
        input,
      });
      await rollupTask.write({
        file: path.join(OUT_PATH, "es", filePath, "index.js"),
        format: "es",
      });
      await rollupTask.write({
        file: path.join(OUT_PATH, "lib", filePath, "index.js"),
        format: "cjs",
      });
    });

  const rollupTask = await rollup({
    ...oneOfConfig,
    input: path.join(UI_PATH, "index.ts"),
  });

  await rollupTask.write({
    file: path.join(OUT_PATH, "es", "index.js"),
    format: "es",
  });
  await rollupTask.write({
    file: path.join(OUT_PATH, "lib", "index.js"),
    format: "cjs",
  });

  return src(path.join(UI_PATH, "package.json")).pipe(
    dest(path.join(OUT_PATH))
  );
}
