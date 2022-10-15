export const storiesTemplate = (name) => `
import React from "react";
import { ${name} } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/${name}",
  Component: ${name},
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes:{
    
  }
} as ComponentMeta<typeof ${name}>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof ${name}> = (args) => <${name} {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {

};
`;

export const initComponentIndexFile = (name) => `
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";

interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  (props, forwardedRef) => {
    const { children } = props;

    return <div ref={forwardedRef}>${name}</div>;
  }
);
${name}.displayName = "${name}";
  `;
