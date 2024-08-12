import { FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { scrollToElementById } from '@/src/components/Requests/AgentChats/ChatMessageList/hooks';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export type ChatType = ReturnType<
  typeof useUserChat
>['data']['pages'][0]['list'][0];

export const useUserChat = ({ user_id }: { user_id: string }) => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    queryKey: ['user_chat'],
    queryFn: async ({ pageParam }) => {
      const res = await fetchUserChat(user_id, pageParam);
      if (pageParam === 0) scrollToElementById('bottomRef');
      return res;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchOnWindowFocus: true,
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
      await queryClient.setQueryData(
        [`user_chat`],
        (prevData: {
          pages: Awaited<ReturnType<typeof fetchUserChat>>[];
          pageParams: number[];
        }) => {
          prevData.pages[0].list = [res, ...prevData.pages[0].list];
          return {
            pages: [...prevData.pages],
            pageParams: prevData.pageParams,
          };
        },
      );
      scrollToElementById('bottomRef');
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const insertAIChat = async (
    aiMessage: Awaited<ReturnType<typeof fetchUserChat>>['list'][0],
  ) => {
    try {
      await queryClient.setQueryData(
        [`user_chat`],
        (prevData: {
          pages: Awaited<ReturnType<typeof fetchUserChat>>[];
          pageParams: number[];
        }) => {
          prevData.pages[0].list = [aiMessage, ...prevData.pages[0].list];
          return {
            pages: [...prevData.pages],
            pageParams: prevData.pageParams,
          };
        },
      );
      scrollToElementById('bottomRef');
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const clearChat = () => {
    queryClient.setQueryData([`user_chat`], () => {
      return {
        pages: [],
        pageParams: [],
      };
    });
  };

  return {
    ...query,
    refetch,
    submitUserChat,
    insertAIChat,
    clearChat,
  };
};

const fetchUserChat = async (user_id: string, page: number) => {
  const { data, error } = await supabase
    .from('user_chat')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .range(page * 10, (page + 1) * 10 - 1)
    .throwOnError();

  if (error) {
    throw new Error(`Error fetching chat: ${error.message}`);
  }

  return {
    list: data,
    nextCursor: data.length === 10 ? page + 1 : null,
  };
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
