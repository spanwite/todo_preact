export type NestedArray<T> = Array<T | NestedArray<T>>;

type ClassName = string;

type ClassPrimitive = string | null | undefined | boolean;
type ClassValue = ClassPrimitive | Record<ClassName, ClassPrimitive>;

export type ClassInput = ClassValue | NestedArray<ClassValue>;

export function mergeClasses(...inputs: ClassInput[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      classes.push(mergeClasses(...input));
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (!input[key]) continue;
        classes.push(key);
      }
    }
  }
  return classes.join(' ');
}
