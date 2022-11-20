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
  const listRef = useRef<HTMLDivElement>(null);
  const refs = useMergeRefs(ref, forwardedRef);
  const bem = useBem();

  const computed_height = useMemo(
    () =>
      Array.from(
        new Array(dataSource.length),
        (_, idx) => (idx + 1) * guessHeight
      ),
    [dataSource]
  );

  const [{ parentHeight, top, start, end }, setOffsetHeight] = useState({
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

  const update_height = useLayoutEffect(() => {
    let i = start;
    const mobserver = new MutationObserver((mutations) => {
      mutations.forEach(({ target }) => {
        // @ts-ignore
        const offsetHeight = target.offsetHeight as number;
        computed_height[i] = offsetHeight;
        i++;
      });
      console.log(computed_height);
    });

    mobserver.observe(ref.current!, { childList: true, subtree: true });
    return () => mobserver.disconnect();
  }, []);

  return (
    <div ref={refs} className={cx(className, bem("virtual"))}>
      <div
        className={bem("virtual", "padding")}
        style={{ height: computed_height[computed_height.length - 1] }}
      />
      <div ref={listRef} className={bem("virtual", "list")}>
        {children(dataSource.slice(start, end))}
      </div>
    </div>
  );
});

VirtualAutoHeight.displayName = "VirtualAutoHeight";
