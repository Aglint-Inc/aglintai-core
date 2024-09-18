/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import type { DatabaseTable } from '@aglint/shared-types';
import { createContext, memo, type PropsWithChildren, useState } from 'react';
import { createStore } from 'zustand';

import type { nestedObjectToArray } from '@/components/Common/FilterHeader/filters/utils';
import {
  type CreateContextStore,
  getContextStoreInitial,
} from '@/utils/zustandContextHelpers';

type Checklist = DatabaseTable['applications']['id'][];

type Locations = ReturnType<typeof nestedObjectToArray>;

type Stages = ReturnType<typeof nestedObjectToArray>;

type ActionPopup = DatabaseTable['applications']['status'];

type States = {
  checklist: Checklist;
  importPopup: boolean;
  actionPopup: ActionPopup;
  locations: Locations;
  stages: Stages;
};

const initial: States = Object.freeze({
  actionPopup: null,
  checklist: [],
  importPopup: false,
  locations: [],
  stages: [],
});

const get = getContextStoreInitial(initial);

type Store = CreateContextStore<States>;

const useApplicationsStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial,
      ...get(),
      actions: {
        setActionPopup: (actionPopup) => set(() => ({ actionPopup })),
        resetActionPopup: () =>
          set(() => ({ actionPopup: get('actionPopup') })),
        setChecklist: (checklist) => set(() => ({ checklist })),
        resetChecklist: () => set(() => ({ checklist: get('checklist') })),
        setImportPopup: (importPopup) => set(() => ({ importPopup })),
        resetImportPopup: () =>
          set(() => ({ importPopup: get('importPopup') })),
        setLocations: (locations) => set(() => ({ locations })),
        resetLocations: () => set(() => ({ locations: get('locations') })),
        setStages: (stages) => set(() => ({ stages })),
        resetStages: () => set(() => ({ stages: get('stages') })),
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
