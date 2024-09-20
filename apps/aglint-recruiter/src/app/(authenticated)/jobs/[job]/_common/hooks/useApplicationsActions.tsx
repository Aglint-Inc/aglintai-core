import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsActions = () =>
  useApplicationsStore((state) => state.actions);
