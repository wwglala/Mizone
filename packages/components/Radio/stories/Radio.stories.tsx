import React, { useState } from "react";
import { Radio, RadioGroup } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Radio",
  Component: Radio,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Radio>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Radio> = (args) => {
  const [value, setValue] = useState(undefined);

  return (
    <RadioGroup value={value} onChange={(v) => setValue(v)}>
      <Radio value={1}>aaa</Radio>
      <Radio value={2}>bbb</Radio>
      <Radio value={3}>ccc</Radio>
    </RadioGroup>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  checked: true,
};
