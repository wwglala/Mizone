
import React from "react";
import { Tooltip } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Tooltip",
  Component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes:{
    
  }
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {

};
