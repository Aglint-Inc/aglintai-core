import { getFullName } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import Image from 'next/image';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

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
  const { recruiter_user } = useTenant();
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
      className='h-[calc(100vh-180px)] space-y-4 px-4'
    >
      {!viewHistory ? (
        <div className='flex h-[calc(100vh-180px)] flex-col items-center justify-center gap-4 p-4'>
          <div>
            <Image
              src='/images/agent/card-stack.svg'
              alt='Card Stack'
              width={244}
              height={108}
            />
          </div>
          <div className='flex flex-col gap-2 text-center'>
            <UITypography type='small'>
              {`Good morning, ${getFullName(recruiter_user.first_name, '')}. I am Aglint AI, your Scheduling co-pilot.`}
            </UITypography>
            <UITypography variant='p' type='extraSmall' color='gray-500'>
              Aglint AI makes scheduling and rescheduling interviews easy.
            </UITypography>
          </div>
          <div className='mt-4 flex w-full items-center justify-center'>
            <div className='flex-grow border-t border-gray-300'></div>
            <UITypography type='small' color='gray-500' className='mx-4'>
              Getting started? Try these:
            </UITypography>
            <div className='flex-grow border-t border-gray-300'></div>
          </div>
          <div className='mt-4 flex w-full flex-col gap-2'>
            <CommandShortCuts />
            <div className='mt-4 flex justify-center'>
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
