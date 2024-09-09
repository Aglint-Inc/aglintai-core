/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import { type PropsWithChildren, createContext, memo, useState } from 'react';
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

const useIntegrationContext = () => {
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

export const IntegrationContext =
  createContext<ReturnType<typeof useIntegrationContext>>(undefined);

export const IntegrationProvider = memo(({ children }: PropsWithChildren) => {
  const value = useIntegrationContext();
  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
});
IntegrationProvider.displayName = 'IntegrationProvider';
