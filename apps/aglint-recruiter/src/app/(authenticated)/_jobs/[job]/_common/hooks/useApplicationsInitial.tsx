import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsInitial = () =>
  useApplicationsStore((state) => state.initial);
