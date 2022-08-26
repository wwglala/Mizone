import React, { ReactNode, useContext } from "react";
import { getName } from "@mizone/utils";
import cx from "classnames";
import { styleContext } from "../config-provider/styleContext";

interface ButtonProps {
  children?: ReactNode;
}

export function Button(props: ButtonProps) {
  const { children } = props;
  const { getPrefixCls } = useContext(styleContext);

  const prefixCls = getPrefixCls("btn");
  const classes = cx(prefixCls, {
    [`${prefixCls}-actived`]: true,
  });
  return <div className={classes}>{children}</div>;
}
