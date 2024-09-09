import { useIntegrationStore } from './useIntegrationStore';

export const useIntegrationsDefault = () =>
  useIntegrationStore((state) => state.intialIntegrations);
