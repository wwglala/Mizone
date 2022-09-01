import React, { ReactNode } from "react";
import { ThemeContext, config, defaultPrefixCls } from "./themeContext";
import { SizeContext, SizeType } from "./sizeContext";

export interface ConfigProviderProps {
  prefixCls?: string;
  children?: ReactNode;
  size?: SizeType;
}

export default function ConfigProvider(props: ConfigProviderProps) {
  const { children, prefixCls, size = "stretch" } = props;
  return (
    <ThemeContext.Provider
      value={{
        ...config,
        getPrefixCls(suffixCls: string, customPrefixCls?: string) {
          if (customPrefixCls) return customPrefixCls;
          return `${prefixCls || defaultPrefixCls}-${suffixCls}`;
        },
      }}
    >
      <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
    </ThemeContext.Provider>
  );
}
