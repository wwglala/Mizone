import React from "react";
import { Button, ButtonProps } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

export default {
  title: "components/Button",
  Component: <Button>wwg</Button>,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const BasicButton = Template.bind({});

BasicButton.args = {
  children: "basic",
  onClick() {
    alert("button");
  },
} as ButtonProps;
BasicButton.storyName = "basic";

export const PrimaryButton = Template.bind({});

PrimaryButton.args = {
  children: "Primary",
  type: "primary",
} as ButtonProps;
PrimaryButton.storyName = "primary";

export const LargeButton = Template.bind({});

LargeButton.args = {
  children: "Large",
  size: "large",
  className: "primary",
} as ButtonProps;
LargeButton.storyName = "large";

export const MiddleButton = Template.bind({});

MiddleButton.args = {
  children: "middle",
  size: "middle",
} as ButtonProps;
MiddleButton.storyName = "middle";

export const SmallButton = Template.bind({});

SmallButton.args = {
  children: "Small",
  size: "small",
} as ButtonProps;
SmallButton.storyName = "small";
