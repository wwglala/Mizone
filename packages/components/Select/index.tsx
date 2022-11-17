import { cx } from "@mizone/utils";
import React, { HTMLAttributes, forwardRef } from "react";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils";
import { Panel } from "../Panel";

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  dataSource: { label: string; value: any }[];
  value?: any;
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
      value,
      ...rest
    } = props;
    const bem = useBem();
    const selectIndex = dataSource.findIndex((item) => item.value === value);
    const selectLabel =
      selectIndex !== -1 ? dataSource[selectIndex].label : value;

    function OverlayBody(props: { onClose: Function }) {
      const { onClose } = props;
      return (
        <div>
          {dataSource.map((option, i) => {
            const selected = value !== undefined && value === option.value;
            return (
              <div
                className={cx(bem("select"), bem("select", { selected }))}
                key={i}
                onClick={() => {
                  onChange?.(option.value);
                  onClose();
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
        <div
          className={cx(
            bem("select", "body"),
            bem("select", "body", { placeholder: value === undefined })
          )}
        >
          {selectIndex !== -1 ? selectLabel : placeholder}
        </div>
      </Panel>
    );
  }
);
Select.displayName = "Select";
