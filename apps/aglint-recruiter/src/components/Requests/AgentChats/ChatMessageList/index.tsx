import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

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
      className='h-[calc(100vh-180px)] px-4 space-y-4'
    >
      {!viewHistory ? (
        <div className='p-4 h-[calc(100vh-180px)] flex flex-col items-center justify-center gap-4'>
          <div>
            <svg
              width='244'
              height='108'
              viewBox='0 0 244 108'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M193.185 7.21883V33.6247C193.185 36.9922 190.451 39.7263 187.084 39.7263H56.9142C53.5467 39.7263 50.8125 36.9922 50.8125 33.6247V7.21883C50.8125 3.85133 53.5467 1.11719 56.9142 1.11719H187.084C190.451 1.11719 193.185 3.85133 193.185 7.21883Z'
                fill='#F1F0EF'
                stroke='#FDFDFC'
                stroke-width='2.03389'
              />
              <path
                d='M219.625 29.5906V66.2696C219.625 70.7596 215.98 74.4051 211.49 74.4051H32.5067C28.0167 74.4051 24.3711 70.7596 24.3711 66.2696V29.5906C24.3711 25.1006 28.0167 21.4551 32.5067 21.4551H211.49C215.98 21.4551 219.625 25.1006 219.625 29.5906Z'
                fill='#F1F0EF'
                stroke='#FDFDFC'
                stroke-width='2.03389'
              />
              <path
                d='M242 51.9643V96.7097C242 102.322 237.443 106.879 231.831 106.879H12.1695C6.55695 106.879 2 102.322 2 96.7097V51.9643C2 46.3518 6.55695 41.7949 12.1695 41.7949H231.831C237.443 41.7949 242 46.3518 242 51.9643Z'
                fill='#E9E8E6'
                stroke='#FDFDFC'
                stroke-width='2.03389'
              />
            </svg>
          </div>
          <div className='text-center flex flex-col gap-2'>
            <UITypography type='small'>
              {`Good morning, ${getFullName(recruiterUser.first_name, '')}. I am Aglint AI, your Scheduling co-pilot.`}
            </UITypography>
            <UITypography variant='p' type='extraSmall' color='gray-500'>
              Aglint AI makes scheduling and rescheduling interviews easy.
            </UITypography>
          </div>
          <div className='flex items-center justify-center w-full mt-4'>
            <div className='border-t border-gray-300 flex-grow'></div>
            <UITypography type='small' color='gray-500' className='mx-4'>
              Getting started? Try these:
            </UITypography>
            <div className='border-t border-gray-300 flex-grow'></div>
          </div>
          <div className='mt-4 flex flex-col gap-2 w-full'>
            <CommandShortCuts />
            <div className='flex justify-center mt-4'>
              <UIButton
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
              </UIButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          {fetchingChat ? (
            <>
              {Array.from({ length: 15 }).map((_, index) => (
                <SkeletonMessage key={index} />
              ))}
            </>
          ) : !viewList ? (
            <div className='flex items-center justify-center space-x-2 py-4'>
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
