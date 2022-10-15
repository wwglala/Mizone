import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";
import { Command } from "commander";
import { BUILD_PATH } from "./PATH";
import { questionList } from "./mizone-script/template/chooseList";
import {
  storiesTemplate,
  initComponentIndexFile,
} from "./mizone-script/template/filesTemplate";

function createComponent() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "componentName",
        message: "请输入要创建的组件名称",
      },
    ])
    .then(async (answer) => {
      const { componentName } = answer;
      await createTemplate(path.join(BUILD_PATH, "components"), componentName);
    });
}

async function createTemplate(foldPath: string, componentName: string) {
  const fileName =
    componentName[0].toLocaleUpperCase() + componentName.slice(1);
  const dist = path.join(foldPath, fileName);
  const style = path.join(dist, "style");
  const stories = path.join(dist, "stories");
  await fs.mkdir(dist);
  await fs.mkdir(style);
  await fs.mkdir(stories);
  await fs.writeFile(
    path.join(style, "index.scss"),
    `@use '../../theme/index.scss' as *;`
  );
  await fs.writeFile(
    path.join(stories, `${fileName}.stories.tsx`),
    storiesTemplate(fileName)
  );
  await fs
    .writeFile(path.join(dist, "index.tsx"), initComponentIndexFile(fileName))
    .then(() => {
      consola.success(chalk.bgCyan(`${fileName}创建成功`));
    });
}

const program = new Command();
program.name("@mizone-script").description("CLI to mizone").version("0.0.1");

program
  .command("create")
  .description("working to create your component")
  .action(async () => {
    inquirer.prompt(questionList).then(async (answers) => {
      const { operator } = answers;
      switch (operator) {
        case 1:
          return createComponent();
      }
    });
  });

program.parse();
