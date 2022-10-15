import { cx } from "@mizone/utils";
import React, { CSSProperties } from "react";
import { TableColumn } from ".";
import { useBem } from "../utils";

interface TableBodyProps {
  dataSource: any[];
  columns: TableColumn[];
}
export default function TableBody(props: TableBodyProps) {
  const { dataSource, columns } = props;
  const bem = useBem();

  const TableCellBody = (props: { columns: TableColumn[]; rowData: any }) => {
    const { columns, rowData } = props;
    return (
      <>
        {columns.map(({ dataIndex, cell, children, fixed }, colIndex) => {
          let value = dataIndex ? rowData[dataIndex] : undefined;
          if (cell) {
            value = cell(value, colIndex, rowData);
          }
          if (!children) {
            return (
              <div
                key={colIndex}
                className={cx(
                  bem("table", "cell"),
                  bem("table", "cell", { row: true }),
                  bem("table", "cell", { fixed })
                )}
              >
                {value ?? "-"}
              </div>
            );
          }
          return (
            <TableCellBody
              key={colIndex}
              rowData={rowData}
              columns={children}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      {dataSource.map((rowData, rowIndex) => (
        <div key={rowIndex} className={cx(bem("table", "row"))}>
          <TableCellBody rowData={rowData} columns={columns} />
        </div>
      ))}
    </>
  );
}
