import { cx } from "@mizone/utils";
import React, { HTMLAttributes, forwardRef } from "react";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils";
import { Panel } from "../Panel";

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  dataSource: { label: string; value: any }[];
  placeholder?: string;
  size?: SizeType;
  optionRender?: (option: any) => string;
  onChange?: (v) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (props, forwardedRef) => {
    const {
      placeholder,
      dataSource,
      optionRender = (option) => option.label,
      onChange,
      ...rest
    } = props;
    const bem = useBem();

    function OverlayBody(props: { onClose: Function }) {
      const { onClose } = props;
      return (
        <div>
          {dataSource.map((option, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  onClose();
                  onChange?.(option.value);
                }}
              >
                {optionRender(option)}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <Panel {...rest} OverlayBody={OverlayBody}>
        <div className={cx(bem("control", "body"))}>{placeholder}</div>
      </Panel>
    );
  }
);
Select.displayName = "Select";
