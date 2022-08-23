import { series, parallel } from "gulp";
import { build } from "./build";
import { removeBeforeFold } from "./removeBeforeFold";
import { handleScss, mergeCss } from "./handleScss";

export default series(
  removeBeforeFold,
  parallel(
    build
    // series(handleScss, mergeCss)
  )
);
