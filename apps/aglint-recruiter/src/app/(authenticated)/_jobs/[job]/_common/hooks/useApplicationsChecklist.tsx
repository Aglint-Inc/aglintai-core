import { useApplicationsStore } from './useApplicationsStore';

export const useApplicationsChecklist = () =>
  useApplicationsStore((state) => state.checklist);
