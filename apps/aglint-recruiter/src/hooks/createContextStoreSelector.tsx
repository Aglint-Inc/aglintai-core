import { type Context, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

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
