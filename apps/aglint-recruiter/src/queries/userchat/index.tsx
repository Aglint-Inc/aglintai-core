import { FunctionNames } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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

  const submitUserChat = async (text: string) => {
    try {
      const res = await insertUserChat(
        { function: null, text, type: 'user' },
        user_id,
      );
      queryClient.setQueryData(
        [`user_chat`],
        (prevData: Awaited<ReturnType<typeof fetchUserChat>>) => {
          return [...prevData, res];
        },
      );
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const insertAIChat = async (
    aiMessage: Awaited<ReturnType<typeof fetchUserChat>>[0],
  ) => {
    try {
      queryClient.setQueryData(
        [`user_chat`],
        (prevData: Awaited<ReturnType<typeof fetchUserChat>>) => {
          return [...prevData, aiMessage];
        },
      );
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const clearChat = () => {
    queryClient.setQueryData([`user_chat`], () => {
      return [];
    });
  };

  return { ...query, refetch, submitUserChat, insertAIChat, clearChat };
};

const fetchUserChat = async (user_id: string) => {
  const { data } = await supabase
    .from('user_chat')
    .select('*')
    .eq('user_id', user_id)
    .throwOnError();
  return data;
};

// eslint-disable-next-line no-unused-vars
const insertUserChat = async (
  payload: {
    function: FunctionNames;
    text: string;
    type: 'user' | 'agent';
    metadata?: any;
  },
  user_id: string,
) => {
  const { data } = await supabase
    .from('user_chat')
    .insert({
      type: payload.type,
      content: payload.text,
      function: payload.function,
      user_id: user_id,
      metadata: payload.metadata,
    })
    .select()
    .throwOnError();
  return data[0];
};
