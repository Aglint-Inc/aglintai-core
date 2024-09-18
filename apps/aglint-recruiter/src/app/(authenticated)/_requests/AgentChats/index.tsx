import { Button } from '@components/ui/button';

import AgentInputBox from './AgentInputBox';
import ChatMessageList from './ChatMessageList';
import {
  setChatList,
  setViewHistory,
  setViewList,
  useAgentChatStore,
} from './ChatMessageList/store';

function AgentChats() {
  const { chatList } = useAgentChatStore((state) => ({
    isFetchingNextPage: state.isFetchingNextPage,
    chatList: state.chatList,
    viewHistory: state.viewHistory,
    tempLoading: state.tempLoading,
    viewList: state.viewList,
  }));

  return (
    <div className='flex h-full w-[450px] flex-col border-r bg-white'>
      <div className='flex items-center justify-end px-4 pt-4'>
        <div className='flex space-x-2'>
          {chatList.length > 0 && (
            <Button
              variant='ghost'
              size='sm'
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
      <div className='flex-grow'>
        <ChatMessageList />
      </div>
      <div className='p-4'>
        <AgentInputBox />
      </div>
    </div>
  );
}

export default AgentChats;
