import type { TypeOf, ZodSchema, ZodType } from "zod";

export type ZodInferType<T> =
  T extends Record<any, any>
    ? { [id in keyof T]: ZodInferType<T[id]> } & { _ignore: never }
    : T;

export type ZodInferSchema<T extends ZodType<any, any, any>> = ZodInferType<
  TypeOf<T>
>;

export type RecursivePartial<T> =
  T extends Record<any, any>
    ? Partial<{ [id in keyof T]: RecursivePartial<T[id]> }>
    : T;

export type RecursiveRequired<T> =
  T extends Record<any, any>
    ? Required<{ [id in keyof T]: RecursiveRequired<T[id]> }>
    : T;

export type ZodTypeToSchema<T> = ZodSchema<RecursivePartial<T>>;
