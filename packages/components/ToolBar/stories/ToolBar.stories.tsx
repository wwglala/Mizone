/* eslint-disable react/jsx-key */
import React from "react";
import { ToolBar } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "../../Icon";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/ToolBar",
  Component: ToolBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof ToolBar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof ToolBar> = (args) => (
  <ToolBar {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  config: [
    <Icon type="accessibility--alt"></Icon>,
    <Icon type="alarm--add"></Icon>,
    <Icon type="apple"></Icon>,
  ],
};
