import { cx } from "@mizone/utils";
import React, {
  HTMLAttributes,
  useEffect,
  useState,
  ReactElement,
} from "react";
interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
  duration: number;
  visible: boolean;
  showClass: string;
  hideClass: string;
  children?: ReactElement;
}
export const Animate = (props: AnimateProps) => {
  const { visible, duration, children, showClass, hideClass } = props;
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, duration);
    } else {
      setShow(true);
    }
  }, [visible]);

  return show
    ? React.cloneElement(children!, {
        className: cx(
          children?.props.className,
          visible ? showClass : hideClass
        ),
      })
    : null;
};
Animate.displayName = "Animate";
