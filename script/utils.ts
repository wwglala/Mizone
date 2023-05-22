import fs from "fs/promises";
import chalk from "chalk";
import consola from "consola";
import { extensions } from "./PATH";
import uiPackages from "../packages/mizone/package.json";

export const tryExt = (inputPath) => {
  for (const ext of extensions) {
    fs.readFile(inputPath, `index${ext}`);
  }
};

export const copyFile = async (input, out) => {
  await fs.copyFile(input, out);
};

export const getExternals = () => {
  const { dependencies, peerDependencies } = uiPackages;
  const externals = Object.keys({ ...dependencies, ...peerDependencies });
  consola.warn(chalk.bgBlue("externals:"), chalk.cyan(externals));
  return (id: string) => {
    return externals.some((name) => name === id || id.startsWith(name));
  };
};

