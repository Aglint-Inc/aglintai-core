import type { DatabaseTable } from '@aglint/shared-types';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

export type Menus = 'jobs' | 'requestType';

export const STEPS: Readonly<Menus[]> = Object.freeze(['requestType', 'jobs']);

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
  step: number;
  selections: SafeSelections;
  payloads: SafePayload;
};

type Actions = {
  onOpenChange: (_open: States['open']) => void;
  previousPage: () => void;
  nextPage: () => void;
  setJobCursor: (_cursor: States['payloads']['jobs']['cursor']) => void;
  setJobSearch: (_search: States['payloads']['jobs']['search']) => void;
  selectJob: (_jobs: States['selections']['jobs']) => void;
  selectRequestType: (
    _requestType: States['selections']['requestType'],
  ) => void;
  setRequestTypeSearch: (
    _search: States['payloads']['requestType']['search'],
  ) => void;
  resetSelection: (_payload: keyof States['payloads']) => void;
};

export type Store = States & {
  initial: States;
  actions: Actions;
};

const initial = Object.freeze<States>({
  open: false,
  step: STEPS.findIndex((step) => step === 'requestType'),
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
      step: initial.step,
      payloads: structuredClone(initial.payloads),
      selections: structuredClone(initial.selections),
      actions: {
        onOpenChange: (open) => set(() => ({ open })),
        previousPage: () =>
          set((state) => ({
            step: state.step !== 0 ? state.step - 1 : state.step,
          })),
        nextPage: () =>
          set((state) => ({
            step: state.step !== STEPS.length - 1 ? state.step + 1 : state.step,
          })),
        setRequestTypeSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              requestType: { ...state.payloads.requestType, search },
            },
          })),
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
        selectRequestType: (requestType) =>
          set((state) => {
            const newPayload = resetPayload('requestType', state);
            return {
              ...newPayload,
              selections: { ...newPayload.selections, requestType },
              step: newPayload.step + 1,
            };
          }),
        selectJob: (jobs) =>
          set((state) => {
            const newPayload = resetPayload('jobs', state);
            return {
              ...newPayload,
              selections: { ...newPayload.selections, jobs },
              step: newPayload.step + 1,
            };
          }),
        resetSelection: (payload) =>
          set((state) => resetPayload(payload, state)),
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
    step: initial.step,
  };
  if (menu === 'requestType') return response;
  if (menu === 'jobs') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
    response.step = STEPS.findIndex((step) => step === 'jobs');
  }
  return response;
};
