import { cx } from "@mizone/utils";
import React, {
  HTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  useState,
  ReactElement,
} from "react";
import { useSyncState } from "../utils/hooks";

interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
  duration: number;
  visible: boolean;
  start: any;
  end: any;
  children?: ReactNode;
}
export const Animate = (props: AnimateProps) => {
  const { visible, duration, start, end, children } = props;
  const COUNT = React.Children.count(children);
  if (COUNT !== 1) {
    throw new Error("Animate Component only need one child!");
  }
  const cacheChildren = useRef(children);
  const [JSX, setJSX] = useSyncState(visible ? cacheChildren.current : null);

  useEffect(() => {
    if (!visible) {
      end();
      setTimeout(() => {
        setJSX(null);
      }, duration);
    } else {
      setJSX(cacheChildren.current, () => {
        start();
      });
    }
  }, [visible]);

  return JSX as unknown as JSX.Element;
};
Animate.displayName = "Animate";

interface Animate2Props {
  appear: string;
  exit: string;
  visible: boolean;
  timeout: number;
  children?: ReactElement;
}

function useDelayUnmount(visible, timeout) {
  const [desctoryed, setDesctory] = useState(!visible);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setDesctory(true);
      }, timeout);
    }
  }, [visible]);

  return desctoryed;
}

export const Animate2 = (props: Animate2Props) => {
  const { appear, exit, visible, timeout, children } = props;
  const desctoryed = useDelayUnmount(visible, timeout);

  return (
    <>
      {desctoryed
        ? null
        : React.cloneElement(children!, {
            className: cx(
              children?.props.className,
              { [appear]: visible },
              { [exit]: !visible }
            ),
          })}
    </>
  );
};
