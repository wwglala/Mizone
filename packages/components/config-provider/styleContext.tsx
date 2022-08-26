import React, { createContext } from "react";

export let defaultPrefixCls = "mizone";

export const config = {
  getPrefixCls: (suffixCls: string, customPrefixCls?: string) => {
    if (customPrefixCls) return customPrefixCls;
    return `${defaultPrefixCls}-${suffixCls}`;
  },
  renderEmpty: (name?: string) => {
    switch (name) {
      case "Table":
      case "List":
        return <div>empty</div>;

      default:
        return <div>empty 2</div>;
    }
  },
};

export const styleContext = createContext(config);
