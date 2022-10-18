import { cx } from "@mizone/utils";
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils";

interface ProcessBarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  percent: number;
  size: SizeType;
}
export const ProcessBar = forwardRef<HTMLDivElement, ProcessBarProps>(
  (props, forwardedRef) => {
    const { percent, size: outSize } = props;
    const size = useSize(outSize);
    const bem = useBem();
    return (
      <div
        ref={forwardedRef}
        className={cx(bem("process"), bem("process", { [size]: true }))}
      >
        <div className={cx(bem("process", "wrapper"))}>
          <div
            className={cx(bem("process", "bar"))}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  }
);
ProcessBar.displayName = "ProcessBar";
