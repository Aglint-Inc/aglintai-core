import { useIntegrationStore } from './useIntegrationStore';

export const useIntegrations = () =>
  useIntegrationStore((state) => state.integrations);
