import { useQuery, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

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
      // const res = await insertUserChat(
      //   { function: null, text, type: 'user' },
      //   user_id,
      // );
      queryClient.setQueryData(
        [`user_chat`],
        (prevData: Awaited<ReturnType<typeof fetchUserChat>>) => {
          return [
            ...prevData,
            {
              id: uuidv4(),
              type: 'user',
              user_id,
              title: text,
              function: null,
              created_at: new Date().toISOString(),
            },
          ];
        },
      );
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const insertAIChat = async ({
    message,
    function_name,
    payload,
  }: {
    message: string;
    function_name: string;
    payload: any;
  }) => {
    try {
      queryClient.setQueryData(
        [`user_chat`],
        (prevData: Awaited<ReturnType<typeof fetchUserChat>>) => {
          return [
            ...prevData,
            {
              id: uuidv4(),
              type: 'agent',
              user_id,
              title: message,
              function: function_name,
              metadata: payload,
              created_at: new Date().toISOString(),
            } as Awaited<ReturnType<typeof fetchUserChat>>[0],
          ];
        },
      );
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  return { ...query, refetch, submitUserChat, insertAIChat };
};

const fetchUserChat = async (user_id: string) => {
  const { data } = await supabase
    .from('user_chat')
    .select('*')
    .eq('user_id', user_id)
    .throwOnError();
  return data;
};

const insertUserChat = async (
  payload: {
    function: string;
    text: string;
    type: 'user' | 'agent';
  },
  user_id: string,
) => {
  const { data } = await supabase
    .from('user_chat')
    .insert({
      type: payload.type,
      title: payload.text,
      function: payload.function,
      user_id: user_id,
    })
    .select()
    .throwOnError();
  return data[0];
};
