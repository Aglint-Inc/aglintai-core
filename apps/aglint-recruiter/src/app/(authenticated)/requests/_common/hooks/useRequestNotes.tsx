import { toast } from '@components/hooks/use-toast';

import { api, type RouterInputs, type Unvoid } from '@/trpc/client';
export const useReadNotes = api.requests.note.read.useQuery;

export const useUpdateRequestNote = () => {
  const utils = api.useUtils();
  const mutation = api.requests.note.updateNote.useMutation({
    onSuccess: () => {
      utils.requests.note.read.invalidate();
    },
    onError: (e) => {
      toast({ variant: 'destructive', title: e.shape?.message });
    },
  });

  const updateRequestNote = (
    payload: Unvoid<RouterInputs['requests']['note']['updateNote']>,
  ) => {
    mutation.mutate({
      ...payload,
    });
  };
  return { ...mutation, updateRequestNote };
};
