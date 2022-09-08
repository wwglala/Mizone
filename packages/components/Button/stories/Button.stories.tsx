import React from "react";
import { Button, ButtonProps } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Button",
  Component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {
    size: {
      options: ["small", "middle", "large", "stretch"],
      control: { type: "radio" },
    },
    type: {
      options: ["default", "primary", "dashed"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  children: "basic",
  onClick() {},
} as ButtonProps;
