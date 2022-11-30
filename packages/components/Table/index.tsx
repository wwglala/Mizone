import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  CSSProperties,
  useMemo,
} from "react";
import { cx } from "@mizone/utils";
import { SizeType } from "../config-provider/sizeContext";
import { useBem, useSize } from "../utils/hooks";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import { deepCopy } from "../utils";
import useMarkGridLayoutInfo from "./useMarkGridLayoutInfo";

export interface CellProps {
  children?: ReactNode;
  style?: CSSProperties;
  colSpan?: number;
  rowSpan?: number;
  [x: string]: any;
}

export interface TableColumn {
  title: ReactNode;
  fixed?: boolean;
  dataIndex?: string;
  children?: TableColumn[];
  width?: number;
  cell?: (value: any, index: number, record: any) => CellProps;
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  dataSource: any[];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: SizeType;
}
export const GridTable = forwardRef<HTMLDivElement, TableProps>(
  (props, forwardedRef) => {
    const { columns, dataSource, className, style, size: outSize } = props;
    const bem = useBem();
    const size = useSize(outSize);
    const { newColumns, length, maxDeep } = useMarkGridLayoutInfo(columns);

    return (
      <div
        ref={forwardedRef}
        className={cx(bem("table"), bem("table", { [size]: size }), className)}
        style={{
          position: "relative",
          alignContent: "start",
          display: "grid",
          gridTemplateColumns: `repeat(${length}, auto)`,
          ...style,
        }}
      >
        <TableHeader columns={newColumns} maxDeep={maxDeep} />
        <TableBody dataSource={dataSource} columns={newColumns} />
      </div>
    );
  }
);
GridTable.displayName = "Table";
