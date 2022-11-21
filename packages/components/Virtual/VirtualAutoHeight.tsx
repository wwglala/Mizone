import { cx } from "@mizone/utils";
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBem, useMergeRefs } from "../utils";

interface VirtualAutoHeightProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  dataSource: any[];
  children: (dataSource: any[]) => ReactNode;
  guessHeight?: number;
  parentHeight?: number;
}
export const VirtualAutoHeight = forwardRef<
  HTMLDivElement,
  VirtualAutoHeightProps
>((props, forwardedRef) => {
  const {
    dataSource,
    children,
    className,
    guessHeight = 100,
    parentHeight = 100,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const refs = useMergeRefs(ref, forwardedRef);
  const listRef = useRef<HTMLDivElement>(null);
  const bem = useBem();
  const [_parentHeight, setParentHeight] = useState(parentHeight);

  const computedPosition = useMemo(() => {
    return dataSource.map((_, idx) => ({
      index: idx,
      height: guessHeight,
      top: idx * guessHeight,
      bottom: (idx + 1) * guessHeight,
    }));
  }, []);

  const [{ start, end, top }, setPosition] = useState({
    start: 0,
    end: Math.ceil(_parentHeight / guessHeight),
    top: 0,
  });

  const lastItem = computedPosition[computedPosition.length - 1];

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = (e.target as HTMLInputElement).scrollTop;
    const $start = computedPosition.find(
      (item) => item.bottom > scrollTop
    )!.index;
    const $end = $start + Math.ceil(_parentHeight / guessHeight);
    const $top = $start > 0 ? computedPosition[$start - 1].bottom : 0;
    setPosition((state) => ({
      ...state,
      start: $start,
      end: $end,
      top: $top,
    }));
  };

  useLayoutEffect(() => {
    const observer = new IntersectionObserver((mutions) => {
      const children$ = mutions[0].target.children;
      Array.from(children$).forEach((node, idx) => {
        const rect = node.getBoundingClientRect();
        computedPosition[start + idx].height = rect.height;
      });
    });
    observer.observe(listRef.current!);
    return () => observer.unobserve(listRef.current!);
  }, []);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((mutions) => {
      const target = mutions[0].target;
      const rect = target.getBoundingClientRect();
      setParentHeight(rect.height);
      setPosition((state) => ({
        ...state,
        end: Math.ceil(rect.height / guessHeight),
      }));
    });
    observer.observe(ref.current!);
    return () => observer.unobserve(ref.current!);
  }, []);

  return (
    <div
      ref={ref}
      className={cx(className, bem("virtual"))}
      onScroll={onScroll}
    >
      <div
        className={bem("virtual", "padding")}
        style={{ height: lastItem.bottom }}
      />
      <div
        ref={listRef}
        className={bem("virtual", "list")}
        style={{ transform: `translateY(${top}px)` }}
      >
        {children(dataSource.slice(start, end))}
      </div>
    </div>
  );
});

VirtualAutoHeight.displayName = "VirtualAutoHeight";
