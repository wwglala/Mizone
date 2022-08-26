module.exports = {
  stories: ["../stories/**/*.stories.*", "../packages/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
      },
    },
  },
};
