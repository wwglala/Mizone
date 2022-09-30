import React, { useEffect } from "react";
import { Guide } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Guide",
  Component: () => <div>1231</div>,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<any>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<any> = (args) => {
  return (
    <div style={{ padding: 20, position: "relative" }}>
      <button
        onClick={() => {
          new Guide([
            {
              selector: ".b1",
              content: <div>123123</div>,
            },
            {
              selector: ".b2",
              content: <div>123123</div>,
            },
            {
              selector: ".b3",
              content: <div>123123</div>,
            },
          ]).start();
        }}
      >
        start
      </button>
      <div style={{ height: 200 }} />
      <button
        className="b1"
        style={{ position: "absolute", left: 0, top: 100 }}
      >
        button1
      </button>
      <button
        className="b2"
        style={{
          position: "absolute",
          top: 500,
          left: 400,
        }}
      >
        button2
      </button>
      <button
        className="b3"
        style={{
          position: "absolute",
          top: 700,
          left: 700,
        }}
      >
        button3
      </button>
      <div style={{ height: 2000 }} />
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
