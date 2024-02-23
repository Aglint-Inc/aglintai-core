import { create } from 'zustand';

import { AgentChatType } from '@/src/types/data.types';
import { use } from 'react';

export type HistoryType = {
  type: 'user' | 'assistant';
  value: string;
  functionValue?: any;
};

export interface SchedulingAgent {
  allChat: AgentChat[];
  selectedChat: AgentChat | null;
  userText: string;
}

const initialState: SchedulingAgent = {
  allChat: [],
  selectedChat: null,
  userText: '',
};

export const useSchedulingAgentStore = create<SchedulingAgent>()(() => ({
  ...initialState,
}));

export const setAllChat = (allChat: AgentChat[]) =>
  useSchedulingAgentStore.setState({ allChat });

export const setSelectedChat = (selectedChat: AgentChat) =>
  useSchedulingAgentStore.setState({ selectedChat });

export const setUserText = (userText: string) =>
  useSchedulingAgentStore.setState({ userText });

export const resetInterviewState = () =>
  useSchedulingAgentStore.setState({ ...initialState });

type AgentChat = AgentChatType & {
  history: HistoryType[];
};
