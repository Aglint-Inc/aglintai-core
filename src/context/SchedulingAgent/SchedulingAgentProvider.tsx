import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { AisubmitHandlerParams } from '@/src/components/Scheduling/Agent';
import {
  AgentChat,
  setActivities,
  setActivityLoading,
  setAllChat,
  setEdit,
  setLoading,
  setSelectedChat,
  setUserText,
  useSchedulingAgentStore,
} from '@/src/components/Scheduling/Agent/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

type SchedulingAgentContextType = {
  // eslint-disable-next-line no-unused-vars
  submitHandler: (params: AisubmitHandlerParams) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateAllChat: (histAfterAssisResponse: AgentChat['history']) => void;
  scrollToBottom: () => void;
  newChat: () => void;
  // eslint-disable-next-line no-unused-vars
  editName: (name: string) => void;
  initialLoading: boolean;
};

const initialState = {
  submitHandler: async () => {},
  updateAllChat: () => {},
  scrollToBottom: () => {},
  newChat: () => {},
  editName: () => {},
  initialLoading: true,
};

const SchedulingAgentContext =
  createContext<SchedulingAgentContextType>(initialState);

const SchedulingAgentProvider = ({ children }) => {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const { allChat, selectedChat, activities } = useSchedulingAgentStore();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (recruiter?.id) initialFetch();
  }, [recruiter?.id]);

  useEffect(() => {
    if (selectedChat.id) {
      fetchActivities(selectedChat.id);
    }
  }, [selectedChat.id]);

  const initialFetch = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_chatx')
        .select('*')
        .eq('recruiter_id', recruiter?.id);

      if (error) {
        throw error;
      }
      setAllChat(data as AgentChat[]);
      if (router.query.id) {
        const chat = data.find((chat) => chat.id == router.query.id);
        if (chat?.id) {
          setSelectedChat(chat as AgentChat);
          setTimeout(() => {
            scrollToBottom();
          }, 100);
        }
      }
    } catch (e) {
      //
    } finally {
      setTimeout(() => {
        setInitialLoading(false);
      }, 1500);
    }
  };

  const submitHandler = async ({
    input,
    payload,
    selectedItem,
    activity,
  }: AisubmitHandlerParams) => {
    if (!selectedChat.id) {
      selectedChat.id = uuid();
      selectedChat.title = input;
      selectedChat.type = 'scheduler';
      selectedChat.recruiter_id = recruiter?.id;
      allChat.push(selectedChat);
    }

    setUserText('');
    // Update the chat history with the user's input immediately
    const updatedHistory = [
      ...selectedChat.history,
      {
        type: 'user',
        value: input,
        selectedItem: selectedItem || null,
        created_at: new Date().toISOString(),
      },
    ];
    setSelectedChat({
      history: updatedHistory,
    } as any);
    setLoading(true);

    try {
      let allActivity = activity;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_HOST}/api/scheduling`,
        {
          input: input,
          history: selectedChat.history,
          selectedItem: selectedItem,
          user_id: recruiterUser.user_id,
          payload: payload,
          chat_id: selectedChat.id,
          recruiter_id: recruiter.id,
        },
      );

      if (res.status !== 200) {
        throw new Error('Error in response');
      }

      scrollToBottom();

      if (
        !res?.data?.funcRes[res.data.funcRes.length - 1]?.response?.activity
      ) {
        allActivity = [];
      } else {
        const data = supabaseWrap(
          await supabase.from('agent_activity').insert(activity).select(),
        );
        setActivities([...activities, ...data]);
      }

      const histAfterAssisResponse = [
        ...updatedHistory,
        {
          type: 'assistant',
          value: res.data.output,
          funcRes: res.data.funcRes,
          created_at: new Date().toISOString(),
        },
        ...(allActivity?.map((act) => ({
          type: 'activity',
          value: act.title,
          status: act.icon_status,
          created_at: new Date().toISOString(),
        })) ?? []),
      ];

      setSelectedChat({
        history: histAfterAssisResponse,
      } as any);
      setLoading(false);

      await supabase.from('agent_chatx').upsert({
        ...selectedChat,
        history: histAfterAssisResponse,
        last_updated_at: new Date().toISOString(),
      });
      updateAllChat(histAfterAssisResponse as AgentChat['history']);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
      setLoading(false);
      toast.error('Something went wrong! Please try again later.');
    }
  };

  const updateAllChat = (histAfterAssisResponse: AgentChat['history']) => {
    const updatedChatIndex = allChat.findIndex((c) => c.id === selectedChat.id);
    const updatedChat = {
      ...allChat[Number(updatedChatIndex)],
      history: histAfterAssisResponse,
    };
    allChat[Number(updatedChatIndex)] = updatedChat as AgentChat;
    setAllChat([...allChat]);
  };

  const fetchActivities = async (chat_id: string) => {
    setActivityLoading(true);
    try {
      const { data, error } = await supabase
        .from('agent_activity')
        .select('*')
        .eq('agent_chat_id', chat_id);

      if (error) {
        throw error;
      }
      setActivities(data);
      setActivityLoading(false);
    } catch (e) {
      //
    }
  };

  const scrollToBottom = () => {
    const container = document.querySelector<HTMLElement>(
      '[class*=AgentLayout_task_chat_body]',
    );
    if (container) {
      // container.style.scrollBehavior = 'smooth';
      container.scrollTop = container.scrollHeight;
    }
  };

  const newChat = () => {
    setSelectedChat({ history: [], id: null, title: null } as any);
    setActivities([]);
  };

  const editName = async (name) => {
    setSelectedChat({ ...selectedChat, title: name });
    const updatedChatIndex = allChat.findIndex((c) => c.id === selectedChat.id);
    const updatedChat = {
      ...allChat[Number(updatedChatIndex)],
      title: name,
    };
    allChat[Number(updatedChatIndex)] = updatedChat as AgentChat;
    setAllChat([...allChat]);
    setEdit({
      isEdit: false,
      editValue: '',
    });
    await supabase
      .from('agent_chatx')
      .update({ title: name })
      .eq('id', selectedChat.id);
  };

  return (
    <SchedulingAgentContext.Provider
      value={{
        submitHandler,
        updateAllChat,
        scrollToBottom,
        newChat,
        editName,
        initialLoading,
      }}
    >
      {children}
    </SchedulingAgentContext.Provider>
  );
};

export default SchedulingAgentProvider;

export const useSchedulingAgent = () => {
  return useContext(SchedulingAgentContext);
};
