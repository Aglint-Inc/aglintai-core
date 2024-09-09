import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardInitial = () =>
  useJobDashboardStore((state) => state.initial);
