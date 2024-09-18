/**
 *
 * Hooks with Atomic selectors + Separate Action Hook with no selector
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */

import { createContextStoreSelector } from '@/utils/zustandContextHelpers';
import { JobDashboardStoreContext } from '@/job/contexts/jobDashboardStoreContext';

export const useJobDashboardStore = createContextStoreSelector(
  JobDashboardStoreContext,
);
