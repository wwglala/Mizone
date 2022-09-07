import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";
import consola from "consola";
import chalk from "chalk";
import { Command } from "commander";
import { BUILD_PATH } from "./PATH";

inquirer
  .prompt([
    {
      type: "list",
      name: "operator",
      message: "请选择你的操作",
      choices: [
        {
          value: 1,
          name: "创建组件",
        },
        {
          value: 2,
          name: "生成changelog",
        },
        {
          value: 3,
          name: "升级alpha",
        },
        {
          value: 4,
          name: "升级bata",
        },
      ],
    },
  ])
  .then(async (answers) => {
    const { operator } = answers;
    switch (operator) {
      case 1:
        await createComponent();
      default:
        break;
    }
  });

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

// const program = new Command();
// program.name("@mizone/scripts").description("CLI to mizone").version("0.0.1");

// program
//   .command("create")
//   .description("working to create your component")
//   .action(async () => {
//     await emitQuestion();
//   });

// program.parse();

async function createTemplate(foldPath: string, componentName: string) {
  const name = componentName[0].toLocaleUpperCase() + componentName.slice(1);
  const dist = path.join(foldPath, name);
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
    path.join(stories, `${name}.stories.tsx`),
    `
import React from "react";
import { ${name} } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

export default {
  title: "components/${name}",
  Component: ${name},
  argTypes:{
    
  }
} as ComponentMeta<typeof ${name}>;

export const Template: ComponentStory<typeof ${name}> = (args) => <${name} {...args} />;

Template.args = {

};
  `
  );
  await fs
    .writeFile(
      path.join(dist, "index.tsx"),
      `
import React, { ReactNode } from "react";
interface ${name}Props {
  children?: ReactNode;
}
export function ${name}(props: ${name}Props) {
  const { children } = props;

  return (
    <div>${name}</div>
  );
}
${name}.displayName = "${name}"
  `
    )

    .then(() => {
      consola.success(chalk.bgCyan(`${name}创建成功`));
    });
}
