import React from "react";
import { BreathPoint } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/BreathPoint",
  Component: BreathPoint,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof BreathPoint>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof BreathPoint> = (args) => (
  <div>
    <BreathPoint color="red" style={{ margin: 20 }} />
    <BreathPoint color="green" size="middle" style={{ margin: 20 }} />
    <BreathPoint color="blue" size="small" style={{ margin: 20 }} />
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
