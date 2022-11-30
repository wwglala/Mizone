import { cx } from "@mizone/utils";
import React, { CSSProperties, RefObject, useRef, useState } from "react";
import { CellProps, TableColumn } from ".";
import { useBem } from "../utils";

interface TableBodyProps {
  dataSource: any[];
  columns: TableColumn[];
}
export default function TableBody(props: TableBodyProps) {
  const { dataSource, columns } = props;
  const bem = useBem();
  const recordSpan = useRef<Record<string, number[]>>({});

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <>
      {dataSource.map((rowData, rowIndex) => (
        <div
          key={rowIndex}
          className={cx(
            bem("table", "row"),
            bem("table", "row", { hover: hoverIdx === rowIndex })
          )}
          onMouseEnter={(e) => {
            setHoverIdx(rowIndex);
          }}
        >
          <TableCellBody
            rowData={rowData}
            columns={columns}
            rowIndex={rowIndex}
            recordSpan={recordSpan}
            hoverIdx={hoverIdx}
          />
        </div>
      ))}
    </>
  );
}

const TableCellBody = (props: {
  columns: TableColumn[];
  rowData: any;
  rowIndex: number;
  recordSpan: RefObject<Record<string, number[]>>;
  hoverIdx: number | null;
}) => {
  const { columns, rowData, rowIndex, recordSpan, hoverIdx } = props;
  const bem = useBem();
  return (
    <>
      {columns.map(({ dataIndex, cell, children, fixed }, colIndex) => {
        if (!recordSpan.current![dataIndex!]) {
          recordSpan.current![dataIndex!] = [];
        }
        const preColSpan = recordSpan.current![dataIndex!]?.[rowIndex - 1];
        if (preColSpan - 1 > 0) {
          recordSpan.current![dataIndex!][rowIndex - 1] = preColSpan - 1;
          return null;
        }

        let value = dataIndex ? rowData[dataIndex] : undefined;
        let {
          children: cellText,
          colSpan,
          style,
        } = cell
          ? cell(value, rowIndex, rowData)
          : ({ children: value } as CellProps);

        if (colSpan) {
          recordSpan.current![dataIndex!][rowIndex] = colSpan;
          style = {
            ...style,
            gridRow: `span ${colSpan}`,
          };
        }

        const isHover =
          recordSpan.current![dataIndex!][hoverIdx! - 1] > 0 &&
          hoverIdx === rowIndex + 1;

        if (!children) {
          return (
            <div
              key={colIndex}
              className={cx(
                bem("table", "cell"),
                bem("table", "cell", { row: true }),
                fixed && bem("table", "cell", { fixed }),
                bem("table", "cell", { hover: isHover })
              )}
              style={style}
            >
              {cellText ?? "-"}
            </div>
          );
        }
        return (
          <TableCellBody
            key={colIndex}
            rowData={rowData}
            columns={children}
            rowIndex={rowIndex}
            recordSpan={recordSpan}
            hoverIdx={hoverIdx}
          />
        );
      })}
    </>
  );
};
