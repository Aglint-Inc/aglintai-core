import { createContextStoreSelector } from '@/hooks/createContextStoreSelector';

import { IntegrationContext } from '../contexts/integrationsContext';

export const useIntegrationStore =
  createContextStoreSelector(IntegrationContext);

export const useIntegrationActions = () =>
  useIntegrationStore((state) => state.actions);

export const useIntegrations = () =>
  useIntegrationStore((state) => state.integrations);

export const useIntegrationsDefault = () =>
  useIntegrationStore((state) => state.intialIntegrations);
