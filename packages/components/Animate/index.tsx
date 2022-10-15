import { cx } from "@mizone/utils";
import React, {
  HTMLAttributes,
  useEffect,
  useState,
  ReactElement,
} from "react";
interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
  appear: string;
  exit: string;
  visible: boolean;
  duration: number;
  children?: ReactElement;
}

function useDelayUnmount(visible, duration) {
  const [desctoryed, setDesctory] = useState(!visible);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setDesctory(true);
      }, duration);
    } else {
      setDesctory(false);
    }
  }, [visible]);

  return desctoryed;
}

export const Animate = (props: AnimateProps) => {
  const { appear, exit, visible, duration, children } = props;
  const desctoryed = useDelayUnmount(visible, duration);

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
Animate.displayName = "Animate";
