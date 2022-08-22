import path from "path";
import fs from "fs/promises";
import { rollup } from "rollup";
import { UI_PATH, OUT_PATH } from "./PATH";
import { Dirent } from "node:fs";
import typescript from "rollup-plugin-typescript2";
import { tryExt } from "./utils";

const isJavaScriptAsset = (filename: string) => {
  const include = [/\.(ts|js)x?/, /\.json/];
  const exculde = [/\.stories\./];
  return (
    !exculde.some((exp) => exp.test(filename)) &&
    include.some((exp) => exp.test(filename))
  );
};

async function process(
  config: any,
  dirs: Dirent[],
  inputPath: string,
  outPath: string,
  parentPath: string,
  i = 0
) {
  if (dirs.length === i) return;
  const dirent = dirs[i];
  if (dirent.isDirectory()) {
    await buildComponents(
      config,
      path.join(inputPath, dirent.name),
      outPath,
      path.join(parentPath, dirent.name)
    );
  }
  if (isJavaScriptAsset(dirent.name)) {
    const input = path.join(inputPath, dirent.name);
    const name = dirent.name.includes(".")
      ? dirent.name.split(".").slice(0, -1)
      : dirent.name;

    const transExt = /\.(ts|js)x?/.test(dirent.name) ? ".js" : ".json";

    const rollupTask = await rollup({
      ...config,
      input: input,
    });
    await rollupTask.write({
      file: path.join(outPath, "es", parentPath, `${name}${transExt}`),
      format: "es",
    });
    await rollupTask.write({
      file: path.join(outPath, "lib", parentPath, `${name}${transExt}`),
      format: "cjs",
    });
  }

  return process(config, dirs, inputPath, outPath, parentPath, i + 1);
}

async function buildComponents(
  config: any,
  inputPath: string,
  outPath: string,
  parentPath: string = ""
) {
  const dirs = await fs.readdir(inputPath, { withFileTypes: true });
  // await process(config, dirs, inputPath, outPath, parentPath);
  dirs
    .filter((item) => item.isDirectory())
    .forEach((item) => {
      tryExt(path.join(outPath, item.name));
    });
}

async function buildEntry(inputPath, outPath) {
  const config = {
    input: path.resolve(inputPath, "index.ts"),
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            module: "ESNEXT",
          },
        },
      }),
    ],
    external: () => true,
  };
  const rollupTask = await rollup(config);
  await rollupTask.write({
    format: "esm",
    file: path.resolve(outPath, "es", "index.js"),
  });
  await rollupTask.write({
    format: "cjs",
    file: path.resolve(outPath, "lib", "index.js"),
  });
}

export { buildComponents, buildEntry };
