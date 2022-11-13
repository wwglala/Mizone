import { cx } from "@mizone/utils";
import React, { HTMLAttributes, useRef, useState } from "react";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils";
import { Overlay } from "../Overlay";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  children?: React.ReactNode;
  size?: SizeType;
  OverlayBody: (props: { onClose: Function }) => JSX.Element;
}

export function Panel(props: PanelProps) {
  const { size: outSize, OverlayBody, children } = props;
  const bem = useBem();
  const size = useSize(outSize);
  const ref = useRef<HTMLLabelElement>(null);
  const [visible, setVisible] = useState(false);

  function onFocus() {
    setVisible(true);
  }

  function onBlur() {
    setVisible(false);
  }

  return (
    <label
      ref={ref}
      tabIndex={0}
      className={cx(bem("control"), bem("control", { [size]: true }))}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onFocus}
    >
      {children}
      {visible && (
        <Overlay
          anchor={ref}
          host={document.body}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <OverlayBody onClose={onBlur}></OverlayBody>
        </Overlay>
      )}
    </label>
  );
}
