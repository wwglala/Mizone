const argv = process.argv.slice(2);
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // modules: argv.includes("es") ? false : "commonjs",
      },
    ],
    ["@babel/preset-react", { runtime: "classic" }],
    // ["@babel/preset-react", { runtime: "automatic" }],
    [
      "@babel/preset-typescript",
      // {
      //   // isTSX: true,
      //   allExtensions: true,
      // },
    ],
  ],
};
