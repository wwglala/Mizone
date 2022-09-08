import { RefObject, useEffect, useRef, useState } from "react";

type CallBack<T> = (value: T) => void;
type InitSetState<T> = (value: T) => T;
type IDispatch<T> = (outerValue: T | InitSetState<T>, cb?: CallBack<T>) => void;
type InitFn<T> = () => T;

function isFn<T>(initialValue: T | InitFn<T>): initialValue is InitFn<T> {
  return typeof initialValue === "function";
}
function isStateFn<T>(
  initialValue: T | InitSetState<T>
): initialValue is InitSetState<T> {
  return typeof initialValue === "function";
}

export const useSyncState = <T extends Object | null | undefined>(
  initialValue: T | InitFn<T>
): [T, IDispatch<T>, RefObject<T>] => {
  const [value, setValue] = useState<T>(initialValue);
  const cbRef = useRef<CallBack<T>>();
  const immediatelyValueRef = useRef<T>(
    isFn(initialValue) ? initialValue() : initialValue
  );

  useEffect(() => {
    cbRef.current && cbRef.current(value);
  }, [value]);

  const dispatch = (outerValue: T | InitSetState<T>, fn?: CallBack<T>) => {
    cbRef.current = fn;
    immediatelyValueRef.current = isStateFn(outerValue)
      ? outerValue(value)
      : outerValue;
    setValue(outerValue);
  };

  return [value, dispatch, immediatelyValueRef];
};
