import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

import { STEPS } from '../constants';
import type { Menus } from '../types';

type Selections = {
  requestType: { id: DatabaseTable['request']['type']; label: string };
  jobs: { id: DatabaseTable['public_jobs']['id']; label: string };
  candidate: { id: DatabaseTable['applications']['id']; label: string };
  schedules: { id: DatabaseTable['interview_session']['id']; label: string }[];
  assignees: { id: DatabaseTable['recruiter_user']['user_id']; label: string };
};

type Payloads = {
  requestType: { search: string };
  jobs: { cursor: number; search: string };
  candidate: { cursor: number; search: string };
  schedules: { cursor: number; search: string };
  assignees: { cursor: number; search: string };
};

type PayloadMenus = Exclude<Menus, 'final'>;

type SafeSelections<T extends PayloadMenus = PayloadMenus> = {
  [id in T]: Selections[id];
};

type SafePayload<T extends PayloadMenus = PayloadMenus> = {
  [id in T]: Payloads[id];
};

type States = {
  open: boolean;
  step: number;
  dates: {
    start_date: string;
    end_date: string;
  };
  note: string;
  priority: DatabaseTable['request']['priority'];
  selections: SafeSelections;
  payloads: SafePayload;
  error: string | null;
};

type Actions = {
  onOpenChange: (_open: States['open']) => void;
  previousPage: () => void;
  nextPage: () => void;
  setRequestTypeSearch: (
    _search: States['payloads']['requestType']['search'],
  ) => void;
  selectRequestType: (
    _requestType: States['selections']['requestType'],
  ) => void;
  setJobSearch: (_search: States['payloads']['jobs']['search']) => void;
  selectJob: (_jobs: States['selections']['jobs']) => void;
  setCandidateSearch: (
    _search: States['payloads']['candidate']['search'],
  ) => void;
  selectCandidate: (_candidate: States['selections']['candidate']) => void;
  setScheduleSearch: (
    _search: States['payloads']['schedules']['search'],
  ) => void;
  selectSchedule: (
    _schedules: States['selections']['schedules'][number],
  ) => void;
  setAssigneeSearch: (
    _search: States['payloads']['assignees']['search'],
  ) => void;
  selectAssignee: (_assignees: States['selections']['assignees']) => void;
  resetSelection: (_payload: keyof States['payloads']) => void;
  setDates: (_dates: States['dates']) => void;
  setNote: (_note: States['note']) => void;
  setPriority: (_priority: States['priority']) => void;
  setError: (_error: string | null) => void;
  resetError: () => void;
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
    candidate: null,
    schedules: [],
    assignees: null,
  },
  payloads: {
    requestType: { search: '' },
    jobs: {
      search: '',
      cursor: 0,
    },
    candidate: {
      search: '',
      cursor: 0,
    },
    schedules: {
      search: '',
      cursor: 0,
    },
    assignees: {
      search: '',
      cursor: 0,
    },
  },
  dates: {
    start_date: dayjsLocal().toISOString(),
    end_date: dayjsLocal().add(7, 'day').toISOString(),
  },
  note: '',
  priority: 'standard',
  error: null,
});

const useCreateRequestContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial,
      open: initial.open,
      step: initial.step,
      dates: structuredClone(initial.dates),
      note: initial.note,
      priority: initial.priority,
      payloads: structuredClone(initial.payloads),
      selections: structuredClone(initial.selections),
      error: initial.error,
      actions: {
        onOpenChange: (open) =>
          set((state) => {
            if (open === true) return { open };
            return { open, ...resetPayload('requestType', state), error: null };
          }),
        previousPage: () =>
          set((state) => ({
            step: state.step !== 0 ? state.step - 1 : state.step,
            error: null,
          })),
        nextPage: () =>
          set((state) => ({
            step: state.step !== STEPS.length ? state.step + 1 : state.step,
            error: null,
          })),
        setRequestTypeSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              requestType: { ...state.payloads.requestType, search },
              error: null,
            },
          })),
        selectRequestType: (requestType) =>
          set((state) => {
            const newPayload = resetPayload('requestType', state);
            return {
              ...newPayload,
              selections: { ...newPayload.selections, requestType },
              step: newPayload.step + 1,
              error: null,
            };
          }),
        setJobSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              jobs: { ...state.payloads.jobs, search },
              error: null,
            },
          })),
        selectJob: (jobs) =>
          set((state) => {
            const newPayload = resetPayload('jobs', state);
            return {
              ...newPayload,
              selections: { ...newPayload.selections, jobs },
              step: newPayload.step + 1,
              error: null,
            };
          }),
        setCandidateSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              candidate: { ...state.payloads.candidate, search },
              error: null,
            },
          })),
        selectCandidate: (candidate) =>
          set((state) => {
            const newPayload = resetPayload('candidate', state);
            return {
              ...newPayload,
              selections: { ...newPayload.selections, candidate },
              step: newPayload.step + 1,
              error: null,
            };
          }),
        setScheduleSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              schedules: { ...state.payloads.schedules, search },
              error: null,
            },
          })),
        selectSchedule: (schedule) =>
          set((state) => {
            if (state.selections.schedules.find(({ id }) => id === schedule.id))
              return { ...state, error: null };
            const newPayload = resetPayload('schedules', state);
            return {
              ...newPayload,
              selections: {
                ...newPayload.selections,
                schedules: [...state.selections.schedules, schedule],
              },
              error: null,
            };
          }),
        setAssigneeSearch: (search) =>
          set((state) => ({
            payloads: {
              ...state.payloads,
              assignees: { ...state.payloads.assignees, search },
              error: null,
            },
          })),
        selectAssignee: (assignees) =>
          set((state) => {
            const newPayload = resetPayload('assignees', state);
            return {
              ...newPayload,
              selections: {
                ...newPayload.selections,
                assignees,
              },
              step: newPayload.step + 1,
              error: null,
            };
          }),
        setDates: (dates) => set(() => ({ dates, error: null })),
        setNote: (note) => set(() => ({ note, error: null })),
        setPriority: (priority) => set(() => ({ priority, error: null })),
        resetSelection: (payload) =>
          set((state) => ({ ...resetPayload(payload, state), error: null })),
        setError: (error) => set(() => ({ error })),
        resetError: () => set(() => ({ error: null })),
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

const resetPayload = (menu: PayloadMenus, state: States): Partial<States> => {
  const response = {
    payloads: structuredClone(initial.payloads),
    selections: structuredClone(initial.selections),
    step: initial.step,
    dates: structuredClone(initial.dates),
    note: initial.note,
  };
  if (menu === 'requestType') return response;
  if (menu === 'jobs') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
    response.step = STEPS.findIndex((step) => step === 'jobs');
  }
  if (menu === 'candidate') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
    response.payloads.jobs = state.payloads.jobs;
    response.selections.jobs = state.selections.jobs;
    response.step = STEPS.findIndex((step) => step === 'candidate');
  }
  if (menu === 'schedules') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
    response.payloads.jobs = state.payloads.jobs;
    response.selections.jobs = state.selections.jobs;
    response.payloads.candidate = state.payloads.candidate;
    response.selections.candidate = state.selections.candidate;
    response.step = STEPS.findIndex((step) => step === 'schedules');
  }
  if (menu === 'assignees') {
    response.payloads.requestType = state.payloads.requestType;
    response.selections.requestType = state.selections.requestType;
    response.payloads.jobs = state.payloads.jobs;
    response.selections.jobs = state.selections.jobs;
    response.payloads.candidate = state.payloads.candidate;
    response.selections.candidate = state.selections.candidate;
    response.payloads.schedules = state.payloads.schedules;
    response.selections.schedules = state.selections.schedules;
    response.step = STEPS.findIndex((step) => step === 'assignees');
  }
  return response;
};
