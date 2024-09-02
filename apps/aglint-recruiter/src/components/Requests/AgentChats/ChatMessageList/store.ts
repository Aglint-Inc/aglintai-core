import { create } from 'zustand';

import { type ChatType } from './hooks/fetch';

export interface AgentChat {
  tempLoading: boolean;
  isFetchingNextPage: boolean;
  chatList: ChatType[];
  hasNextPage: boolean;
  cursor: number;
  viewHistory: boolean;
  viewList: boolean;
}

const initialState: AgentChat = {
  tempLoading: true,
  isFetchingNextPage: false,
  chatList: [],
  hasNextPage: false,
  cursor: 0,
  viewHistory: false,
  viewList: false,
};

export const useAgentChatStore = create<AgentChat>()(() => ({
  ...initialState,
}));

export const setTempLoading = (tempLoading: AgentChat['tempLoading']) =>
  useAgentChatStore.setState({ tempLoading });

export const setIsFetchingNextPage = (
  isFetchingNextPage: AgentChat['isFetchingNextPage'],
) => useAgentChatStore.setState({ isFetchingNextPage });

export const setChatList = (chatList: AgentChat['chatList']) =>
  useAgentChatStore.setState({ chatList });

export const setHasNextPage = (hasNextPage: AgentChat['hasNextPage']) =>
  useAgentChatStore.setState({ hasNextPage });

export const setCursor = (cursor: AgentChat['cursor']) =>
  useAgentChatStore.setState({ cursor });

export const setViewHistory = (viewHistory: AgentChat['viewHistory']) =>
  useAgentChatStore.setState({ viewHistory });

export const setViewList = (viewList: AgentChat['viewList']) =>
  useAgentChatStore.setState({ viewList });

export const resetSchedulingApplicationState = () =>
  useAgentChatStore.setState({ ...initialState });
