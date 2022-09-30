import { cx } from "@mizone/utils";
import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "../Portal";
import { useBem, useMergeRefs } from "../utils/hooks";
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
    const innerMaskRef = useRef<HTMLDivElement>(null);
    const innerWrapperRef = useRef<HTMLDivElement>(null);
    const mergeRef = useMergeRefs(forwardedRef, innerMaskRef);

    const maskAnimation: any = [
      [{ background: "rgba(0,0,0,0.0)" }, { background: "rgba(0,0,0,0.6)" }],
      { duration: 300, easing: "ease", fill: "forwards" },
    ];

    const wrapperAnimation: any = [
      [
        { opacity: 0, transform: "translateY(-200px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 300, easing: "ease", fill: "forwards" },
    ];

    return (
      <Animate
        visible={visible}
        duration={300}
        start={() => {
          innerMaskRef.current?.animate(maskAnimation[0], maskAnimation[1]);
          innerWrapperRef.current?.animate(
            wrapperAnimation[0],
            wrapperAnimation[1]
          );
        }}
        end={() => {
          innerMaskRef.current?.animate(
            [...maskAnimation[0].reverse()],
            maskAnimation[1]
          );
          innerWrapperRef.current?.animate(
            [...wrapperAnimation[0].reverse()],
            wrapperAnimation[1]
          );
        }}
      >
        <Portal ref={mergeRef} host={document.body} className={cx(bem("mask"))}>
          <div ref={innerWrapperRef} className={cx(bem("mask", "wrapper"))}>
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
        </Portal>
      </Animate>
    );
  }
);
Modal.displayName = "Modal";
