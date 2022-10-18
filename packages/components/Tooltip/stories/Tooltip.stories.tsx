import React, { CSSProperties } from "react";
import { Tooltip } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Tooltip",
  Component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Tooltip> = (args) => {
  const style: CSSProperties = {
    width: 100,
    margin: "20px",
    background: "skyblue",
    borderRadius: "5px",
    margin: "10px",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      }}
    >
      <Tooltip {...args} position="top" content="top">
        <div style={style}>top</div>
      </Tooltip>
      <Tooltip {...args} position="left" content="left">
        <div style={style}>left</div>
      </Tooltip>
      <Tooltip {...args} position="right" content="right">
        <div style={style}>right</div>
      </Tooltip>
      <Tooltip {...args} position="bottom" content="bottom">
        <div style={style}>bottom</div>
      </Tooltip>
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  children: "123123",
  content: "xxxxx",
  position: "bottom",
};
