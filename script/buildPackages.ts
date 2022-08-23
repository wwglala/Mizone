import path from "path";
import fs from "fs/promises";
import { rollup } from "rollup";
import typescript from "rollup-plugin-typescript2";
import fg from "fast-glob";
import { Dirent } from "node:fs";
import { tryExt } from "./utils";
import { UI_PATH, BUILD_PATH, OUT_PATH, UI_NAME } from "./PATH";
import { config, outConfig } from "./rollupConfig";

async function buildPackages() {
  const input = await fg(
    ["**/*.{ts,tsx,js,jsx}", "!**/*.stories.*", "!**/node_modules"],
    {
      cwd: BUILD_PATH,
      absolute: true,
      onlyFiles: true,
    }
  );

  const rollupTask = await rollup({
    ...config,
    input,
    treeshake: false,
  });

  await Promise.all(
    Object.values(outConfig).map((sett) => {
      return rollupTask.write({
        format: sett.format as any,
        dir: sett.output.path,
        exports: sett.format === "cjs" ? "named" : undefined,
        preserveModules: true,
        preserveModulesRoot: UI_PATH,
        sourcemap: true,
        entryFileNames: (chunk) => {
          const basename = path.basename(chunk.facadeModuleId as string);
          const ext = path.extname(basename) === "json" ? "json" : "js";
          return `[name].${ext}`;
        },
      });
    })
  );
}

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

export { buildComponents, buildEntry, buildPackages };
