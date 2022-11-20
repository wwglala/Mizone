import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useRef,
  useState,
} from "react";
import { useBem, useMergeRefs } from "../utils";

interface VirtualNormalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  dataSource: any[];
  children: (dataSource: any[]) => ReactNode;
  parentHeight: number;
  itemHeight: number;
}
export const VirtualNormal = forwardRef<HTMLDivElement, VirtualNormalProps>(
  (props, forwardedRef) => {
    const { children, dataSource, parentHeight, itemHeight } = props;

    const ref = useRef<HTMLDivElement>(null);
    const refs = useMergeRefs(ref, forwardedRef);
    const bem = useBem();

    const [top, setTop] = useState(0);

    const len = dataSource.length;
    const totalHeight = len * itemHeight;
    const count = Math.ceil(parentHeight / itemHeight);
    const start = Math.floor(top / itemHeight);
    const end = start + count * 2;

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scrollTop = (e.target as HTMLInputElement).scrollTop;
      setTop(scrollTop - (scrollTop % itemHeight));
    };

    return (
      <div ref={refs} className={bem("virtual")} onScroll={onScroll}>
        <div
          className={bem("virtual", "padding")}
          style={{ height: totalHeight }}
        />
        <div
          className={bem("virtual", "list")}
          style={{ height: parentHeight, transform: `translateY(${top}px)` }}
        >
          {children(dataSource.slice(start, end))}
        </div>
      </div>
    );
  }
);
VirtualNormal.displayName = "VirtualNormal";
