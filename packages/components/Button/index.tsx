import React, { ReactNode } from "react";
import { cx } from "@mizone/utils";
import { useBem } from "../utils/hooks/useBem";

interface ButtonProps {
  children?: ReactNode;
}

export function Button(props: ButtonProps) {
  const { children } = props;
  const bem = useBem();

  return (
    <div className={cx(bem("button"), bem("button", { primary: true }))}>
      {children}
    </div>
  );
}
