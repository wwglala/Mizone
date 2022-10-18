
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, forwardedRef) => {
    const { children } = props;

    return <div ref={forwardedRef}>Tooltip</div>;
  }
);
Tooltip.displayName = "Tooltip";
  