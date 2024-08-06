import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useUserChat = ({ user_id }: { user_id: string }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['user_chat'],
    queryFn: () => fetchUserChat(user_id),
    enabled: !!user_id,
    refetchInterval: 1000 * 60 * 10,
  });

  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['user_chat'],
    });
  };
  return { ...query, refetch };
};

const fetchUserChat = async (user_id: string) => {
  const { data } = await supabase
    .from('user_chat')
    .select('*')
    .eq('user_id', user_id)
    .throwOnError();

  return data;
};
