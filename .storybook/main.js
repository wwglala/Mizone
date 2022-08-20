// .storybook/main.js
// 这是storybook的配置文件，loader、entry file等都会在此进行配置
const path = require("path");

module.exports = {
  // storybook文档的目标文件
  stories: ["../packages/**/*.stories.tsx"],
  // 插件依赖，后面我们会使用
  addons: [
    // "@storybook/preset-scss",
    {
      name: "storybook-addon-sass-postcss",
      options: {
        rule: {
          test: /\.(scss|sass)$/i,
        },
      },
    },
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  // core: {
  //   builder: "webpack5",
  //   options: {
  //     fsCache: true,
  //   },
  // },
  // webpackFinal: async (config, { configType }) => {
  //   // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  //   // You can change the configuration based on that.
  //   // 'PRODUCTION' is used when building the static version of storybook.

  //   // Make whatever fine-grained changes you need
  //   console.log("=====ccc", config.module.rules);
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ["style-loader", "css-loader", "sass-loader"],
  //   });

  //   // Return the altered config
  //   return config;
  // },
};
