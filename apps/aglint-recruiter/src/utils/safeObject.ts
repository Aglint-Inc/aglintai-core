export class SafeObject {
  static keys<T extends Record<string, any>>(o: T): (keyof T)[] {
    return Object.keys(o) as unknown as (keyof T)[];
  }
  static entries<T extends Record<string, any>>(o: T): [keyof T, T[keyof T]][] {
    return Object.entries(o) as unknown as [keyof T, T[keyof T]][];
  }
  static values<T extends Record<string, any>>(o: T): T[keyof T][] {
    return Object.values(o) as unknown as T[keyof T][];
  }
}
