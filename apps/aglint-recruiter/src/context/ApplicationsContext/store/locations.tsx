import { type nestedObjectToArray } from '@/src/components/Common/FilterHeader/utils';

import { type CreateSlice } from '.';

type Locations = ReturnType<typeof nestedObjectToArray>;

export type LocationsSlice = {
  locations: Locations;
  // eslint-disable-next-line no-unused-vars
  setLocations: (locations: Locations) => void;
  resetLocations: () => void;
};

const initialLocations: Locations = [];

export const createLocationsSlice: CreateSlice<LocationsSlice> = (set) => ({
  locations: initialLocations,
  setLocations: (locations) => set({ locations }),
  resetLocations: () => set({ locations: initialLocations }),
});
