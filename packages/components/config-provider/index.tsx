import React, { ReactNode } from "react";
import { styleContext, config, defaultPrefixCls } from "./styleContext";

export interface ConfigProviderProps {
  prefixCls?: string;
  children?: ReactNode;
}

const Provider = styleContext.Provider;

export default function ConfigProvider(props: ConfigProviderProps) {
  const { children, prefixCls } = props;
  return (
    <Provider
      value={{
        ...config,
        getPrefixCls(suffixCls: string, customPrefixCls?: string) {
          if (customPrefixCls) return customPrefixCls;
          return `${prefixCls || defaultPrefixCls}-${suffixCls}`;
        },
      }}
    >
      {children}
    </Provider>
  );
}
