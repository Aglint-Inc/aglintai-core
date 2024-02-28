import { create } from 'zustand';

import { AgentActivityType, AgentChatType } from '@/src/types/data.types';

export type HistoryType = {
  type: 'user' | 'assistant' | 'activity';
  value: string;
  funcRes?: any;
  loading?: boolean;
  created_at: string;
  status?: 'success' | 'waiting' | 'error';
  user_id?: string;
  selectedItem?: any;
};

export interface SchedulingAgent {
  allChat: AgentChat[];
  selectedChat: AgentChat | null;
  userText: string;
  loading: boolean;
  activities: AgentActivityType[];
  activityLoading: boolean;
  activityOpen: boolean;
  candidateTipTapOpen: boolean;
}

const initialState: SchedulingAgent = {
  allChat: [],
  selectedChat: { history: [], id: null, title: null } as AgentChat,
  userText: '',
  loading: false,
  activities: [],
  activityLoading: false,
  activityOpen: false,
  candidateTipTapOpen: false,
};

export const useSchedulingAgentStore = create<SchedulingAgent>()(() => ({
  ...initialState,
}));

export const setAllChat = (allChat: AgentChat[]) =>
  useSchedulingAgentStore.setState({ allChat });

export const setSelectedChat = (selectedChat: AgentChat) =>
  useSchedulingAgentStore.setState((state) => ({
    selectedChat: { ...state.selectedChat, ...selectedChat },
  }));

export const setUserText = (userText: string) =>
  useSchedulingAgentStore.setState({ userText });

export const setLoading = (loading: boolean) =>
  useSchedulingAgentStore.setState({ loading });

export const setActivities = (activities: AgentActivityType[]) =>
  useSchedulingAgentStore.setState({ activities });

export const setActivityLoading = (activityLoading: boolean) =>
  useSchedulingAgentStore.setState({ activityLoading });

export const setCandidateTipTapOpen = (candidateTipTapOpen: boolean) =>
  useSchedulingAgentStore.setState({ candidateTipTapOpen });

export const setActivityOpen = (activityOpen: boolean) =>
  useSchedulingAgentStore.setState({ activityOpen });

export const resetInterviewState = () =>
  useSchedulingAgentStore.setState({ ...initialState });

export type AgentChat = AgentChatType & {
  history: HistoryType[];
};
