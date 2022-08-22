import { UI_PATH, OUT_PATH } from "./PATH";
import { buildComponents, buildEntry } from "./buildComponents";
import { oneOfConfig } from "./rollup";

export async function build() {
  // await buildComponents(oneOfConfig, UI_PATH, OUT_PATH);
  await buildEntry(UI_PATH, OUT_PATH);
  // const dirs = await fs.readdir(UI_PATH, { withFileTypes: true });
  // dirs
  //   .filter((dir) => dir.isDirectory())
  //   .map((dir) => dir.name)
  //   .forEach(async (filePath) => {
  //     const input = path.join(UI_PATH, filePath, "index.tsx");
  //     const rollupTask = await rollup({
  //       ...oneOfConfig,
  //       input,
  //     });
  //     await rollupTask.write({
  //       file: path.join(OUT_PATH, "es", filePath, "index.js"),
  //       format: "es",
  //     });
  //     await rollupTask.write({
  //       file: path.join(OUT_PATH, "lib", filePath, "index.js"),
  //       format: "cjs",
  //     });
  //   });

  // const rollupTask = await rollup({
  //   ...oneOfConfig,
  //   input: path.join(UI_PATH, "index.ts"),
  // });

  // await rollupTask.write({
  //   file: path.join(OUT_PATH, "es", "index.js"),
  //   format: "es",
  // });
  // await rollupTask.write({
  //   file: path.join(OUT_PATH, "lib", "index.js"),
  //   format: "cjs",
  // });

  // return src(path.join(UI_PATH, "package.json")).pipe(
  //   dest(path.join(OUT_PATH))
  // );
}
