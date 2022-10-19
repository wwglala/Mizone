import {
  compose,
  composeParams,
  curry,
  cx,
  identity,
  track,
  Validator,
} from "@mizone/utils";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  ComponentProps,
  ComponentType,
  ReactNode,
} from "react";
import { useBem } from "../../utils";
import { FormContext } from "./FormContext";

interface FieldProps<T extends ComponentType<any>> {
  path: string;
  component: React.FC<ComponentProps<T>>;
  label?: ReactNode;
  validtor?: (v: any) => boolean;
  required?: boolean;
  message?: string;
}

export const Field = forwardRef<HTMLDivElement, FieldProps<any>>(
  (props, forwardedRef) => {
    const {
      path,
      component: Component,
      label,
      validtor,
      required,
      message = `${path} is not valid`,
    } = props;
    const form = useContext(FormContext);
    const bem = useBem();

    const [value, setValue] = useState("");
    const [noError, setNoError] = useState(true);

    useEffect(() => {
      if (validtor) {
        form.addRule(
          path,
          compose(composeParams(identity, setNoError), validtor),
          message
        );
      } else if (required) {
        form.addRule(
          path,
          compose(composeParams(identity, setNoError), Validator.required),
          message
        );
      }
      form.registry(path, (value) => {
        form.validator([path]);
        setValue(value);
      });
    }, []);

    const onChange = (v) => {
      form.setValue(path, v);
    };

    return (
      <div>
        <div>
          <span style={{ color: "red" }}>{required && "*"}</span>
          {label}:
        </div>
        <Component ref={forwardedRef} {...{ value, onChange }}></Component>
        {!noError && (
          <div className={cx(bem("field", { error: true }))}>xxxx</div>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
