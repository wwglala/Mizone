import React, { useState } from "react";
import { Select } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";
import "../../Panel/style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Select",
  Component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState(2);
  const onChange = (v) => {
    setValue(v);
  };

  return <Select {...args} value={value} onChange={onChange} />;
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  placeholder: "user name",
  size: "small",
  value: 2,
  dataSource: [
    { label: "xxxx", value: 1 },
    { label: "xxxx2", value: 2 },
    { label: "xxxx3", value: 3 },
  ],
};
