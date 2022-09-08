import { MutableRefObject, useCallback } from "react";

type refProps<T> =
  | MutableRefObject<T | null>
  | ((instance: T | null) => void)
  | null;
export function useMergeRefs<T>(...refs: refProps<T>[]) {
  return useCallback((instance) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref !== null) {
        ref.current = instance;
      }
    });
  }, refs);
}
