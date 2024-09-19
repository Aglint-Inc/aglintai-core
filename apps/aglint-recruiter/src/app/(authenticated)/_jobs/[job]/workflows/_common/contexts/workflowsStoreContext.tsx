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

import {
  type CreateContextStore,
  getContextIntials,
} from '@/utils/zustandContextHelpers';

type Selections = string[];

type States = {
  search: string;
  job: string[];
  tags: DatabaseView['workflow_view']['tags'];
  open: boolean;
  selections: Selections;
};

const initial: States = Object.freeze({
  search: '',
  job: [],
  tags: [],
  open: false,
  selections: [],
});

const getInitial = getContextIntials(initial);

type ExtraActions = {
  handleJob: (_job: States['job'][number]) => void;
  handleTags: (_tag: States['tags'][number]) => void;
  handleOpen: () => void;
  handleSelections: (_selection: States['selections'][number]) => void;
  resetAll: () => void;
};

type Store = CreateContextStore<States, ExtraActions>;

const useWorkflowsStore = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial,
      ...getInitial(),
      actions: {
        setSearch: (search) => set(() => ({ search })),
        resetSearch: () => set(() => ({ search: getInitial('search') })),
        handleJob: (job) =>
          set((state) => {
            if (state.job.includes(job))
              return { job: state.job.filter((j) => j !== job) };
            return { job: [...state.job, job] };
          }),
        setJob: (job) => set(() => ({ job })),
        resetJob: () => set(() => ({ job: getInitial('job') })),
        handleTags: (tag) =>
          set((state) => {
            if (state.tags.includes(tag))
              return { tags: state.tags.filter((t) => t !== tag) };
            return { tags: [...state.tags, tag] };
          }),
        setTags: (tags) => set(() => ({ tags })),
        resetTags: () => set(() => ({ tags: getInitial('tags') })),
        handleOpen: () => set((state) => ({ open: !state.open })),
        setOpen: (open) => set(() => ({ open })),
        resetOpen: () => set(() => ({ open: getInitial('open') })),
        handleSelections: (selection) =>
          set((state) => {
            if (state.selections.includes(selection))
              return {
                selections: state.selections.filter((t) => t !== selection),
              };
            return { selections: [...state.selections, selection] };
          }),
        setSelections: (selections) =>
          set(() => ({
            selections,
          })),
        resetSelections: () => set({ selections: getInitial('selections') }),
        resetAll: () => set({ ...getInitial() }),
      },
    })),
  );
  return store;
};

export const WorkflowsStoreContext =
  createContext<ReturnType<typeof useWorkflowsStore>>(undefined);

export const WorkflowsStoreProvider = memo(
  ({ children }: PropsWithChildren) => {
    const value = useWorkflowsStore();
    return (
      <WorkflowsStoreContext.Provider value={value}>
        {children}
      </WorkflowsStoreContext.Provider>
    );
  },
);
WorkflowsStoreProvider.displayName = 'WorkflowsStoreProvider';
