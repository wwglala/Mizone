import { cx } from "@mizone/utils";
import React, { HTMLAttributes, ReactNode, forwardRef, useRef } from "react";
import { Portal } from "../Portal";
import { useBem } from "../utils/hooks";
import { Button } from "../Button";
import { Animate } from "../Animate";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  onOk: () => void;
  onClose: () => void;
  title?: string;
  header?: boolean;
  footer?: boolean;
  children?: ReactNode;
}
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (props, forwardedRef) => {
    const { visible, onOk, onClose, title, header, footer, children } = props;
    const bem = useBem();

    return (
      <Animate
        visible={visible}
        appear={bem("mask", { show: true })}
        exit={bem("mask", { close: true })}
        duration={400}
      >
        <Portal
          ref={forwardedRef}
          host={document.body}
          className={cx(bem("mask"))}
        >
          <Animate
            visible={visible}
            duration={400}
            appear={bem("mask", "wrapper", { show: visible })}
            exit={bem("mask", "wrapper", { close: !visible })}
          >
            <div className={cx(bem("mask", "wrapper"))}>
              {header && (
                <div className={cx(bem("mask", "header"))}>
                  <div>{title}</div>
                  <div
                    onClick={onClose}
                    className={cx(bem("mask", "header", { close: true }))}
                  >
                    x
                  </div>
                </div>
              )}
              <div className={cx(bem("mask", "body"))}>{children}</div>
              {footer && (
                <div className={cx(bem("mask", "footer"))}>
                  <Button onClick={onOk}>确定</Button>
                  <Button onClick={onClose}>取消</Button>
                </div>
              )}
            </div>
          </Animate>
        </Portal>
      </Animate>
    );
  }
);
Modal.displayName = "Modal";
