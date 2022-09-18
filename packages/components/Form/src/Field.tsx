import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  ComponentProps,
  ComponentType,
} from "react";
import { FormContext } from "./FormContext";

interface FieldProps<T extends ComponentType<any>> {
  path: string;
  component: React.FC<ComponentProps<T>>;
}

export const Field = forwardRef<HTMLDivElement, FieldProps<any>>(
  (props, forwardedRef) => {
    const { path, component: Component } = props;
    const form = useContext(FormContext);
    const [value, setValue] = useState(undefined);
    useEffect(() => {
      form.registry(path, (value) => {
        setValue(value);
      });
    }, []);

    const onChange = (v) => {
      form.setValue(path, v);
    };

    return <Component ref={forwardedRef} {...{ value, onChange }}></Component>;
  }
);

Field.displayName = "Field";
