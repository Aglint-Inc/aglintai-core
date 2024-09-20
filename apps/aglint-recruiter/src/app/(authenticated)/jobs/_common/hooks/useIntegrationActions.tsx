import { useIntegrationStore } from './useIntegrationStore';

export const useIntegrationActions = () =>
  useIntegrationStore((state) => state.actions);
