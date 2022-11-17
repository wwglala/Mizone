import { createContext } from "react";

export const RadioContext = createContext({
  __group__: false,
  value: undefined,
  onrgChange: (v: any) => {},
});
