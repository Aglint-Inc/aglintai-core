import { toast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';
import { UpdateNote } from '@/routers/requests/note/update';
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

  const updateRequestNote = (payload: UpdateNote['input']) => {
    mutation.mutate({
      ...payload,
    });
  };
  return { ...mutation, updateRequestNote };
};
