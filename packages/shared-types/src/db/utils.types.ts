export type Custom<
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
  ? Record<any, any>[]
  : Record<any, any>;

export type Type<
  T extends CustomizableTypes<"Array"> | CustomizableTypes<"Object">,
  U extends T extends CustomizableTypes<"Array">
    ? Partial<{ [id in keyof T[number]]: any }>
    : Partial<{ [id in keyof T]: any }>,
> =
  T extends CustomizableTypes<"Array">
    ? (Omit<T[number], keyof U> &
        Required<Pick<U, Extract<keyof RequiredOnly<T[number]>, keyof U>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T[number]>, keyof U>>>)[]
    : Omit<T, keyof U> &
        Required<Pick<U, Extract<keyof RequiredOnly<T>, keyof U>>> &
        Partial<Pick<U, Extract<keyof PartialOnly<T>, keyof U>>>;

export type RequiredOnly<T extends CustomizableTypes<"Object">> = Pick<
  T,
  {
    [id in keyof T]-?: undefined extends T[id] ? never : id;
  }[keyof T]
>;

export type PartialOnly<T extends CustomizableTypes<"Object">> = Omit<
  T,
  keyof RequiredOnly<T>
>;
