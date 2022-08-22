import fs from "fs/promises";
import { extensions } from "./PATH";

export const tryExt = (inputPath) => {
  for (const ext of extensions) {
    fs.readFile(inputPath, `index${ext}`);
  }
};
