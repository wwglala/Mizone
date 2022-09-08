import React, { useEffect, useState } from "react";
import { Modal, ModalProps } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Modal",
  Component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {
    visible: {
      type: "boolean",
      control: "boolean",
      defaultValue: true,
    },
    title: {
      type: "string",
      defaultValue: "title",
    },
    children: {
      type: "string",
      defaultValue: "children",
    },
    footer: {
      type: "boolean",
      control: "boolean",
      defaultValue: true,
    },
    header: {
      type: "boolean",
      control: "boolean",
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Modal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState(args.visible);
  useEffect(() => {
    setVisible(args.visible);
  }, [args.visible]);
  return (
    <Modal
      {...args}
      visible={visible}
      onOk={() => setVisible(false)}
      onClose={() => setVisible(false)}
    />
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {} as ModalProps;
