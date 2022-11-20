import { cx } from "@mizone/utils";
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
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
}
export const VirtualAutoHeight = forwardRef<
  HTMLDivElement,
  VirtualAutoHeightProps
>((props, forwardedRef) => {
  const { dataSource, children, className, guessHeight = 100 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const refs = useMergeRefs(ref, forwardedRef);
  const listRef = useRef<HTMLDivElement>(null);
  const bem = useBem();

  const computed_height = useMemo(
    () =>
      Array.from(
        new Array(dataSource.length),
        (_, idx) => (idx + 1) * guessHeight
      ),
    [dataSource]
  );

  const [{ parentHeight, top, start, end, count }, setOffsetHeight] = useState({
    parentHeight: 0,
    top: 0,
    start: 0,
    end: 0,
    count: 0,
  });

  useLayoutEffect(() => {
    // 获取容器高度
    const $parentHeight = ref.current!.parentElement!.offsetHeight;
    // 设置猜测的高度
    const $count = Math.ceil($parentHeight / guessHeight);

    setOffsetHeight((state) => ({
      ...state,
      parentHeight: $parentHeight,
      count: $count,
      // 设置猜测后的最后位置
      end: state.start + $count,
    }));
  }, []);

  useLayoutEffect(() => {
    const elements = Array.from(listRef.current!.children);
    let i = start;
    elements.forEach((target) => {
      // @ts-ignore
      const offsetHeight = target.offsetHeight as number;
      computed_height[i] = (computed_height[i - 1] || 0) + offsetHeight;

      i++;
    });
    // 更新真实的高度
    update_height(i);
    // console.log(computed_height);

    if (computed_height[i] < parentHeight) {
      while (computed_height[i++] <= parentHeight) {}
    }
    setOffsetHeight((state) => ({ ...state, end: i }));
  }, [end, parentHeight]);

  const update_height = (i) => {
    while (i < dataSource.length) {
      computed_height[i] = i === 0 ? 0 : computed_height[i - 1] + guessHeight;
      i++;
    }
  };

  function onScroll(e) {
    const scrollTop = e.target.scrollTop;
    const $start = Math.floor(scrollTop / guessHeight); // @todo 需要找到合适的
    setOffsetHeight((state) => ({
      ...state,
      top: scrollTop - scrollTop / guessHeight, // @todo 需要根据一个高度计算
      start: $start,
      end: $start + count,
    }));
  }

  return (
    <div
      ref={refs}
      className={cx(className, bem("virtual"))}
      onScroll={onScroll}
    >
      <div
        className={bem("virtual", "padding")}
        style={{ height: computed_height[computed_height.length - 1] }}
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
