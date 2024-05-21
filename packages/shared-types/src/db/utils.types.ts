export type Type<T, U extends Partial<{ [id in keyof T]: any }>> = Omit<
  T,
  keyof U
> &
  U;
