import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardPublishing = () =>
  useJobDashboardStore((state) => state.publishing);
