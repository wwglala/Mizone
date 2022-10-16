import { cx } from "@mizone/utils";
import React, { ReactNode } from "react";
import { useBem } from "../../utils";

interface FormLayoutProps {
  children?: ReactNode;
}

export function FormLayout(props: FormLayoutProps) {
  const { children } = props;
  const bem = useBem();

  return <div className={cx(bem("form", "layout"))}>{children}</div>;
}
