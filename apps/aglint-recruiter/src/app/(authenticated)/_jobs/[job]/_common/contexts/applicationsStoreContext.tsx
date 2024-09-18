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

import type { Applications } from '../types';

type Locations = ReturnType<typeof nestedObjectToArray>;

type Stages = ReturnType<typeof nestedObjectToArray>;

type Filters = Pick<
  Applications<'input'>,
  'application_match' | 'badges' | 'bookmarked' | 'search' | 'status'
> & {
  locations: Locations;
  stages: Stages;
};

const initialFilter: Filters = Object.freeze({
  badges: [],
  bookmarked: false,
  locations: [],
  application_match: [],
  search: '',
  status: 'new',
  stages: [],
});

type Sort = Pick<Applications<'input'>, 'order' | 'type'>;

const initialSort: Sort = Object.freeze({
  order: 'desc',
  type: 'latest_activity',
});

type Checklist = DatabaseView['application_view']['id'][];

type ActionPopup = DatabaseView['application_view']['status'];

type Misc = {
  actionPopup: ActionPopup;
  checklist: Checklist;
  importPopup: boolean;
};

const initialMisc: Misc = Object.freeze({
  actionPopup: null,
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
  handleBadge: (_badge: Filters['badges'][number]) => void;
  handleBookmarked: () => void;
  handleApplication_match: (
    _resumeMatch: Filters['application_match'][number],
  ) => void;
  handleChecklist: (_id: Misc['checklist'][number]) => void;
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
        handleApplication_match: (application_match) =>
          set((state) => {
            if (state.application_match.includes(application_match))
              return {
                application_match: state.application_match.filter(
                  (b) => b !== application_match,
                ),
              };
            return {
              application_match: [
                ...state.application_match,
                application_match,
              ],
            };
          }),
        setApplication_match: (application_match) =>
          set(() => ({ application_match })),
        resetApplication_match: () =>
          set(() => ({ application_match: get('application_match') })),
        setSearch: (search) => set(() => ({ search })),
        resetSearch: () => set(() => ({ search: get('search') })),
        setStatus: (status) =>
          set(() => ({ status, checklist: get('checklist') })),
        resetStatus: () =>
          set(() => ({ status: get('status'), checklist: get('checklist') })),
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
