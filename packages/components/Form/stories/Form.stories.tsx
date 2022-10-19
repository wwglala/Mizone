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
  const [errors, setErrors] = useState<any>(null);
  useEffect(() => {
    form.onChange((name, value, source) => {
      setState({ ...source });
    });
  }, []);

  return (
    <div>
      <FormContext.Provider value={form}>
        <FormLayout>
          <Field required label="name" path="name" component={Input}></Field>
          <Field
            label="age"
            validtor={(age) => age > 10}
            path="age"
            component={Input}
          ></Field>
          <Field label="sex" path="sex" component={Input}></Field>
          <Field label="adress" path="adress" component={Input}></Field>
        </FormLayout>
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => {
              form.setValues({ name: "wwg", age: 8 });
            }}
          >
            set
          </button>
        </div>
        <div>values:</div>
        <pre>{JSON.stringify(state, null, 2)}</pre>

        <button
          onClick={() => {
            const error = form.validator();
            setErrors(error);
          }}
        >
          validator
        </button>
        <div>errors:</div>
        <pre>{errors?.map((item) => JSON.stringify(item, null, 2))}</pre>
      </FormContext.Provider>
    </div>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Template.args = {};
