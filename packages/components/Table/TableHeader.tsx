import React from "react";
import { cx } from "@mizone/utils";
import { useBem } from "../utils/hooks";
import { GridColumns } from "./useMarkGridLayoutInfo";

interface TableHeaderProps {
  columns: GridColumns[];
  maxDeep: number;
}
export default function TableHeader(props: TableHeaderProps) {
  const { columns, maxDeep } = props;
  const bem = useBem();

  const RenderColumns = (props: { columns: GridColumns[] }) => {
    return (
      <>
        {props.columns.map(({ title, children, deep, grid }, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className={cx(
                  bem("table", "cell"),
                  bem("table", "cell", { header: true })
                )}
                style={{
                  gridColumn: `${grid[0]} / ${grid[1]}`,
                  gridRow: `${deep} / span ${
                    !children?.length ? maxDeep - deep + 1 : 1
                  }`,
                }}
              >
                {title}
              </div>
              {children && <RenderColumns columns={children} />}
            </React.Fragment>
          );
        })}
      </>
    );
  };
  return (
    <div className={cx(bem("table", "header"))}>
      <RenderColumns columns={columns} />
    </div>
  );
}
