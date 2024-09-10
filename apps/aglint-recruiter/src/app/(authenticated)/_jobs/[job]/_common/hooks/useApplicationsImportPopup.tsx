import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsImportPopup = () =>
  useApplicationsStore((state) => state.importPopup);
