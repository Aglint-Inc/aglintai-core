/**
 *
 * Hooks with Atomic selectors + Separate Action Hook with no selector
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */

import { IntegrationStoreContext } from '@/jobs/contexts';
import { createContextStoreSelector } from '@/utils/zustandContextHelpers';

export const useIntegrationStore = createContextStoreSelector(
  IntegrationStoreContext,
);