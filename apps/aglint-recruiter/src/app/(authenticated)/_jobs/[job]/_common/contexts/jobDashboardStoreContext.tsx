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

import type { CreateContextStore } from '@/utils/zustandContextHelpers';

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
  publishing: number;
  filters: Filters;
  popup: Popup;
  selections: Selections;
};

type Store = CreateContextStore<States>;

const useJobDashboardStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
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
