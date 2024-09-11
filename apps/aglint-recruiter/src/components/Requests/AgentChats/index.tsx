

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';
import {
  setChatList,
  setViewHistory,
  setViewList,
  useAgentChatStore,
} from './ChatMessageList/store';
import { Button } from '@components/ui/button';

function AgentChats() {
  const { chatList } = useAgentChatStore((state) => ({
    isFetchingNextPage: state.isFetchingNextPage,
    chatList: state.chatList,
    viewHistory: state.viewHistory,
    tempLoading: state.tempLoading,
    viewList: state.viewList,
  }));

  return (
    <div className="flex w-[450px] flex-col h-full bg-white border-r">
      <div className="flex justify-end items-center pt-4 px-4">
        <div className="flex space-x-2">
          {chatList.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setChatList([]);
                setViewList(false);
                setViewHistory(false);
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      <div className="flex-grow">
        <ChatMessageList />
      </div>
      <div className="p-4">
        <AgentInputBox />
      </div>
    </div>
  );
}

export default AgentChats;
