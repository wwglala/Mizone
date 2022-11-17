import { cx } from "@mizone/utils";
import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  createElement,
} from "react";
import { useBem } from "../utils";
import iconJson from "./CarbonIcon.json";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  type: string;
}

function renderIcon([type, props, children], key?: number) {
  return createElement(type, { key, ...props }, children?.map(renderIcon));
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  (props, forwardedRef) => {
    const { children, type, className, ...rest } = props;
    const paths = iconJson[type];
    const bem = useBem();

    return renderIcon([
      "svg",
      {
        viewBox: "0 0 32 32",
        className: cx(bem("icon"), className),
        ...rest,
      },
      paths,
    ]);
  }
);
Icon.displayName = "Icon";
