import { type Context, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';
/**
 *
 * A type safe hook creator for React Context + Zustand Store stage management solution
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 *  To access states/getter
 *  - Use a sole state selector hook.
 *  - Ex: const example = useExampleStore((state)=>state.example);
 *  - Create individual state selector hooks for each state.
 *  - Ex: const useExample = () => useExampleStore((state)=>state.example);
 *
 *  To access actions/setters
 *  - Use a sole state selector hook
 *  - Ex: const { setExample } = useExampleActions((state)=>state.actions);
 *  - Use a sole action hook
 *  - Ex: const useSetExample = () => useExampleStore((state)=>state.actions.setExample);
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

/**
 *   A type safe "initial" state selector
 *   Returns a get function
 *   - Passing a key arguement returns a structured clone of the value associated with the key
 *   - Passing no arguements returns the structured clone of the entire initial state
 */
export const getContextStoreInitial = <T extends Readonly<Record<any, any>>>(
  state: T,
) => {
  function get(): T;
  function get<U extends keyof T>(_key: U): T[U];
  function get<U extends keyof T>(key?: U) {
    if (key) return structuredClone(state[key]);
    return structuredClone(state);
  }
  return get;
};

/**
 *   A type safe store creator type:
 *
 *   Passing a state type will return
 *   - All the neccesary state types
 *   - An "initial" state type
 *   - An "actions" state type necessary "setState" and "resetState" actions
 *
 *  Additional actions can be passed as the second parameter to this type
 *  Additional initial states can be passed as the thrid parameter to this type
 */
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
