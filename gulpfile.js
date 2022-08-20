const gulp = require("gulp");
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const rollup = require("rollup");
const rollupConfig = require("./rollup.config");

const basePath = "./packages/orange-design";

function removeBeforeFold() {
  return gulp
    .src(["es", "types", "lib", "style"], { allowEmpty: true })
    .pipe(clean());
}
function handlerScss() {
  return gulp
    .src(basePath + "/components/**/style/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("style"));
}

function mergeCss() {
  return gulp
    .src("style/**/*.css")
    .pipe(concat("main.css"))
    .pipe(gulp.dest("style"));
}

async function build() {
  const rollupTask = await rollup.rollup(rollupConfig);
  await rollupTask.write({
    dir: "./es",
    format: "es",
  });
  await rollupTask.write({
    dir: "./lib",
    format: "cjs",
  });
}

exports.build = gulp.series(
  removeBeforeFold,
  build,
  gulp.series(handlerScss, mergeCss)
);
