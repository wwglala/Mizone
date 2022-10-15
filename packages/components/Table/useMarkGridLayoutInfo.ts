import { useMemo } from "react";
import { TableColumn } from ".";
import { deepCopy } from "../utils";

export interface GridColumns extends TableColumn {
  deep: number;
  grid: [number, number];
  children?: GridColumns[];
}

export default function useMarkGridLayoutInfo(columns: TableColumn[]) {
  return useMemo(() => {
    const newColumns: GridColumns[] = deepCopy(columns);
    let length = countColumnLeavesNode(columns);
    let maxDeep = 1;
    function countColumnLeavesNode(
      columnProject: TableColumn[] | undefined
    ): number {
      if (!columnProject) return 0;
      return columnProject.reduce((count, { children }) => {
        if (children) {
          return count + countColumnLeavesNode(children);
        }
        return ++count;
      }, 0);
    }

    function markGridLayoutInfo(columns, deep = 1, rootIndex = 0, root = true) {
      maxDeep = Math.max(deep, maxDeep);
      for (let i = 0; i < columns.length; i++) {
        const currentCol = columns[i];
        currentCol.deep = deep;
        const start = i === 0 ? rootIndex + i + 1 : columns[i - 1].grid[1];
        const count = countColumnLeavesNode(currentCol.children) || 1;
        currentCol.grid = [start, start + count];
        if (currentCol.children) {
          markGridLayoutInfo(
            currentCol.children,
            deep + 1,
            root ? i : rootIndex,
            false
          );
        }
      }
    }
    markGridLayoutInfo(newColumns);

    return { length, newColumns, maxDeep } as const;
  }, [columns]);
}
