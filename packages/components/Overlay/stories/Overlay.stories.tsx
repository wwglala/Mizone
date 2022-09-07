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
  },
} as ComponentMeta<typeof Overlay>;

export const Template: ComponentStory<typeof Overlay> = (args) => {
  // @ts-ignore
  const { width } = args;

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
        <Overlay anchor={anchor} host={document.body}>
          aaa
        </Overlay>
      )}
    </>
  );
};

Template.args = {
  // @ts-ignore
  width: "100",
};
