/**
 *
 * Hooks with Atomic selectors + Separate Action Hook with no selector
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */

import { JobDashboardStoreContext } from '@/job/contexts/jobDashboardStoreContext';
import { createContextStoreSelector } from '@/utils/zustandContextHelpers';

export const useJobDashboardStore = createContextStoreSelector(
  JobDashboardStoreContext,
);
