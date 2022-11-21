import { VirtualNormal } from "./VirtualNormal";
import { VirtualAutoHeight } from "./VirtualAutoHeight";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import React from "react";

interface VirtualProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  dataSource: any[];
  children: (dataSource: any[]) => ReactNode;
  parentHeight?: number;
  itemHeight?: number;
  guessHeight?: number;
}

export const Virtual = forwardRef<HTMLDivElement, VirtualProps>(
  (props, forwardedRef) => {
    const { itemHeight, parentHeight } = props;

    return itemHeight && parentHeight ? (
      // @ts-ignore
      <VirtualNormal ref={forwardedRef} {...props}></VirtualNormal>
    ) : (
      <VirtualAutoHeight ref={forwardedRef} {...props}></VirtualAutoHeight>
    );
  }
);

Virtual.displayName = "Virtual";
