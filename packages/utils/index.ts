export type Modifiers = Record<string, any>;
export function bem(
  block: string,
  element?: string | Modifiers,
  modifiers?: Modifiers
) {
  return [
    ...(function* () {
      if (typeof element === "undefined") {
        yield block;
      } else if (typeof element === "object") {
        yield block;
        for (const [modifier, valid] of Object.entries(element)) {
          if (valid) {
            yield `${block}--${modifier}`;
          }
        }
      } else if (typeof modifiers === "undefined") {
        yield `${block}__${element}`;
      } else {
        yield `${block}__${element}`;
        for (const [modifier, valid] of Object.entries(modifiers)) {
          if (valid) {
            yield `${block}__${element}--${modifier}`;
          }
        }
      }
    })(),
  ];
}

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
    .filter(Boolean)
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
  return <T>(args: T) => {
    return fns.reduceRight((params, fn) => {
      return fn(params);
    }, args);
  };
};

export const composeParams = (...fns: Fn[]) => {
  return <T>(...args: T[]) => {
    return fns.reduceRight((params, fn) => {
      return fn(...args);
    }, args);
  };
};

export const track = curry((log: string, source: any) => {
  console.log(log, source);
  return source;
});

export const identity = (id) => id;

type Field = ((source: any) => any) | string;

interface ValidaOptions {
  cacheRules?: boolean;
}
export class Validator {
  private rules: { field: Field; rule: Function; message: string }[];
  constructor(private options: ValidaOptions = { cacheRules: true }) {
    this.rules = [];
  }

  static minLength = curry((len: number, data: any) => {
    return data.length <= len;
  });

  static required = curry((name: any) => {
    return !!name;
  });

  add(fn: Field, rule: Function, message: string) {
    this.rules.push({ field: fn, rule, message });
  }
  valida<T>(source: T, fields?: string[]): any[] | null {
    const errors = [] as any;
    let i = 0;
    while (
      this.options.cacheRules ? i < this.rules.length : this.rules.length
    ) {
      const { field, rule, message } = this.options.cacheRules
        ? this.rules[i]
        : this.rules.shift()!;
      i++;
      if (!fields || (field && fields.includes(field as string))) {
        let value = null;
        if (typeof field === "function") {
          value = field(source);
        } else {
          value = source[field];
        }
        const isTrue = rule(value);
        if (!isTrue) errors.push({ field, message });
      }
    }

    return errors.length !== 0 ? errors : null;
  }
}
// validator.add((data: any) => data.name, Validator.minLength(6), "xxxx");
// validator.add("sex", (data) => data, "xxxx");

// const errors = validator.valida({
//   name: "wwg",
//   age: 12,
//   sex: undefined,
// });

// console.log(errors);
