import type { DatabaseTable } from '@aglint/shared-types';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

export type Menus = 'jobs' | 'requestType';

type Selections = {
  jobs: { id: DatabaseTable['public_jobs']['id']; label: string };
  requestType: { id: DatabaseTable['request']['type']; label: string };
};

type Payloads = {
  jobs: { cursor: number; search: string };
  requestType: { search: string };
};

type SafeSelections<T extends Menus = Menus> = { [id in T]: Selections[id] };

type SafePayload<T extends Menus = Menus> = { [id in T]: Payloads[id] };

type States = {
  open: boolean;
  selections: SafeSelections;
  payloads: SafePayload;
};

type Actions = {
  onOpenChange: (_open: States['open']) => void;
  setJobCursor: (_cursor: States['payloads']['jobs']['cursor']) => void;
  setJobSearch: (_search: States['payloads']['jobs']['search']) => void;
  addJobSelection: (_jobs: States['selections']['jobs']) => void;
  removeJobSelection: () => void;
  setRequestType: (_requestType: States['selections']['requestType']) => void;
  setRequestTypeSearch: (
    _search: States['payloads']['requestType']['search'],
  ) => void;
  resetMenu: (_payload: keyof States['payloads']) => void;
};

export type Store = States & {
  initial: States;
  actions: Actions;
};

const initial = Object.freeze<States>({
  open: false,
  selections: {
    requestType: null,
    jobs: null,
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
        addJobSelection: (jobs) =>
          set((state) => ({ selections: { ...state.selections, jobs } })),
        removeJobSelection: () =>
          set((state) => ({
            selections: { ...state.selections, jobs: initial.selections.jobs },
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
        resetMenu: (payload) => set((state) => resetPayload(payload, state)),
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

const resetPayload = (menu: Menus, state: States): Partial<States> => {
  let response = {
    payloads: structuredClone(initial.payloads),
    selections: structuredClone(initial.selections),
  };
  if (menu === 'requestType') return response;
  if (menu === 'jobs') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
  }
  return response;
};
