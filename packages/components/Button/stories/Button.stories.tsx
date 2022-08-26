import React from "react";
import { Button } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

export default {
  title: "Button",
  Component: <Button>wwg</Button>,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "我是爸爸",
};
Primary.storyName = "basic";
