import { cx } from "@mizone/utils";
import React, { HTMLAttributes, ReactNode, forwardRef, FC } from "react";
import { Icon } from "../Icon";
import { useBem } from "../utils";

interface ToolBarItemProps {}

interface ToolBarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  config: ReactNode[];
}
export const ToolBar = forwardRef<HTMLDivElement, ToolBarProps>(
  (props, forwardedRef) => {
    const { children, config = [], className, ...restProps } = props;

    const bem = useBem();

    return (
      <div
        ref={forwardedRef}
        className={cx(className, bem("toolBar", "menu"))}
        {...restProps}
      >
        <div className={bem("toolBar", "toggle")}>
          <Icon type="add"></Icon>
        </div>
        {config.map((tool, idx) => (
          <li
            key={idx}
            className={bem("toolBar", "li")}
            style={{ "--i": idx + 1 }}
          >
            {tool}
          </li>
        ))}
      </div>
    );
  }
);
ToolBar.displayName = "ToolBar";
