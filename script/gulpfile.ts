import { series, parallel } from "gulp";
import { buildPackages } from "./buildPackages";
import { removeBeforeFold } from "./removeBeforeFold";
import { handleScss, mergeCss } from "./handleScss";

export default series(
  removeBeforeFold,
  parallel(
    buildPackages
    // series(handleScss, mergeCss)
  )
);
