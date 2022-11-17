import React, { ReactNode } from "react";
import { RadioContext } from "./context";

interface RadioGroupProps {
  value?: any;
  onChange?: (v: any) => void;
  children?: ReactNode;
}
export function RadioGroup(props: RadioGroupProps) {
  const { value, onChange = (v) => {}, children } = props;
  return (
    <RadioContext.Provider
      value={{ __group__: true, value, onrgChange: onChange }}
    >
      {children}
    </RadioContext.Provider>
  );
}
