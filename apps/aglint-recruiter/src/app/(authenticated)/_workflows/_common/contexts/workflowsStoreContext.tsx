/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import type { DatabaseView } from '@aglint/shared-types';
import { type PropsWithChildren, createContext, memo, useState } from 'react';
import { createStore } from 'zustand';
import { INITIAL_FORM } from '@/workflows/constants';

type Filters = {
  search: string;
  job: string[];
  tags: DatabaseView['workflow_view']['tags'];
};

type Inputs = Pick<
  DatabaseView['workflow_view'],
  'title' | 'auto_connect' | 'description'
>;

type Form<T extends keyof Inputs = keyof Inputs> = {
  [id in T]: {
    value: Inputs[id];
    error: boolean;
    helperText: string;
    required: boolean;
    // eslint-disable-next-line no-unused-vars
    validation: (value: Inputs[id]) => boolean;
  };
};

type Popup = {
  open: boolean;
  form: Form;
};

type Deletion = {
  open: boolean;
  workflow: Pick<DatabaseView['workflow_view'], 'id' | 'jobs'>;
};

type States = {
  initial: Readonly<{
    filters: Filters;
    popup: Popup;
    actionsLoad: boolean;
    deletion: Deletion;
  }>;
  filters: Filters;
  popup: Popup;
  actionsLoad: boolean;
  deletion: Deletion;
  actions: {
    // eslint-disable-next-line no-unused-vars
    setFilters: (filters: Partial<Filters>) => void;
    resetFilters: () => void;
    // eslint-disable-next-line no-unused-vars
    setPopup: (popup: Partial<Popup>) => void;
    resetPopup: () => void;
    // eslint-disable-next-line no-unused-vars
    closePopup: (inputs?: Inputs) => void;
    // eslint-disable-next-line no-unused-vars
    setActionsLoad: (actionsLoad: boolean) => void;
    resetActionsLoad: () => void;
    // eslint-disable-next-line no-unused-vars
    setDeletion: (deletion: Deletion) => void;
    closeDeletion: () => void;
  };
};

const getForms = (inputs: Inputs) => {
  return Object.assign(
    {},
    ...Object.entries(inputs).map(([key, value]) => ({
      [key]: { ...INITIAL_FORM[key], value },
    })),
  );
};

const useWorkflowsStoreContext = () => {
  const [store] = useState(
    createStore<States>((set) => ({
      initial: Object.freeze({
        filters: {
          search: '',
          job: [],
          tags: [],
        },
        popup: {
          open: false,
          form: INITIAL_FORM,
        },
        actionsLoad: false,
        deletion: {
          open: false,
          workflow: null,
        },
      }),
      filters: {
        search: '',
        job: [],
        tags: [],
      },
      popup: {
        open: false,
        form: INITIAL_FORM,
      },
      actionsLoad: false,
      deletion: {
        open: false,
        workflow: null,
      },
      actions: {
        setFilters: (filters) =>
          set((state) => ({
            filters: { ...state.filters, ...filters },
          })),
        resetFilters: () =>
          set({
            filters: {
              search: '',
              job: [],
              tags: [],
            },
          }),
        setPopup: (popup) =>
          set((state) => ({
            popup: { ...state.popup, ...popup },
          })),
        resetPopup: () =>
          set({
            popup: {
              open: false,
              form: INITIAL_FORM,
            },
          }),
        closePopup: (inputs) => {
          set((state) => ({
            popup: { ...state.popup, open: false },
          }));
          setTimeout(
            () =>
              set((state) => ({
                popup: {
                  ...state.popup,
                  form: inputs ? getForms(inputs) : { ...INITIAL_FORM },
                },
              })),
            1000,
          );
        },
        setActionsLoad: (actionsLoad) =>
          set({
            actionsLoad,
          }),
        resetActionsLoad: () => set({ actionsLoad: false }),
        setDeletion: (deletion) => set({ deletion }),
        closeDeletion: () => {
          set((state) => ({ deletion: { ...state.deletion, open: false } }));
          setTimeout(
            () =>
              set((state) => ({
                deletion: { ...state.deletion, workflow: null },
              })),
            400,
          );
        },
      },
    })),
  );
  return store;
};

export const WorkflowsStoreContext =
  createContext<ReturnType<typeof useWorkflowsStoreContext>>(undefined);

export const WorkflowsStoreProvider = memo(
  ({ children }: PropsWithChildren) => {
    const value = useWorkflowsStoreContext();
    return (
      <WorkflowsStoreContext.Provider value={value}>
        {children}
      </WorkflowsStoreContext.Provider>
    );
  },
);
WorkflowsStoreProvider.displayName = 'WorkflowsStoreProvider';
