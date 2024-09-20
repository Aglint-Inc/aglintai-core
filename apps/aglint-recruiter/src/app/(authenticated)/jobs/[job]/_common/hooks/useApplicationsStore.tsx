/**
 *
 * Hooks with Atomic selectors + Separate Action Hook with no selector
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */

import { ApplicationsStoreContext } from '@/job/contexts/applicationsStoreContext';
import { createContextStoreSelector } from '@/utils/zustandContextHelpers';

export const useApplicationsStore = createContextStoreSelector(
  ApplicationsStoreContext,
);
