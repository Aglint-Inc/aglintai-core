/**
 *
 * Hooks with Atomic selectors + Separate Action Hook with no selector
 *
 * @link https://tkdodo.eu/blog/working-with-zustand
 *
 */

import { WorkflowsStoreContext } from '@/job/workflows/contexts/workflowsStoreContext';
import { createContextStoreSelector } from '@/utils/zustandContextHelpers';

export const useWorkflowsStore = createContextStoreSelector(
  WorkflowsStoreContext,
);
