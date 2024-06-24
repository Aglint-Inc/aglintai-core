export type Type<
  T extends Record<any, any>[] | Record<any, any>,
  U extends T extends Record<any, any>[]
    ? Partial<{ [id in keyof T[number]]: any }>
    : T extends Record<any, any>
      ? Partial<{ [id in keyof T]: any }>
      : never,
> = T extends Record<any, any>[]
  ? (Omit<T[number], keyof U> & U)[]
  : T extends Record<any, any>
    ? Omit<T, keyof U> & U
    : U;

export type CustomizableTypes<T extends "Array" | "Object"> = T extends "Array"
  ? Record<string, any>[]
  : Record<string, any>;
