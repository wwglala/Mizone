import { Validator } from "@mizone/utils";

interface FormControllerProps {
  initValues?: Record<string, any>;
}

export class FormController {
  private state: Record<string, any>;
  private listener: Record<string, Set<Function>>;
  private onChangeListener: Set<Function> = new Set();
  private strategy: Validator;
  constructor(props: FormControllerProps = {}) {
    const { initValues } = props;
    this.state = {
      ...initValues,
    };

    this.listener = {};
    this.strategy = new Validator();
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
    this.onChangeListener.forEach((fn) => fn(path, value, this.state));
  }

  setValues(obj: Record<string, any>) {
    Object.entries(obj).forEach(([key, value]) => {
      this.setValue(key, value);
    });
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
  onChange(effect: Function) {
    this.onChangeListener.add(effect);
  }

  addRule(name: string, rule: Function, message: string) {
    this.strategy.add(name, rule, message);
  }

  validator(names?: string[]) {
    return this.strategy.valida(this.state, names);
  }
}
