import React, { useMemo } from "react";
import { FormContext, FormController, Field } from "../index";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../style/index.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Form",
  Component: Field,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // https://storybook.js.org/docs/react/essentials/controls#choosing-the-control-type
  argTypes: {},
} as ComponentMeta<typeof Field>;

function Input(props: any) {
  return (
    <input
      type="text"
      {...props}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    />
  );
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Template: ComponentStory<typeof Field> = (args) => {
  const form = useMemo(() => new FormController(), []);
  return (
    <div>
      <FormContext.Provider value={form}>
        <Field path="name" component={Input}></Field>
        <Field path="age" component={Input}></Field>
        <button
          onClick={() => {
            console.log(form.getValues());
          }}
        >
          get
        </button>
        <button
          onClick={() => {
            form.setValue("name", "wwg");
          }}
        >
          set
        </button>
      </FormContext.Provider>
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
