import { RefObject, useLayoutEffect } from "react";

export const useResizeObserver = (
  element:RefObject<Element>,
  cb: (rect: CSSStyleDeclaration) => void,
  deps: Array<unknown> = []
) => {
  useLayoutEffect(() => {
    if (!element.current) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const rect = getComputedStyle(element.current!);
      cb(rect);
    });

    observer.observe(element.current)

    return () => {
      observer.unobserve(element.current!);
    };
  }, deps);
};
