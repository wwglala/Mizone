import path from "path";

export const UI_NAME = "mizone";

export const ROOT_PATH = path.resolve(__dirname, "../");

export const BUILD_PATH = path.join(ROOT_PATH, "packages");

export const UI_PATH = path.join(BUILD_PATH, UI_NAME);

export const OUT_PATH = path.join(ROOT_PATH, "dist");

export const OUT_UI_PATH = path.join(OUT_PATH, UI_NAME);

export const extensions = [".tsx", ".ts", ".js", ".json"];
