import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  ComponentProps,
  ComponentType,
  ReactNode,
} from "react";
import { FormContext } from "./FormContext";

interface FieldProps<T extends ComponentType<any>> {
  path: string;
  component: React.FC<ComponentProps<T>>;
  label?: ReactNode;
}

export const Field = forwardRef<HTMLDivElement, FieldProps<any>>(
  (props, forwardedRef) => {
    const { path, component: Component, label } = props;
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

    return (
      <div>
        <div>{label}:</div>
        <Component ref={forwardedRef} {...{ value, onChange }}></Component>
      </div>
    );
  }
);

Field.displayName = "Field";
