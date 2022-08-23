import path from "path";
import { rollup } from "rollup";
import fg from "fast-glob";

import { UI_PATH, BUILD_PATH, OUT_UI_PATH } from "./PATH";
import { config, outConfig } from "./rollupConfig";
import { copyFile } from "./utils";

async function buildPackages() {
  const input = await fg(
    [
      "**/*.{ts,tsx,json}",
      "!**/*.stories.*",
      "!**/node_modules",
      "!**/package.json",
    ],
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
          const ext = path.extname(basename) === ".json" ? ".json" : ".js";
          return `[name].js`;
        },
      });
    })
  );

  await copyFile(
    path.join(UI_PATH, "package.json"),
    path.join(OUT_UI_PATH, "package.json")
  );
}

export { buildPackages };
