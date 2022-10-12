import { cx } from "@mizone/utils";
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";
import { useBem } from "../utils/hooks";

interface TableColumn {
  title: ReactNode;
  dataIndex: string;
  children?: TableColumn[];
}

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  dataSource: any[];
  children?: ReactNode;
}
export const Table = forwardRef<HTMLDivElement, TableProps>(
  (props, forwardedRef) => {
    const { columns, dataSource } = props;
    const bem = useBem();

    return (
      <div
        ref={forwardedRef}
        className={cx(bem("table"))}
        style={{
          display: "grid",
          position: "relative",
          gridTemplateColumns: `repeat(${columns.length}, auto)`,
          alignContent: "start",
        }}
      >
        {columns.map(({ title }, index) => (
          <div
            key={index}
            className={cx(bem("table", "cell", { header: true }))}
          >
            {title}
          </div>
        ))}
        {dataSource.map((rowData, rowIndex) =>
          // <div key={rowIndex} className={cx(bem("table", "row"))}>
          columns.map(({ dataIndex }, colIndex) => (
            <div key={colIndex} className={cx(bem("table", "cell"))}>
              {rowData[dataIndex] ?? "-"}
            </div>
          ))
          // </div>
        )}
      </div>
    );
  }
);
Table.displayName = "Table";
