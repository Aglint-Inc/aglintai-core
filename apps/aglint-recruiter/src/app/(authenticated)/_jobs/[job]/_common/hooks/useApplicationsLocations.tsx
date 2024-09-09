import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsLocations = () =>
  useApplicationsStore((state) => state.locations);
