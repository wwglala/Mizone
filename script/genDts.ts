import path from "path";
import fs from "fs";
import fg from "fast-glob";
import clean from "gulp-clean";
import { src, dest } from "gulp";
import { Project, SourceFile } from "ts-morph";
import { mkdir, writeFile } from "fs/promises";
import { BUILD_PATH, OUT_UI_PATH, ROOT_PATH, UI_NAME } from "./PATH";

async function genDts() {
  const project = new Project({
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      baseUrl: ROOT_PATH,
      outDir: path.join(OUT_UI_PATH, "types"),
    },
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: path.join(ROOT_PATH, "tsconfig.json"),
  });

  const sourceFiles = await addSourceFiles(project);
  await Promise.all(
    sourceFiles.map(async (sourceFile) => {
      const emitOutput = sourceFile.getEmitOutput();
      const emitFiles = emitOutput.getOutputFiles();
      await Promise.all(
        emitFiles.map(async (file) => {
          const filepath = file.getFilePath();
          await mkdir(path.dirname(filepath), {
            recursive: true,
          });
          const dirname = path.dirname(filepath);
          const mizoneDir = path.join(OUT_UI_PATH, "types", "mizone");
          const isMizoneDir = !path
            .relative(dirname, mizoneDir)
            .includes(UI_NAME);
          let relativePath = "";
          if (isMizoneDir) {
            relativePath =
              path.relative(dirname, mizoneDir).replace(/\\/g, "/") || ".";
          } else {
            relativePath = path
              .relative(dirname, path.join(OUT_UI_PATH, "types"))
              .replace(/\\/g, "/");
          }
          await writeFile(
            filepath,
            file.getText().replace(new RegExp(`@${UI_NAME}`, "g"), "."),
            "utf8"
          );
        })
      );
    })
  );

  const UI_DECA = path.join(OUT_UI_PATH, "types", UI_NAME);
  await src(path.join(UI_DECA, "**/*")).pipe(
    dest(path.join(OUT_UI_PATH, "types"))
  );

  await src(UI_DECA).pipe(clean({ force: true }));
}

async function addSourceFiles(project: Project) {
  const filePaths = await fg(["**/*.ts?(x)", "!**/*.stories.*"], {
    cwd: BUILD_PATH,
    absolute: true,
    onlyFiles: true,
  });
  const sourceFiles: SourceFile[] = [];
  filePaths.forEach(async (file) => {
    const sourceFile = project.addSourceFileAtPath(file);
    sourceFiles.push(sourceFile);
  });

  return sourceFiles;
}

export { genDts };
