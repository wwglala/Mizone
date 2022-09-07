import React, {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import { cx } from "@mizone/utils";
import { useBem } from "../utils/hooks/useBem";
import { SizeType } from "../config-provider/sizeContext";
import { useSize } from "../utils/hooks/useSize";

export type ButtonType = "primary" | "default" | "dashed";
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<any>, "onClick" | "type"> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: SizeType;
  type?: ButtonType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      onClick,
      size: outSize,
      type = "default",
      ...rest
    } = props;
    const bem = useBem();
    const size = useSize(outSize);

    return (
      <button
        ref={forwardedRef}
        className={cx(
          className,
          bem("button"),
          bem("button", { [size]: size }),
          bem("button", { [type]: type })
        )}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
