import { toast } from '@components/hooks/use-toast';

import { type Read } from '@/routers/requests/note/read';
import type { UpdateNote } from '@/routers/requests/note/update';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
export const useReadNotes = (input: Read['input']): ProcedureQuery<Read> =>
  api.requests.note.read.useQuery(input, { enabled: !!input.request_id });

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
