import { useState } from 'react';

import { AglintAiChat } from '@/devlink2/AglintAiChat';

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';
import {
  setChatList,
  setViewHistory,
  setViewList,
  useAgentChatStore,
} from './ChatMessageList/store';

function AgentChats() {
  const [openSetting, setOpenSettings] = useState(false);
  const { chatList } = useAgentChatStore((state) => ({
    isFetchingNextPage: state.isFetchingNextPage,
    chatList: state.chatList,
    viewHistory: state.viewHistory,
    tempLoading: state.tempLoading,
    viewList: state.viewList,
  }));

  return (
    <>
      <AglintAiChat
        onClickMemory={{
          onClick: () => {
            setOpenSettings(!openSetting);
          },
        }}
        isClearVisible={chatList.length > 0}
        onClickClear={{
          onClick: () => {
            setChatList([]);
            setViewList(false);
            setViewHistory(false);
          },
        }}
        slotAiInput={<AgentInputBox />}
        slotAiBody={<ChatMessageList />}
      />
    </>
  );
}

export default AgentChats;
