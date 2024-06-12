import { DatabaseTable } from '@aglint/shared-types';

import { CreateSlice } from '.';

type CurrentApplication = DatabaseTable['applications']['id'];

export type CurrentApplicationSlice = {
  currentApplication: CurrentApplication;
  // eslint-disable-next-line no-unused-vars
  setCurrentApplication: (currentApplication: CurrentApplication) => void;
  resetCurrentApplication: () => void;
};

const initialCurrentApplication: CurrentApplication = null;

export const createCurrentApplicationSlice: CreateSlice<
  CurrentApplicationSlice
> = (set) => ({
  currentApplication: initialCurrentApplication,
  setCurrentApplication: (currentApplication: CurrentApplication) =>
    set({ currentApplication }),
  resetCurrentApplication: () =>
    set({ currentApplication: initialCurrentApplication }),
});
