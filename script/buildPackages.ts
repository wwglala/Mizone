import path from "path";
import { rollup } from "rollup";
import fg from "fast-glob";
import chalk from "chalk";

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
      "!**/*.d.ts",
    ],
    {
      cwd: BUILD_PATH,
      absolute: true,
      onlyFiles: true,
    }
  );
  const configEntries = Object.entries(outConfig);
  try {
    const rollupTask = await rollup({
      ...config,
      input,
      // treeshake: false,
    });
    await Promise.all(
      configEntries.map(([name, sett]) => {
        if (name === "umd") return Promise.resolve();
        return rollupTask.write({
          ...sett,
          exports: sett.format === "cjs" ? "named" : undefined,
          /**
           *  import resolve from "@rollup/plugin-node-resolve";
           *  import commonjs from "@rollup/plugin-commonjs";
           *  配合这 preserveModules、preserveModulesRoot 会保持node_modlues的文件路径
           *  而在组件库打包时，并不需要打包第三方，放到packge.json 即可
           */
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
  } catch (e) {
    console.log(e.message);
  }

  const umdConfig = configEntries.find(([name]) => name === "umd");
  if (umdConfig) {
    const rollupTask = await rollup({
      ...config,
      input: path.resolve(__dirname, "../packages/mizone/index.ts"),
    });
    rollupTask.write({
      ...umdConfig[1],
      sourcemap: true,
    });
  }

  await copyFile(
    path.join(UI_PATH, "package.json"),
    path.join(OUT_UI_PATH, "package.json")
  );
}

export { buildPackages };
