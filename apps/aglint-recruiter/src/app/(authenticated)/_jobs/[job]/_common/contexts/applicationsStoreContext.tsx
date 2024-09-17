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
import type { CreateContextStore } from '@/hooks/createContextStoreSelector';

type Checklist = DatabaseTable['applications']['id'][];

type Locations = ReturnType<typeof nestedObjectToArray>;

type ActionPopup = DatabaseTable['applications']['status'];

type States = {
  checklist: Checklist;
  importPopup: boolean;
  locations: Locations;
  actionPopup: ActionPopup;
};

type Store = CreateContextStore<States>;

const useApplicationsStoreContext = () => {
  const [store] = useState(
    createStore<Store>((set) => ({
      initial: {
        actionPopup: null,
        checklist: [],
        importPopup: false,
        locations: [],
      },
      actionPopup: null,
      checklist: [],
      importPopup: false,
      locations: [],
      actions: {
        setActionPopup: (actionPopup) => set(() => ({ actionPopup })),
        resetActionPopup: () => set(() => ({ actionPopup: null })),
        setChecklist: (checklist) => set(() => ({ checklist })),
        resetChecklist: () => set(() => ({ checklist: [] })),
        setImportPopup: (importPopup) => set(() => ({ importPopup })),
        resetImportPopup: () => set(() => ({ importPopup: false })),
        setLocations: (locations) => set(() => ({ locations })),
        resetLocations: () => set(() => ({ locations: [] })),
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
