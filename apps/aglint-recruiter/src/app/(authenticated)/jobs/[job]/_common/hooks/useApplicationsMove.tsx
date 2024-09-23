import { useCallback } from 'react';

import { useInvalidateJobQueries } from '@/queries/job';
import { api, type Unvoid } from '@/trpc/client';
import toast from '@/utils/toast';

import { useApplicationsActions } from './useApplicationsActions';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

export const useApplicationsMove = () => {
  const { job_id } = useCurrentJob();
  // const utils = api.useUtils();
  // const status = useApplicationsStore((state) => state.status);
  const { revalidateJobQueries } = useInvalidateJobQueries();
  const checklist = useApplicationsStore((state) => state.checklist);
  const { resetChecklist, resetActionPopup } = useApplicationsActions();
  const mutation = api.jobs.job.applications.move.useMutation({
    onSuccess: (_, data) => {
      if (data) {
        toast.success('Moved application/s successfully');
        // utils.jobs.job.applications.read.invalidate({ status, job_id });
        // utils.jobs.job.applications.read.refetch({
        //   status: data.status,
        //   job_id,
        // });
        revalidateJobQueries(job_id);
        resetChecklist();
        resetActionPopup();
      }
    },
    onError: () => toast.error('Unable to move application/s'),
  });
  const mutate = useCallback(
    (args: Partial<Unvoid<Parameters<(typeof mutation)['mutate']>[0]>>) =>
      mutation.mutate({
        ...args,
        job_id,
        applications: checklist,
      }),
    [checklist],
  );
  const mutateAsync = useCallback(
    async (
      args: Partial<Unvoid<Parameters<(typeof mutation)['mutateAsync']>[0]>>,
    ) => {
      try {
        await mutation.mutate({
          ...args,
          job_id,
          applications: checklist,
        });
      } catch {
        //
      }
    },
    [checklist],
  );
  return { ...mutation, mutate, mutateAsync };
};
