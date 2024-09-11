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
  // eslint-disable-next-line no-unused-vars
  return function <U>(selector: (state: T) => U) {
    const store = useContext(context);
    if (!store) throw new Error(warning);
    return useStore(store, selector);
  };
}

export type CreateContextStore<T extends Record<string, any>> =
  keyof T extends infer U
    ? U extends string
      ? // eslint-disable-next-line no-unused-vars
        { [_id in U]: T[U] } & {
          // eslint-disable-next-line no-unused-vars
          initial: Readonly<{ [_id in U]: T[U] }>;
          // eslint-disable-next-line no-unused-vars
          actions: { [_id in `set${Capitalize<U>}`]: (x: T[U]) => void } & {
            // eslint-disable-next-line no-unused-vars
            [_id in `reset${Capitalize<U>}`]: () => void;
          };
        }
      : never
    : never;
