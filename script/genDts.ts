import path from "path";
import { rollup } from "rollup";
import typescript from "rollup-plugin-typescript2";
import { OUT_UI_PATH, UI_PATH } from "./PATH";

async function genDts() {
  try {
    const rollupTask = await rollup({
      input: path.join(UI_PATH, "index.ts"),
      plugins: [
        typescript({
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              module: "ESNext",
              declaration: true,
              // declarationDir: "types",
              emitDeclarationOnly: true,
            },
          },
        }),
      ],
    });

    await rollupTask.write({
      format: "es",
      dir: path.join(OUT_UI_PATH, "types"),
    });
  } catch (e) {
    console.log("===========e", e);
  }
}

export { genDts };
