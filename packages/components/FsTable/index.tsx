import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useBem } from "../utils";
import { useResizeObserver } from "../utils/hooks/useResizeObserver";

interface FsTableProps extends HTMLAttributes<HTMLDivElement> {
  dataSource: string[][];
  colgroup: number[];
}

export interface FsTableExports {
  colgroup: number[];
  dataSource: string[][];
}

const DEFAULT_DATA_SOURCE = [
  ["", "", ""],
  ["", "", ""],
];

function setDefault(
  type: "colgroup" | "dataSource",
  dataSource: string[][],
  colgroup?: number[]
): any[] {
  switch (type) {
    case "colgroup": {
      if (!colgroup || colgroup.length === 0) {
        const _dataSource = setDefault("dataSource", dataSource);
        return _dataSource[0].map(() => 100);
      }
      return colgroup;
    }

    case "dataSource": {
      if (!dataSource || !dataSource[0]?.length) {
        return DEFAULT_DATA_SOURCE;
      }
      return dataSource;
    }
    default:
      return [];
  }
}

export const FsTable = forwardRef<FsTableExports, FsTableProps>(
  (props, forwardedRef) => {
    const { dataSource: staticDataSource, colgroup: staticColGroup } = props;

    const _dataSource = setDefault("dataSource", staticDataSource);
    const _colgroup = setDefault("colgroup", _dataSource, staticColGroup);

    const bem = useBem();

    const [colgroup, setColGroup] = useState(_colgroup);
    const [dataSource, setDataSource] = useState(_dataSource);
    const [colResizeHeight, setColResizeHeight] = useState<string>();
    const [modifyX, setModifyX] = useState<number | null>(null);

    useImperativeHandle(
      forwardedRef,
      () => {
        return {
          dataSource,
          colgroup,
        };
      },
      [colgroup, dataSource]
    );

    const tableRef = useRef<HTMLTableElement>(null);
    useResizeObserver(tableRef, (rect) => {
      setColResizeHeight(rect.height);
    });

    const elementRef = useRef<HTMLDivElement>(null);

    const positionRef = useRef({
      startWidth: 0,
      clientX: 0,
      modifyX: 0,
    });

    const onMouseMove = (e: MouseEvent) => {
      const offsetX = e.clientX - positionRef.current.clientX;
      let newWidth = positionRef.current.startWidth + offsetX;
      if (newWidth < 66) {
        newWidth = 66;
      }
      colgroup[positionRef.current.modifyX] = newWidth;
      setColGroup([...colgroup]);
    };

    const onMouseUp = () => {
      setModifyX(null);
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      idx
    ) => {
      positionRef.current = {
        startWidth: colgroup[idx],
        clientX: e.clientX,
        modifyX: idx,
      };

      setModifyX(idx);
      document.body.style.cursor = "col-resize";

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onCircleMouseOver = (idx) => {
      setModifyX(idx);
    };
    const onCircleMouseLeave = () => {
      setModifyX(null);
    };
    const onCircleAdd = (idx) => {
      setColGroup((group) => {
        group.splice(idx, 0, 100);
        return [...group];
      });

      setDataSource((data) => {
        return data.map((item) => {
          item.splice(idx, 0, "100");
          return [...item];
        });
      });
    };

    const trInsRef = useRef<HTMLTableRowElement[]>([]);

    const [trsHeight, setTrsHeight] = useState(dataSource.map(() => "40px"));
    useLayoutEffect(() => {
      const cbs = trInsRef.current.map((tr, index) => {
        const observer = new ResizeObserver(() => {
          const rect = getComputedStyle(tr);
          setTrsHeight((th) => {
            th.splice(index, 1, rect.height);
            return [...th];
          });
        });
        observer.observe(tr);

        return () => {
          observer.unobserve(tr);
        };
      });

      return () => cbs.forEach((cb) => cb());
    }, []);

    return (
      <div ref={elementRef} className={bem("fs-table", "element")}>
        <div className={bem("fs-table", "wrapper")}>
          <div className={bem("fs-table", "scroll-border")}>
            <div className={bem("fs-table")}>
              <div className={bem("fs-table", "container")}>
                <table className={bem("fs-table", "self")} ref={tableRef}>
                  <colgroup>
                    {dataSource[0].map((_, cox) => (
                      <col width={colgroup[cox]} />
                    ))}
                  </colgroup>
                  <tbody>
                    {dataSource.map((tds, trx) => (
                      <tr
                        ref={(trIns) => {
                          trInsRef.current.push(trIns!);
                        }}
                        key={trx}
                        className={bem("fs-table", "tr")}
                      >
                        {tds.map((content, tdx) => (
                          <td key={tdx} className={bem("fs-table", "td")}>
                            <div
                              className={bem("fs-table", "td-container")}
                              contentEditable
                            >
                              {content}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={bem("fs-table", "resize")}>
                <div className={bem("fs-table", "resize-item")}>
                  <div
                    className={bem("fs-table", "resize-btn-first", {
                      active: modifyX === -1,
                    })}
                  >
                    <div
                      className={bem("fs-table", "resize-line")}
                      style={{ height: colResizeHeight, marginLeft: 7 }}
                    />
                  </div>
                </div>
                {dataSource[0].map((_, idx) => (
                  <div
                    key={idx}
                    className={bem("fs-table", "resize-item")}
                    style={{ minWidth: colgroup[idx] }}
                  >
                    <div
                      className={bem("fs-table", "resize-btn", {
                        active: modifyX === idx,
                      })}
                      onMouseDown={(e) => onMouseDown(e, idx)}
                    >
                      <div
                        className={bem("fs-table", "resize-line")}
                        style={{ height: colResizeHeight }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={bem("fs-table", "operation-bar")}>
          <div
            className={bem("fs-table", "operation-bar-col")}
            style={{ width: "auto" }}
          >
            <div className={bem("fs-table", "operation-bar-col-inner")}>
              {colgroup.map((item, cox) => (
                <div
                  className={bem("fs-table", "header-operation")}
                  style={{ width: item }}
                ></div>
              ))}
            </div>
          </div>
          <div
            className={bem("fs-table", "operation-bar-row")}
            style={{ height: colResizeHeight }}
          >
            {dataSource.map((_, idx) => (
              <div className={bem('fs-table','operation-bar-row-item')} style={{ height: trsHeight[idx] }}></div>
            ))}
          </div>

          <div className={bem("fs-table", "operation-bar-docx-col")}>
            <div
              className={bem("fs-table", "docx-col-item")}
              onMouseOver={() => onCircleMouseOver(-1)}
              onMouseLeave={onCircleMouseLeave}
            >
              <div className={bem("fs-table", "circle")}></div>
              <div
                className={bem("fs-table", "add")}
                onClick={() => onCircleAdd(0)}
              >
                +
              </div>
            </div>
            {colgroup.map((item, cox) => (
              <div
                key={cox}
                className={bem("fs-table", "docx-col-item")}
                style={{ marginLeft: colgroup[cox] - 18 }}
                onMouseOver={() => onCircleMouseOver(cox)}
                onMouseLeave={onCircleMouseLeave}
              >
                <div className={bem("fs-table", "circle")}></div>
                <div
                  className={bem("fs-table", "add")}
                  onClick={() => onCircleAdd(cox + 1)}
                >
                  +
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
FsTable.displayName = "FsTable";
