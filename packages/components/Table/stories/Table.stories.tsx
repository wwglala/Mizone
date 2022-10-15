import React from "react";
import { GridTable } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/GridTable",
  Component: GridTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {
    size: {
      options: ["small", "middle", "stretch"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof GridTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof GridTable> = (args) => (
  <GridTable {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {
  size: "small",
  columns: [
    {
      title: "name",
      dataIndex: "name",
      fixed: true,
    },
    {
      title: "main",
      children: [
        {
          title: "age",
          children: [
            {
              title: "a",
              dataIndex: "age",
            },
            {
              title: "b",
              dataIndex: "b",
            },
          ],
        },
        {
          title: "xxxx2",
          dataIndex: "age",
        },
      ],
    },
    {
      title: "sex",
      dataIndex: "sex",
    },
    {
      title: "iphone",
      dataIndex: "iphone",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "action",
      cell: (cellData, rowData, rowIndex) => {
        return (
          <span
            style={{ color: "red", padding: "10px 0" }}
            onClick={() => alert("dele")}
          >
            删除
          </span>
        );
      },
    },
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
  ].map((item) => ({ ...item, a: 1, b: 3 })),
};

export const LeftLock: ComponentStory<typeof GridTable> = (args) => (
  <div style={{ width: 400 }}>
    <GridTable {...args} />
  </div>
);

LeftLock.args = {
  columns: [
    {
      title: "left lock",
      dataIndex: "a",
      fixed: true,
      width: 100,
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
    {
      title: "namexxxxx",
      dataIndex: "a",
    },
  ],
  dataSource: [{ a: 111111 }, { a: 111111 }, { a: 111111 }, { a: 111111 }],
};
