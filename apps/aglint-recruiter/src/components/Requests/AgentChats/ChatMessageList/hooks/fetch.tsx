import { type ApiBodyAgentSupervisor, type Message } from '@aglint/shared-types';
import { type FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import axios from 'axios';

import {
  setChatList,
  setCursor,
  setHasNextPage,
  setIsFetchingNextPage,
  setTempLoading,
  setViewHistory,
  setViewList,
  useAgentChatStore,
} from '@/src/components/Requests/AgentChats/ChatMessageList/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { scrollToElementById } from './scroll';

export type ChatType = Awaited<ReturnType<typeof fetchUserChat>>[0];

export const useUserChat = () => {
  const { recruiter, recruiterUser } = useAuthDetails();
  const user_id = recruiterUser.user_id;
  const { isFetchingNextPage, tempLoading, cursor, chatList } =
    useAgentChatStore((state) => ({
      isFetchingNextPage: state.isFetchingNextPage,
      tempLoading: state.tempLoading,
      cursor: state.cursor,
      chatList: state.chatList,
    }));

  const fetchNextPage = async () => {
    if (isFetchingNextPage || tempLoading) return;
    setIsFetchingNextPage(true);
    const res = await fetchUserChat(user_id, cursor);
    setCursor(cursor + 11);
    if (res.length === 0) {
      setHasNextPage(false);
      setIsFetchingNextPage(false);
      return;
    }
    const updChatList = [...res.reverse(), ...chatList];
    setChatList([...updChatList]);
    setIsFetchingNextPage(false);
  };

  const submitUserChat = async (text: string) => {
    try {
      const res = await insertUserChat(
        { function: null, text, type: 'user' },
        user_id,
      );
      const updChatList = [...chatList, res];
      setChatList([...updChatList]);
      setTimeout(
        () =>
          scrollToElementById({
            id: 'bottomRef',
            behavior: 'smooth',
          }),
        100,
      );
      return res;
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const insertAIChat = async (
    aiMessage: Awaited<ReturnType<typeof fetchUserChat>>[0],
    userMessage: Awaited<ReturnType<typeof fetchUserChat>>[0],
  ) => {
    try {
      const updChatList = [...chatList, userMessage, aiMessage];
      setChatList([...updChatList]);
      setTimeout(() => {
        scrollToElementById({
          id: 'bottomRef',
          behavior: 'smooth',
        });
      }, 500);
    } catch (err) {
      toast.error('Failed to submit chat. Please try again later.');
    }
  };

  const clearChat = () => {
    setViewHistory(false);
    setViewList(false);
    setChatList([]);
  };

  const fetchChat = async (cursor: number) => {
    try {
      setTempLoading(true);
      const res = await fetchUserChat(recruiterUser.user_id, cursor);
      setCursor(cursor + 11);
      if (res.length === 0) {
        setHasNextPage(false);
      } else {
        setChatList([...res.reverse(), ...chatList]);
        setHasNextPage(true);
      }
      setTimeout(
        () =>
          scrollToElementById({
            id: 'bottomRef',
            behavior: 'instant',
          }),
        800,
      );
      setTimeout(() => setTempLoading(false), 1500);
    } catch (err) {
      toast.error('Failed to fetch chat. Please try again later.');
    }
  };

  const handleAgentSubmit = async ({
    planText,
    selectedItems,
  }: {
    planText: string;
    selectedItems: any;
  }) => {
    try {
      setViewHistory(true);
      const newMessage: Message = {
        content: planText,
        type: 'user',
      };
      const oldMessages: Message[] = [].map((ele) => ({
        content: ele.content,
        type: ele.type === 'user' ? 'user' : 'assistant',
      }));
      const userMessage = await submitUserChat(planText); // save to db
      const bodyParams: ApiBodyAgentSupervisor = {
        recruiter_id: recruiter.id,
        history: [...oldMessages, newMessage],
        user_id: recruiterUser.user_id,
        applications: selectedItems?.applicant_name,
        jobs: selectedItems?.job_title,
        sessions: selectedItems?.interview_name,
      };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_AGENT_API}/api/supervisor/agent`,
        bodyParams,
      );
      const aiMessage = data as ChatType;
      insertAIChat(aiMessage, userMessage);
    } catch (err) {
      toast.error('Failed to process request. Please contact support.');
    }
  };

  return {
    fetchNextPage,
    submitUserChat,
    insertAIChat,
    clearChat,
    handleAgentSubmit,
    fetchChat,
  };
};

export const fetchUserChat = async (user_id: string, cursor: number) => {
  const { data, error } = await supabase
    .from('user_chat')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .range(cursor, cursor + 10)
    .throwOnError();

  if (error) {
    throw new Error(`Error fetching chat: ${error.message}`);
  }

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
