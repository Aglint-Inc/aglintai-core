/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

import { INITIAL_STATE } from '@/jobs/constants';

type Integrations = typeof INITIAL_STATE;

type Store = {
  intialIntegrations: Integrations;
  integrations: Integrations;
  actions: {
    // eslint-disable-next-line no-unused-vars
    setIntegration: (integrations: Partial<Integrations>) => void;
    handleClose: () => void;
  };
};

const useIntegrationStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      intialIntegrations: INITIAL_STATE,
      integrations: INITIAL_STATE,
      actions: {
        setIntegration: (integrations) =>
          set((state) => ({
            integrations: { ...state.integrations, ...integrations },
          })),
        handleClose: () => set(() => ({ integrations: INITIAL_STATE })),
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
