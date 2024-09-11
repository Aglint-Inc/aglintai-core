import type { TypeOf, ZodType } from 'zod';

export type ZodInferType<T> =
  T extends Record<any, any>
    ? { [id in keyof T]: ZodInferType<T[id]> } & { _ignore: never }
    : T;

export type ZodInferSchema<T extends ZodType<any, any, any>> = ZodInferType<
  TypeOf<T>
>;
