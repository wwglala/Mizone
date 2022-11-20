import React from "react";
import { Virtual } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Virtual",
  Component: Virtual,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Virtual>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Virtual> = (args) => (
  <div>
    <div style={{ height: 500 }}>
      <Virtual {...args}>
        {(dataSource) => {
          return dataSource.map((item, i) => (
            <div
              key={i}
              style={{
                height: 50,
                border: "1px solid red",
                boxSizing: "border-box",
              }}
            >
              <div>{item.name}</div>
            </div>
          ));
        }}
      </Virtual>
    </div>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
const dataSource = new Array(1000)
  .fill(0)
  .map((item, i) => ({ name: `wwg${i}` }));

Template.args = {
  dataSource,
  guessHeight: 50,
  // parentHeight: 500,
  // itemHeight: 50,
};
