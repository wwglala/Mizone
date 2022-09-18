interface FormControllerProps {
  initValues?: Record<string, any>;
}

export class FormController {
  private state: Record<string, any>;
  private listener: Record<string, Set<Function>>;
  constructor(props?: FormControllerProps) {
    const { initValues } = (props = {} as FormControllerProps);
    this.state = {
      ...initValues,
    };

    this.listener = {};
  }

  getValue(path: string) {
    return this.state[path];
  }

  getValues() {
    return { ...this.state };
  }

  setValue(path: string, value: any) {
    this.state[path] = value;
    this.notify(path, value);
  }

  setValues(obj: Record<string, any>) {
    this.state = {
      ...this.state,
      ...obj,
    };
  }

  notify(path: string, value: any) {
    this.listener[path]?.forEach((fn) => fn(value));
  }

  registry(path: string, fn: Function) {
    let set = this.listener[path];
    if (!set) {
      set = new Set();
      this.listener[path] = set;
    }
    set.add(fn);
  }
}
