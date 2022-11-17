import React from "react";
import { Icon } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";
import iconJson from "../CarbonIcon.json";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Icon",
  Component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Icon> = (args) => {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 10 }}
    >
      {Object.keys(iconJson).map((key, i) => {
        return (
          <div
            key={i}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "26px",
            }}
          >
            <Icon type={key} />
            <span
              style={{
                fontSize: "14px",
                color: "gray",
                transform: "scale(0.5)",
                whiteSpace: "nowrap",
                maxWidth: 90,
              }}
            >
              {key}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
