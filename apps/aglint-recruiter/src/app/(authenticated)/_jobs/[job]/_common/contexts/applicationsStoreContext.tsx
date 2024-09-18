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

import type { nestedObjectToArray } from '@/components/Common/FilterHeader/filters/utils';
import {
  type CreateContextStore,
  getContextStoreInitial,
} from '@/utils/zustandContextHelpers';

type Application = DatabaseView['application_view'];

type Locations = ReturnType<typeof nestedObjectToArray>;

type Stages = ReturnType<typeof nestedObjectToArray>;

type Checklist = Application['id'][];

type ActionPopup = Application['status'];

type Filters = {
  badges: (keyof Application['badges'])[];
  bookmarked: boolean;
  locations: Locations;
  resumeMatch: Application['application_match'][];
  search: Application['name'];
  section: Application['status'];
  stages: Stages;
};

const initialFilter: Filters = Object.freeze({
  badges: [],
  bookmarked: false,
  locations: [],
  resumeMatch: [],
  search: '',
  section: 'new',
  stages: [],
});

type Sort = {
  order: 'asc' | 'desc';
  type:
    | keyof Pick<Application, 'applied_at' | 'name' | 'latest_activity'>
    | 'location'
    | 'resume_match';
};

const initialSort: Sort = Object.freeze({
  order: 'desc',
  type: 'latest_activity',
});

type Misc = {
  actionPopup: ActionPopup;
  checklist: Checklist;
  importPopup: boolean;
};

const initialMisc: Misc = Object.freeze({
  actionPopup: 'new',
  checklist: [],
  importPopup: false,
});

type States = Filters & Sort & Misc;

const initial: States = Object.freeze({
  ...initialFilter,
  ...initialSort,
  ...initialMisc,
});

const get = getContextStoreInitial(initial);

type Actions = {
  handleBadge: (badge: Filters['badges'][number]) => void;
  handleBookmarked: () => void;
  handleResumeMatch: (resumeMatch: Filters['resumeMatch'][number]) => void;
  handleChecklist: (id: Misc['checklist'][number]) => void;
  handleImportPopup: () => void;
};

type Store = CreateContextStore<States, Actions>;

const useApplicationsStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial,
      ...get(),
      actions: {
        handleBadge: (badge) =>
          set((state) => {
            if (state.badges.includes(badge))
              return {
                badges: state.badges.filter((b) => b !== badge),
              };
            return {
              badges: [...state.badges, badge],
            };
          }),
        setBadges: (badges) => set(() => ({ badges })),
        resetBadges: () => set(() => ({ badges: get('badges') })),
        handleBookmarked: () =>
          set((state) => ({ bookmarked: !state.bookmarked })),
        setBookmarked: (bookmarked) => set(() => ({ bookmarked })),
        resetBookmarked: () => set(() => ({ bookmarked: get('bookmarked') })),
        setLocations: (locations) => set(() => ({ locations })),
        resetLocations: () => set(() => ({ locations: get('locations') })),
        handleResumeMatch: (resumeMatch) =>
          set((state) => {
            if (state.resumeMatch.includes(resumeMatch))
              return {
                resumeMatch: state.resumeMatch.filter((b) => b !== resumeMatch),
              };
            return {
              resumeMatch: [...state.resumeMatch, resumeMatch],
            };
          }),
        setResumeMatch: (resumeMatch) => set(() => ({ resumeMatch })),
        resetResumeMatch: () =>
          set(() => ({ resumeMatch: get('resumeMatch') })),
        setSearch: (search) => set(() => ({ search })),
        resetSearch: () => set(() => ({ search: get('search') })),
        setSection: (section) => set(() => ({ section })),
        resetSection: () => set(() => ({ section: get('section') })),
        setStages: (stages) => set(() => ({ stages })),
        resetStages: () => set(() => ({ stages: get('stages') })),
        setOrder: (order) => set(() => ({ order })),
        resetOrder: () => set(() => ({ order: get('order') })),
        setType: (type) => set(() => ({ type })),
        resetType: () => set(() => ({ type: get('type') })),
        setActionPopup: (actionPopup) => set(() => ({ actionPopup })),
        resetActionPopup: () =>
          set(() => ({ actionPopup: get('actionPopup') })),
        handleChecklist: (id) =>
          set((state) => {
            if (state.checklist.includes(id))
              return {
                checklist: state.checklist.filter((b) => b !== id),
              };
            return {
              checklist: [...state.checklist, id],
            };
          }),
        setChecklist: (checklist) => set(() => ({ checklist })),
        resetChecklist: () => set(() => ({ checklist: get('checklist') })),
        handleImportPopup: () =>
          set((state) => ({ importPopup: !state.importPopup })),
        setImportPopup: (importPopup) => set(() => ({ importPopup })),
        resetImportPopup: () =>
          set(() => ({ importPopup: get('importPopup') })),
      },
    })),
  );
  return store;
};

export const ApplicationsStoreContext =
  createContext<ReturnType<typeof useApplicationsStoreContext>>(undefined);

export const ApplicationsStoreProvider = memo(
  ({ children }: PropsWithChildren) => {
    const value = useApplicationsStoreContext();
    return (
      <ApplicationsStoreContext.Provider value={value}>
        {children}
      </ApplicationsStoreContext.Provider>
    );
  },
);
ApplicationsStoreProvider.displayName = 'ApplicationsStoreProvider';
