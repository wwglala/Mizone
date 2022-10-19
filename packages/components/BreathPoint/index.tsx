import { cx } from "@mizone/utils";
import React, { HTMLAttributes, forwardRef, CSSProperties } from "react";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils";

interface BreathPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: SizeType;
  color?: string;
  style?: CSSProperties;
}
export const BreathPoint = forwardRef<HTMLDivElement, BreathPointProps>(
  (props, forwardedRef) => {
    const { className, size: outSize, color = "red", style } = props;
    const bem = useBem();
    const size = useSize(outSize);

    return (
      <div
        ref={forwardedRef}
        className={cx(
          bem("breath-point"),
          bem("breath-point", { [size]: true }),
          className
        )}
        style={{
          // @ts-ignore
          "--mcolor": color,
          ...style,
        }}
      />
    );
  }
);
BreathPoint.displayName = "BreathPoint";
