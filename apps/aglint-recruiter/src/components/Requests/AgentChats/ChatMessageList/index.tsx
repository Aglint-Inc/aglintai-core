import { getFullName } from '@aglint/shared-utils';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { useAgentIEditor } from '../AgentEditorContext';
import CommandShortCuts from '../CommandShortCuts';
import { useUserChat } from './hooks/fetch';
import { useScrollListenerAgentChat } from './hooks/scroll';
import MessageIndividual from './MessageIndividual';
import SkeletonMessage from './MessageIndividual/Skeleton';
import {
  setCursor,
  setViewHistory,
  setViewList,
  useAgentChatStore,
} from './store';

function ChatMessageList() {
  const { recruiterUser } = useAuthDetails();
  const [fetchingChat, setFetchingChat] = useState(false);
  const { isFetchingNextPage, chatList, viewHistory, tempLoading, viewList } =
    useAgentChatStore((state) => ({
      isFetchingNextPage: state.isFetchingNextPage,
      chatList: state.chatList,
      viewHistory: state.viewHistory,
      tempLoading: state.tempLoading,
      viewList: state.viewList,
    }));

  const { fetchNextPage, fetchChat } = useUserChat();
  const { isResponding } = useAgentIEditor();

  const { topRef, chatContainerRef } = useScrollListenerAgentChat({
    fetchNextPage,
  });

  return (
    <ScrollArea
      ref={chatContainerRef}
      className='h-[calc(100vh-170px)] px-4 space-y-4'
    >
      {!viewHistory ? (
        <AglintAiWelcome
          slotStartOption={
            <>
              <CommandShortCuts />
              <div className='flex justify-center'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={async () => {
                    setViewList(true);
                    setViewHistory(true);
                    setCursor(0);
                    setFetchingChat(true);
                    await fetchChat(0);
                    setFetchingChat(false);
                  }}
                >
                  View History
                </Button>
              </div>
            </>
          }
          textAiHeader={
            `Good morning, ` + getFullName(recruiterUser.first_name, '')
          }
        />
      ) : (
        <>
          {fetchingChat ? (
            <>
              {Array.from({ length: 15 }).map((_, index) => (
                <SkeletonMessage key={index} />
              ))}
            </>
          ) : !viewList ? (
            <div className='flex items-center justify-center space-x-2 pt-4'>
              <Separator className='w-36' />
              <Button
                variant='outline'
                size='sm'
                onClick={async () => {
                  if (isFetchingNextPage || tempLoading) return;
                  setViewList(true);
                  await fetchChat(chatList.length);
                }}
              >
                View History
              </Button>
              <Separator className='w-36' />
            </div>
          ) : (
            <div ref={topRef} className='h-px' />
          )}
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonMessage key={index} />
              ))}
            </>
          )}
          {chatList.map((chat, ind) => (
            <MessageIndividual chat={chat} key={ind} />
          ))}
          {isResponding && <SkeletonMessage />}
          <div id='bottomRef' />
        </>
      )}
    </ScrollArea>
  );
}

export default ChatMessageList;
