import { toast } from '@components/hooks/use-toast';

import { api } from '@/trpc/client';

export const useAlterCount = () => {
  const { mutate, isPending } =
    api.interview_pool.update_pool_traning.useMutation({
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Update failed',
        });
      },
    });

  return { mutate, isPending };
};
