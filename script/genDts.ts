import path from "path";
import fg from "fast-glob";
import clean from "gulp-clean";
import { src, dest } from "gulp";
import { Project, SourceFile } from "ts-morph";
import { mkdir, writeFile } from "fs/promises";
import { BUILD_PATH, OUT_UI_PATH, ROOT_PATH, UI_NAME, UI_PATH } from "./PATH";

async function genDts() {
  const project = new Project({
    compilerOptions: {
      // declaration: true,
      emitDeclarationOnly: true,
      baseUrl: ROOT_PATH,
      outDir: path.join(OUT_UI_PATH, "types"),
    },
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: path.join(ROOT_PATH, "tsconfig.dts.json"),
  });

  // await project.emit({
  // emitOnlyDtsFiles: true,
  //   // customTransformers: {
  //   //   afterDeclarations: [
  //   //     (context) => (sourceFile: any) => {
  //   //       const file = sourceFile.getSourceFile();
  //   //       if (!file) return sourceFile;
  //   //       const content = sourceFile
  //   //         .getFullText()
  //   //         .replace(/@hahaha-ui/g, "hahaha-ui");
  //   //       console.log("=====");

  //   //       return ts.createSourceFile(
  //   //         file.fileName,
  //   //         content,
  //   //         ScriptTarget.ESNext
  //   //       );

  //   //       return sourceFile;
  //   //     },
  //   //   ],
  //   // },
  // });
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
          await writeFile(
            filepath,
            file.getText().replace(/@hahaha-ui/g, "hahaha-ui"),
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
  const filePaths = await fg(["**/*.ts?(x)", "!*.stories.*"], {
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
