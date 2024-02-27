import axios from 'axios';
import { createContext, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { AisubmitHandlerParams } from '@/src/components/Scheduling/Agent';
import {
  AgentChat,
  setActivities,
  setActivityLoading,
  setAllChat,
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
};

const initialState = {
  submitHandler: async () => {},
  updateAllChat: () => {},
};

const SchedulingAgentContext =
  createContext<SchedulingAgentContextType>(initialState);

const SchedulingAgentProvider = ({ children }) => {
  const { recruiter, recruiterUser } = useAuthDetails();
  const { allChat, selectedChat, activities } = useSchedulingAgentStore();
  console.log('asdasd');

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
        .from('agent_chat')
        .select('*')
        .eq('recruiter_id', recruiter?.id);

      if (error) {
        throw error;
      }
      setAllChat(data as AgentChat[]);
    } catch (e) {
      //
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
          recruiter_id: recruiter.id,
        },
      );

      if (res.status !== 200) {
        throw new Error('Error in response');
      }

      if (
        res?.data?.funcRes[res.data.funcRes.length - 1]?.response?.message !==
        'success'
      ) {
        allActivity = [];
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

      if (activity) {
        const data = supabaseWrap(
          await supabase.from('agent_activity').insert(activity).select(),
        );
        setActivities([...activities, ...data]);
      }

      await supabase.from('agent_chat').upsert({
        ...selectedChat,
        history: histAfterAssisResponse,
        last_updated_at: new Date().toISOString(),
      });
      updateAllChat(histAfterAssisResponse as AgentChat['history']);
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong! Please try again later.');
      // eslint-disable-next-line no-console
      console.error('Error:', error);
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

  return (
    <SchedulingAgentContext.Provider value={{ submitHandler, updateAllChat }}>
      {children}
    </SchedulingAgentContext.Provider>
  );
};

export default SchedulingAgentProvider;

export const useSchedulingAgent = () => {
  return useContext(SchedulingAgentContext);
};
