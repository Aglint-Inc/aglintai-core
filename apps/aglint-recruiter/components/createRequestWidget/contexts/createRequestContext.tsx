import type { DatabaseTable } from '@aglint/shared-types';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

type States = {
  open: boolean;
  selections: {
    requestType: DatabaseTable['request']['type'];
    job: Pick<DatabaseTable['public_jobs'], 'id' | 'job_title'>;
  };
  payloads: {
    requestType: { search: string };
    jobs: { search: string; cursor: number };
  };
};

type Actions = {
  onOpenChange: (_open: States['open']) => void;
  setJobCursor: (_cursor: States['payloads']['jobs']['cursor']) => void;
  setJobSearch: (_search: States['payloads']['jobs']['search']) => void;
  addJobSelection: (_job: States['selections']['job']) => void;
  removeJobSelection: () => void;
  setRequestType: (_requestType: States['selections']['requestType']) => void;
  setRequestTypeSearch: (
    _search: States['payloads']['requestType']['search'],
  ) => void;
};

type Store = States & {
  initial: States;
  actions: Actions;
};

const initial = Object.freeze<States>({
  open: false,
  selections: {
    requestType: null,
    job: null,
  },
  payloads: {
    requestType: { search: '' },
    jobs: {
      search: '',
      cursor: 0,
    },
  },
});

const useCreateRequestContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial,
      open: initial.open,
      payloads: structuredClone(initial.payloads),
      selections: structuredClone(initial.selections),
      actions: {
        onOpenChange: (open) => set(() => ({ open })),
        setJobCursor: (cursor) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              jobs: { ...state.payloads.jobs, cursor },
            },
          })),
        setJobSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              jobs: { ...state.payloads.jobs, search },
            },
          })),
        addJobSelection: (job) =>
          set((state) => ({ selections: { ...state.selections, job } })),
        removeJobSelection: () =>
          set((state) => ({
            selections: { ...state.selections, job: initial.selections.job },
          })),
        setRequestType: (requestType) =>
          set((state) => ({
            selections: { ...state.selections, requestType },
          })),
        setRequestTypeSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              requestType: { ...state.payloads.requestType, search },
            },
          })),
      },
    })),
  );
  return store;
};

export const CreateRequestContext =
  createContext<ReturnType<typeof useCreateRequestContext>>(undefined);

export const CreateRequestProvider = memo((props: PropsWithChildren) => {
  const value = useCreateRequestContext();
  return (
    <CreateRequestContext.Provider value={value}>
      {props.children}
    </CreateRequestContext.Provider>
  );
});
CreateRequestProvider.displayName = 'CreateRequestProvider';
