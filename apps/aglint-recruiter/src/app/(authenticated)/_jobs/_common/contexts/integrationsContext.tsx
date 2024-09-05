/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */

import { type PropsWithChildren, createContext, useState } from 'react';
import { createStore } from 'zustand';

const STATE_LEVER_DIALOG = {
  INITIAL: 'INITIAL',
  FETCHING: 'FETCHING',
  API: 'API',
  LISTJOBS: 'LISTJOBS',
  IMPORTING: 'IMPORTING',
  ERROR: 'ERROR',
};

const STATE_GREENHOUSE_DIALOG = {
  INITIAL: 'INITIAL',
  FETCHING: 'FETCHING',
  API: 'API',
  LISTJOBS: 'LISTJOBS',
  IMPORTING: 'IMPORTING',
  ERROR: 'ERROR',
};

const STATE_ASHBY_DIALOG = {
  INITIAL: 'INITIAL',
  FETCHING: 'FETCHING',
  API: 'API',
  LISTJOBS: 'LISTJOBS',
  IMPORTING: 'IMPORTING',
  ERROR: 'ERROR',
};

const initialState = {
  lever: { open: false, step: STATE_LEVER_DIALOG.INITIAL },
  greenhouse: { open: false, step: STATE_GREENHOUSE_DIALOG.INITIAL },
  ashby: { open: false, step: STATE_ASHBY_DIALOG.INITIAL },
};

type Integrations = typeof initialState;

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
      intialIntegrations: initialState,
      integrations: initialState,
      actions: {
        setIntegration: (integrations) =>
          set((state) => ({
            integrations: { ...state.integrations, ...integrations },
          })),
        handleClose: () => set(() => ({ integrations: initialState })),
      },
    })),
  );
  return store;
};

export const IntegrationContext =
  createContext<ReturnType<typeof useIntegrationContext>>(undefined);

export const IntegrationProvider = ({ children }: PropsWithChildren) => {
  const value = useIntegrationContext();
  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
};
