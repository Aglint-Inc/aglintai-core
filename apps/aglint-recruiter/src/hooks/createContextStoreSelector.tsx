import { type Context, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
/**
 *
 * A type safe hook creator for React Context + Zustand Store stage management solution
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 * Create separte custom hooks for states and one hook for all events/setters
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */
export function createContextStoreSelector<T>(
  context: Context<StoreApi<T>>,
  warning = 'The context provider for this hook was not found',
) {
  return function <U = T>(
    selector: ((_state: T) => U) | undefined = (state) => state as any as U,
  ) {
    const store = useContext(context);
    if (!store) throw new Error(warning);
    return useStore(store, selector);
  };
}

export type CreateContextStore<
  T extends Record<string, any>,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-object-type
  ExtraActions extends { [_x in string]: (..._args: any[]) => any } = {},
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  ExtraInitial extends Readonly<Record<string, any>> = Readonly<{}>,
> = keyof T extends infer U
  ? U extends string
    ? // eslint-disable-next-line no-unused-vars
      UnionToIntersection<
        T & {
          // eslint-disable-next-line no-unused-vars
          initial: Readonly<T> & ExtraInitial;
          // eslint-disable-next-line no-unused-vars
          actions: UnionToIntersection<CreateContextStoreActions<T>> &
            ExtraActions;
        }
      >
    : never
  : never;

type CreateContextStoreActions<T extends Record<string, any>> =
  keyof T extends infer U
    ? U extends string
      ? // eslint-disable-next-line no-unused-vars
        { [_id in `set${Capitalize<U>}`]: (_x: Partial<T[U]>) => void } & {
          // eslint-disable-next-line no-unused-vars
          [_id in `reset${Capitalize<U>}`]: () => void;
        }
      : never
    : never;

type UnionToIntersection<U> = (
  U extends any ? (_arg: U) => void : never
) extends (_arg: infer I) => void
  ? I
  : never;
