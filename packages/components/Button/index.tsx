import React, { ReactNode, useContext } from "react";
import { styleContext } from "../config-provider/styleContext";
import { bem } from "@mizone/utils";

interface ButtonProps {
  children?: ReactNode;
}

export function Button(props: ButtonProps) {
  const { children } = props;
  const { getPrefixCls } = useContext(styleContext);

  return (
    <div className={bem(getPrefixCls("btn"), { actived: true })}>
      {children}
    </div>
  );
}
