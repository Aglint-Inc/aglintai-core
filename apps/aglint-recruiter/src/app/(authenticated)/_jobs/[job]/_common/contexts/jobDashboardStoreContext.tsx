/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import type { DatabaseView } from '@aglint/shared-types';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

type Filters = {
  search: string;
  job: string[];
  tags: DatabaseView['workflow_view']['tags'];
};

type Popup = {
  open: boolean;
};

type Selections = string[];

type States = {
  initial: Readonly<{
    publishing: number;
    filters: Filters;
    popup: Popup;
    selections: Selections;
  }>;
  publishing: number;
  filters: Filters;
  popup: Popup;
  selections: Selections;
  actions: {
    // eslint-disable-next-line no-unused-vars
    setPublishing: (publishing: number) => void;
    // eslint-disable-next-line no-unused-vars
    resetPublishing: () => void;
    // eslint-disable-next-line no-unused-vars
    setFilters: (filters: Partial<Filters>) => void;
    // eslint-disable-next-line no-unused-vars
    resetFilters: () => void;
    // eslint-disable-next-line no-unused-vars
    setPopup: (popup: Partial<Popup>) => void;
    // eslint-disable-next-line no-unused-vars
    resetPopup: () => void;
    // eslint-disable-next-line no-unused-vars
    setSelections: (selections: Selections) => void;
    // eslint-disable-next-line no-unused-vars
    resetSelections: () => void;
  };
};

const useJobDashboardStoreContext = () => {
  const [store] = useState(
    createStore<States>((set) => ({
      initial: Object.freeze({
        publishing: 0,
        filters: {
          search: '',
          job: [],
          tags: [],
        },
        popup: {
          open: false,
        },
        selections: [],
      }),
      publishing: 0,
      filters: {
        search: '',
        job: [],
        tags: [],
      },
      popup: {
        open: false,
      },
      selections: [],
      actions: {
        setPublishing: (publishing) => set(() => ({ publishing })),
        resetPublishing: () => set(() => ({ publishing: 0 })),
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
            },
          }),
        setSelections: (selections) =>
          set(() => ({
            selections: structuredClone(selections),
          })),
        resetSelections: () => set({ selections: [] }),
      },
    })),
  );
  return store;
};

export const JobDashboardStoreContext =
  createContext<ReturnType<typeof useJobDashboardStoreContext>>(undefined);

export const JobDashboardStoreProvider = memo(
  ({ children }: PropsWithChildren) => {
    const value = useJobDashboardStoreContext();
    return (
      <JobDashboardStoreContext.Provider value={value}>
        {children}
      </JobDashboardStoreContext.Provider>
    );
  },
);
JobDashboardStoreProvider.displayName = 'JobDashboardStoreProvider';
