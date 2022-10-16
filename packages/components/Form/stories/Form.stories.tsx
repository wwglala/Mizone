import React, { useEffect, useMemo, useState } from "react";
import { FormContext, FormController, FormLayout, Field } from "../index";
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
  const [state, setState] = useState({});
  useEffect(() => {
    form.onChange((name, value, source) => {
      setState({ ...source });
    });
  }, []);

  return (
    <div>
      <FormContext.Provider value={form}>
        <FormLayout>
          <Field label="name" path="name" component={Input}></Field>
          <Field label="age" path="age" component={Input}></Field>
          <Field label="sex" path="sex" component={Input}></Field>
          <Field label="adress" path="adress" component={Input}></Field>
        </FormLayout>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => form.setValue("name", "wwg")}>set</button>
        </div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </FormContext.Provider>
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
