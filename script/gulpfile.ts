import { series, parallel } from "gulp";
import { removeBeforeFold } from "./removeBeforeFold";
import { buildPackages } from "./buildPackages";
import { genDts } from "./genDts";
import { handleScss, mergeCss } from "./handleScss";

export default series(
  removeBeforeFold,
  parallel(buildPackages, genDts, series(handleScss, mergeCss))
);
