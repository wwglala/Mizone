import React, {
  HtmlHTMLAttributes,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Portal } from "../Portal";
import { useBem } from "../utils/hooks/useBem";
import { cx } from "@mizone/utils";

interface OverlayProps extends HtmlHTMLAttributes<HTMLDivElement> {
  host: Element;
  anchor: RefObject<HTMLElement>;
}
export function Overlay(props: OverlayProps) {
  const { host, anchor, ...rest } = props;
  const bem = useBem();
  const anchorWidth = anchor.current?.getBoundingClientRect().width;

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
    <Portal host={host}>
      <div className={cx(bem("overlay"))} style={{ width }} {...rest} />
    </Portal>
  );
}
