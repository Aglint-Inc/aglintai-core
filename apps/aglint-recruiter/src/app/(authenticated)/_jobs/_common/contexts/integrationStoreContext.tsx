/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

import type { CreateContextStore } from '@/utils/zustandContextHelpers';
import { INITIAL_STATE } from '@/jobs/constants';

type Integrations = typeof INITIAL_STATE;

type State = {
  integrations: Integrations;
};

type Store = CreateContextStore<State>;

const useIntegrationStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial: {
        integrations: INITIAL_STATE,
      },
      integrations: structuredClone(INITIAL_STATE),
      actions: {
        setIntegrations: (integrations) =>
          set((state) => ({
            integrations: { ...state.integrations, ...integrations },
          })),
        resetIntegrations: () => set(() => ({ integrations: INITIAL_STATE })),
      },
    })),
  );
  return store;
};

export const IntegrationStoreContext =
  createContext<ReturnType<typeof useIntegrationStoreContext>>(undefined);

export const IntegrationStoreProvider = memo(
  ({ children }: PropsWithChildren) => {
    const value = useIntegrationStoreContext();
    return (
      <IntegrationStoreContext.Provider value={value}>
        {children}
      </IntegrationStoreContext.Provider>
    );
  },
);
IntegrationStoreProvider.displayName = 'IntegrationStoreProvider';
