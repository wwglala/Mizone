export type Modifiers = Record<string, any>;
export const bem = (
  block: string,
  element?: string | Modifiers,
  modifiers?: Modifiers
): string => {
  if (typeof element === "string") {
    block += `__${element}`;
  }
  if (typeof element === "object") {
    for (const [key, valida] of Object.entries(element)) {
      if (valida) block += `--${key}`;
    }
  }
  if (modifiers) {
    block += bem("", modifiers);
  }
  return block;
};

export const cx = (...args: any[]): string => {
  return args
    .map((exp) => {
      if (!exp) return;
      if (typeof exp === "string") return exp.split(" ");
      if (Array.isArray(exp)) return cx(...exp);
      if (typeof exp === "object") {
        return cx(...Object.keys(exp).filter((key) => !!exp[key]));
      }
    })
    .join(" ");
};

type Fn = (...args: any[]) => any;
export const curry = (fn: Fn) => {
  const needArgsLen = fn.length;
  return function curried(...args: any[]) {
    if (args.length >= needArgsLen) {
      return fn(...args);
    } else {
      return (...args2: any[]) => curried(...args, ...args2);
    }
  };
};

export const compose = (...fns: Fn[]) => {
  return (...args: any[]) => {
    return fns.reduceRight((params, fn) => fn(...params), args);
  };
};

export const track = curry((log: string, source: any) => {
  console.log(log, source);
  return source;
});
