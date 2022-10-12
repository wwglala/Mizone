import React from "react";
import { Table } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Table",
  Component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Table> = (args) => (
  <Table {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  columns: [
    { title: "name", dataIndex: "name" },
    { title: "age", dataIndex: "age" },
    { title: "sex", dataIndex: "sex" },
    { title: "iphone", dataIndex: "iphone" },
    { title: "address", dataIndex: "address" },
  ],
  dataSource: [
    {
      name: "wwg",
      age: "25",
      sex: 1,
      iphone: "13609951843",
      address: "河南省夏邑县寺西村",
    },
    {
      name: "wwg",
      age: "25",
      sex: 1,
      iphone: "13609951843",
      address: "河南省夏邑县寺西村",
    },
    {
      name: "wwg",
      age: "25",
      sex: 1,
      iphone: "13609951843",
      address: "河南省夏邑县寺西村",
    },
    {
      name: "wwg",
      age: "25",
      sex: 1,
      iphone: "13609951843",
      address: "河南省夏邑县寺西村",
    },
  ],
};
