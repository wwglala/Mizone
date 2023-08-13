import React, { useRef } from "react";
import { FsTable, FsTableExports } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/FsTable",
  Component: FsTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof FsTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof FsTable> = (args) => {
  const ref = useRef<FsTableExports>(null);

  return (
    <div>
      <button
        onClick={() => {
          console.log(JSON.stringify(ref.current));
        }}
      >
        {" "}
        onSave{" "}
      </button>
      <FsTable ref={ref} {...args} />
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  dataSource: [
    ["1", "2", "3"],
    ["", "", ""],
  ],
  // colgroup: [143, 225, 239],
};
