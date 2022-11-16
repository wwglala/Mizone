import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useContext,
} from "react";
import { RadioContext } from "./context";

interface RadioProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  checked?: boolean;
  onChange?: (v: any) => void;
  value?: any;
}
export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (props, forwardedRef) => {
    const {
      checked: rChecked,
      value: rvalue,
      onChange: onrChange = (v) => {},
      children,
    } = props;

    const { __group__, value, onrgChange } = useContext(RadioContext);
    let checked = rChecked;
    if (__group__) {
      checked = value === rvalue;
    }

    const onChange = __group__ ? onrgChange : onrChange;

    const id = Math.random();
    return (
      <label htmlFor={`${id}`}>
        <input
          id={`${id}`}
          type="radio"
          checked={checked}
          // @ts-ignore
          onClick={(e) => onChange(__group__ ? rvalue : e.target.checked)}
        />
        {children}
      </label>
    );
  }
);
Radio.displayName = "Radio";
