import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { api, type Unvoid } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';
import toast from '@/utils/toast';

import { useApplicationsActions } from './useApplicationsActions';
import { useApplicationsStore } from './useApplicationsStore';
import { useCurrentJob } from './useCurrentJob';

export const useApplicationsMove = () => {
  const { job_id } = useCurrentJob();
  const { push } = useRouter();
  const checklist = useApplicationsStore((state) => state.checklist);
  const { resetChecklist, resetActionPopup } = useApplicationsActions();
  const mutation = api.jobs.job.applications.move.useMutation({
    onSuccess: (_, data) => {
      toast.success('Moved application/s successfully');
      if (data && data.status === 'interview' && data.body)
        push(ROUTES['/requests']());
      resetChecklist();
      resetActionPopup();
    },
    onError: () => toast.error('Unable to move application/s'),
  });
  const mutate = useCallback(
    (args: Partial<Unvoid<Parameters<(typeof mutation)['mutate']>[0]>>) =>
      mutation.mutate({
        ...args,
        job_id,
        applications: checklist,
      } as Required<typeof args>),
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
        } as Required<typeof args>);
      } catch {
        //
      }
    },
    [checklist],
  );
  return { ...mutation, mutate, mutateAsync };
};
