import path from "path";
import { src, dest } from "gulp";
import cleanCSS from "gulp-clean-css";
import consola from "consola";
import chalk from "chalk";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import sass from "sass";
import { UI_PATH, OUT_PATH, BUILD_PATH, UI_NAME } from "./PATH";

export function handleScss() {
  return src(path.join(BUILD_PATH, "/**/style/*.scss"))
    .pipe(gulpSass(sass)())
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
        );
      })
    )
    .pipe(dest(path.join(OUT_PATH, UI_NAME, "style")));
}

export function mergeCss() {
  return src(path.join(OUT_PATH, UI_NAME, "/style/**/*.css"))
    .pipe(concat("main.css"))
    .pipe(dest(path.join(OUT_PATH, UI_NAME, "style")));
}
