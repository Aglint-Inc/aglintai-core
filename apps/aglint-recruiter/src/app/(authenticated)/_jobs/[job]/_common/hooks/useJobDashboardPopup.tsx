import { useJobDashboardStore } from './useJobDashboardStore';

export const useJobDashboardPopup = () =>
  useJobDashboardStore((state) => state.popup);
