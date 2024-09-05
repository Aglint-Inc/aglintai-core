/**
 *
 * React Context + Zustand Store for performant and non-re-rendering store
 *
 * @link https://tkdodo.eu/blog/zustand-and-react-context
 *
 */
import type { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { type PropsWithChildren, createContext, memo, useState } from 'react';
import { createStore } from 'zustand';

import type { nestedObjectToArray } from '@/components/Common/FilterHeader/utils';
import type { CreateContextStore } from '@/hooks/createContextStoreSelector';

type Checklist = DatabaseTable['applications']['id'][];

type Locations = ReturnType<typeof nestedObjectToArray>;

type ActionPopup = DatabaseEnums['application_status'];

type States = {
  checklist: Checklist;
  importPopup: boolean;
  locations: Locations;
  actionPopup: ActionPopup;
};

const useApplicationsContext = () => {
  const [store] = useState(
    createStore<CreateContextStore<States>>((set) => ({
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
      setActionPopup: (actionPopup) => set(() => ({ actionPopup })),
      setChecklist: (checklist) => set(() => ({ checklist })),
      setImportPopup: (importPopup) => set(() => ({ importPopup })),
      setLocations: (locations) => set(() => ({ locations })),
    })),
  );
  return store;
};

export const ApplicationsContext =
  createContext<ReturnType<typeof useApplicationsContext>>(undefined);

export const ApplicationsProvider = memo(({ children }: PropsWithChildren) => {
  const value = useApplicationsContext();
  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
});
ApplicationsProvider.displayName = 'ApplicationsProvider';
