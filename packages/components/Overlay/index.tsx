import React, {
  HtmlHTMLAttributes,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Portal } from "../Portal";
import { useBem } from "../utils/hooks";
import { cx } from "@mizone/utils";

interface OverlayProps extends HtmlHTMLAttributes<HTMLDivElement> {
  host: Element;
  anchor: RefObject<HTMLElement>;
  auto?: boolean;
}
export function Overlay(props: OverlayProps) {
  const { auto, host, anchor, ...rest } = props;
  const bem = useBem();
  const anchorWidth = anchor.current?.getBoundingClientRect().width ?? 0;

  const [width, setWidth] = useState(anchorWidth);

  useEffect(() => {
    const observer = new ResizeObserver((entry) => {
      const target = entry[0].target;
      setWidth(target.clientWidth);
    });
    observer.observe(anchor.current!);
    return () => observer.unobserve(anchor.current!);
  }, []);

  return (
    <Portal host={host} style={{ position: "fixed" }}>
      <div
        className={cx(bem("overlay"), { [bem("overlay", { auto })]: auto })}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      />
    </Portal>
  );
}
