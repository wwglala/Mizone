import { cx } from "@mizone/utils";
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";
import { useBem } from "../utils";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  content: string;
  position: "left" | "top" | "right" | "bottom";
}
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, forwardedRef) => {
    const { children, content, position = "top" } = props;

    const bem = useBem();
    return (
      <div
        ref={forwardedRef}
        // @ts-ignore
        content={content}
        className={cx(bem("tooltip"), bem("tooltip", { [position]: true }))}
      >
        {children}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";
