import { useToast } from '@components/hooks/use-toast';

import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

type Props = {
  name: string;
  description: string;
  isTraining: boolean;
  department_id: number;
};

export const useCreateInterviewPool = () => {
  const { toast } = useToast();
  const { superPush } = useRouterPro();
  const mutation = api.interview_pool.create_pool.useMutation({
    onError: (e) =>
      toast({
        title: 'Error',
        description: e.message,
      }),
    onSuccess: (res) => {
      if (!res) return;
      superPush('/interview-pool/[pool]', {
        params: {
          pool: res.id,
        },
      });
    },
  });

  const mutateAsync = async (props: Props) => {
    await mutation.mutateAsync(props);
  };

  return { ...mutation, mutateAsync };
};
