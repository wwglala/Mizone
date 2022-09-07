import React from "react";
import { Button, ButtonProps } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

export default {
  title: "components/Button",
  Component: Button,
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

export const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

Template.args = {
  children: "basic",
  onClick() {},
} as ButtonProps;
