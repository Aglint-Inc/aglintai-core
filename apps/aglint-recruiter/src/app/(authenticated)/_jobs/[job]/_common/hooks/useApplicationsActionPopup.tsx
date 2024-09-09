import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsActionPopup = () =>
  useApplicationsStore((state) => state.actionPopup);
