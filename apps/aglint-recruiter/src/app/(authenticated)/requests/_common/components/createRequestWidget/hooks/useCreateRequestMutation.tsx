import { toast } from '@components/hooks/use-toast';

import { api, type RouterInputs, type Unvoid } from '@/trpc/client';

import { useCreateRequest } from './useCreateRequest';
import { useCreateRequestActions } from './useCreateRequestActions';

export const useCreateRequestMutation = () => {
  const note = useCreateRequest((state) => state.note);
  const dates = useCreateRequest((state) => state.dates);
  const priority = useCreateRequest((state) => state.priority);
  const selections = useCreateRequest((state) => state.selections);
  const { onOpenChange, setError, resetError } = useCreateRequestActions();
  const mutation = api.requests.create.create_request.useMutation({
    onError: (e) => {
      setError(e.shape?.message||null);
    },
    onSuccess: () => {
      toast({ title: 'Successfully created request' });
      onOpenChange(false);
    },
  });
  const application = selections.candidate.id;
  const sessions = selections.schedules.map(({ id }) => id);
  const request: Unvoid<
    RouterInputs['requests']['create']['create_request']
  >['request'] = {
    assignee_id: selections.assignees.id,
    note,
    priority,
    schedule_end_date: dates.end_date,
    schedule_start_date: dates.start_date,
    type: selections.requestType.id,
  };
  const payload: Unvoid<RouterInputs['requests']['create']['create_request']> =
    {
      application,
      sessions,
      request,
    };
  const mutate = () => {
    resetError();
    mutation.mutate(payload);
  };
  const mutateAsync = async () => {
    resetError();
    try {
      await mutation.mutateAsync(payload);
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};
