import { getFullName } from '@aglint/shared-utils';
import { Divider, Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
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
    <Stack
      ref={chatContainerRef}
      spacing={'var(--space-4)'}
      sx={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 170px)',
        px: 'var(--space-4)',
      }}
    >
      <>
        {!viewHistory ? (
          <>
            <AglintAiWelcome
              slotStartOption={
                <>
                  <CommandShortCuts />
                  <Stack direction={'row'} justifyContent={'center'}>
                    <ButtonSoft
                      textButton={'View History'}
                      size={1}
                      onClickButton={{
                        onClick: async () => {
                          setViewList(true);
                          setViewHistory(true);
                          setCursor(0);
                          setFetchingChat(true);
                          await fetchChat(0);
                          setFetchingChat(false);
                        },
                      }}
                    />
                  </Stack>
                </>
              }
              textAiHeader={
                `Good morning, ` + getFullName(recruiterUser.first_name, '')
              }
            />
          </>
        ) : (
          <>
            {fetchingChat ? (
              <>
                {Array.from({ length: 15 }).map((_, index) => (
                  <SkeletonMessage key={index} />
                ))}
              </>
            ) : !viewList ? (
              <Stack
                direction={'row'}
                justifyContent={'center'}
                spacing={'var(--space-2)'}
                alignItems={'center'}
                pt={'var(--space-4)'}
              >
                <Divider sx={{ width: '150px' }} />
                <Stack>
                  <ButtonSoft
                    color={'neutral'}
                    textButton={'View History'}
                    size={1}
                    onClickButton={{
                      onClick: async () => {
                        if (isFetchingNextPage || tempLoading) {
                          return;
                        }
                        setViewList(true);
                        await fetchChat(chatList.length);
                      },
                    }}
                  />
                </Stack>

                <Divider sx={{ width: '150px' }} />
              </Stack>
            ) : (
              <div ref={topRef} style={{ height: '1px' }} />
            )}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonMessage key={index} />
                ))}
              </>
            )}
            {chatList.map((chat, ind) => {
              return <MessageIndividual chat={chat} key={ind} />;
            })}
            {isResponding && <SkeletonMessage />}
            <div id={'bottomRef'} />
          </>
        )}
      </>
    </Stack>
  );
}

export default ChatMessageList;
