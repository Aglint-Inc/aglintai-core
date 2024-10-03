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
import { SafeObject } from '@/utils/safeObject';
import {
  type CreateContextStore,
  getContextComputes,
  getContextIntials,
} from '@/utils/zustandContextHelpers';

import { CASCADE_VISIBILITIES, EMAIL_VISIBILITIES } from '../constants';
import type { Applications } from '../types';

type Locations = ReturnType<typeof nestedObjectToArray>;

type Stages = ReturnType<typeof nestedObjectToArray>;

type Checklist = string[];

type ActionPopup = DatabaseView['application_view']['status'];

type States = Pick<
  Applications<'input'>,
  | 'application_match'
  | 'badges'
  | 'bookmarked'
  | 'search'
  | 'status'
  | 'order'
  | 'type'
> & {
  locations: Locations;
  stages: Stages;
  actionPopup: ActionPopup | null;
  checklist: Checklist;
  importPopup: boolean;
};

const initial: States = {
  badges: [],
  bookmarked: false,
  locations: [],
  application_match: [],
  search: '',
  status: 'new',
  stages: [],
  order: 'desc',
  type: 'latest_activity',
  actionPopup: null,
  checklist: [],
  importPopup: false,
} as const;

const getInitial = getContextIntials(initial);

const getComputed = getContextComputes<States>()((get, compute) => ({
  emailVisibilities: compute(
    () => [get().status],
    (status) =>
      SafeObject.entries(EMAIL_VISIBILITIES).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(status);
          return acc;
        },
        {} as { [_id in keyof typeof EMAIL_VISIBILITIES]: boolean },
      ),
  ),
  cascadeVisibilites: compute(
    () => [get().status],
    (status) =>
      SafeObject.entries(CASCADE_VISIBILITIES).reduce(
        (acc, [key, value]) => {
          acc[key] = value.includes(status);
          return acc;
        },
        {} as { [_id in keyof typeof CASCADE_VISIBILITIES]: boolean },
      ),
  ),
}));

type ExtraActions = {
  handleBadge: (_badge: States['badges'][number]) => void;
  handleBookmarked: () => void;
  handleApplication_match: (
    _resumeMatch: States['application_match'][number],
  ) => void;
  handleChecklist: (_id: States['checklist'][number]) => void;
  handleImportPopup: () => void;
};

type ExtraStates = typeof getComputed;

type Store = CreateContextStore<States, ExtraActions, ExtraStates>;

const useApplicationsStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set, get) => ({
      initial,
      ...getInitial(),
      ...getComputed(get),
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
        resetBadges: () => set(() => ({ badges: getInitial('badges') })),
        handleBookmarked: () =>
          set((state) => ({ bookmarked: !state.bookmarked })),
        setBookmarked: (bookmarked) => set(() => ({ bookmarked })),
        resetBookmarked: () =>
          set(() => ({ bookmarked: getInitial('bookmarked') })),
        setLocations: (locations) => set(() => ({ locations })),
        resetLocations: () =>
          set(() => ({ locations: getInitial('locations') })),
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
          set(() => ({ application_match: getInitial('application_match') })),
        setSearch: (search) => set(() => ({ search })),
        resetSearch: () => set(() => ({ search: getInitial('search') })),
        setStatus: (status) =>
          set(() => ({ status, checklist: getInitial('checklist') })),
        resetStatus: () =>
          set(() => ({
            status: getInitial('status'),
            checklist: getInitial('checklist'),
          })),
        setStages: (stages) => set(() => ({ stages })),
        resetStages: () => set(() => ({ stages: getInitial('stages') })),
        setOrder: (order) => set(() => ({ order })),
        resetOrder: () => set(() => ({ order: getInitial('order') })),
        setType: (type) => set(() => ({ type })),
        resetType: () => set(() => ({ type: getInitial('type') })),
        setActionPopup: (actionPopup) => set(() => ({ actionPopup })),
        resetActionPopup: () =>
          set(() => ({ actionPopup: getInitial('actionPopup') })),
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
        resetChecklist: () =>
          set(() => ({ checklist: getInitial('checklist') })),
        handleImportPopup: () =>
          set((state) => ({ importPopup: !state.importPopup })),
        setImportPopup: (importPopup) => set(() => ({ importPopup })),
        resetImportPopup: () =>
          set(() => ({ importPopup: getInitial('importPopup') })),
      },
    })),
  );
  return store;
};

export const ApplicationsStoreContext = createContext<
  ReturnType<typeof useApplicationsStoreContext> | undefined
>(undefined);

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
