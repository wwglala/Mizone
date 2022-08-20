import React from "react";
import { Modal } from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "./style/index.scss";

export default {
  title: "Modal",
  Component: <Modal title="lalala" content="我是爸爸" />,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: "lalala",
  content: "我是爸爸",
};
Primary.storyName = "I am the primary";
