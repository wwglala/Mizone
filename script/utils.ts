import fs from "fs/promises";
import { extensions } from "./PATH";

export const tryExt = (inputPath) => {
  for (const ext of extensions) {
    fs.readFile(inputPath, `index${ext}`);
  }
};

export const copyFile = async (input, out) => {
  await fs.copyFile(input, out);
};
