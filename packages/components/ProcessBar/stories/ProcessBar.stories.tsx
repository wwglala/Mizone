import React from "react";
import { ProcessBar } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/ProcessBar",
  Component: ProcessBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {
    size: {
      options: ["small", "middle", "stretch"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof ProcessBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof ProcessBar> = (args) => (
  <ProcessBar {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  percent: 60,
  size: "stretch",
};
