import path from "path";
import { src, dest } from "gulp";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import sass from "sass";
import { UI_PATH, OUT_PATH, BUILD_PATH, UI_NAME } from "./PATH";

export function handleScss() {
  return src(path.join(BUILD_PATH, "/**/style/*.scss"))
    .pipe(gulpSass(sass)())
    .pipe(dest(path.join(OUT_PATH, UI_NAME, "style")));
}

export function mergeCss() {
  return src(path.join(OUT_PATH, UI_NAME, "/style/**/*.css"))
    .pipe(concat("main.css"))
    .pipe(dest(path.join(OUT_PATH, UI_NAME, "style")));
}
