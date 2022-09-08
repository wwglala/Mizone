import React, { useRef, useState } from "react";
import { Overlay } from "../index";
import { Button } from "../../Button";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";
import "../../Portal/style/index.scss";

export default {
  title: "components/Overlay",
  Component: Overlay,
  argTypes: {
    width: {
      type: "string",
    },
    auto: {
      type: "boolean",
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Overlay>;

export const Template: ComponentStory<typeof Overlay> = (args) => {
  // @ts-ignore
  const { width, auto } = args;

  const [visible, setVisible] = useState(false);
  const anchor = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button
        style={{ width: `${width}px` }}
        ref={anchor}
        onClick={onClick}
        size="middle"
      >
        click
      </Button>
      {visible && (
        <Overlay auto={auto} anchor={anchor} host={document.body}>
          aaaasd奥术大师多阿萨德阿萨德阿萨德按时啊实打实大四大四德按时啊实打实大四大德按时啊实打实大四大德按时啊实打实大四大德按时啊实打实大四大
        </Overlay>
      )}
    </>
  );
};

Template.args = {
  // @ts-ignore
  width: "100",
};
