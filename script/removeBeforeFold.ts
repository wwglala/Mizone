import { src } from "gulp";
import clean from "gulp-clean";

export function removeBeforeFold() {
  return src(
    ["dist"].map((p) => `../${p}`),
    { allowEmpty: true }
  ).pipe(clean({ force: true }));
}
