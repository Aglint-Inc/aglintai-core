import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useEffect, useRef } from 'react';

import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import { useAgentIEditor } from '../AgentEditorContext';
import CommandShortCuts from '../CommandShortCuts';
import MessageIndividual from './MessageIndividual';
import SkeletonMessage from './MessageIndividual/Skeleton';
import { useScrollListenerAgentChat } from './hooks';

function ChatMessageList() {
  const { recruiterUser } = useAuthDetails();
  const { data, isLoading, isFetchingNextPage } = useUserChat({
    user_id: recruiterUser.user_id,
  });
  const { isResponding } = useAgentIEditor();

  // Reversing the list to show newest messages at the bottom
  const list =
    data?.pages
      ?.flatMap((d) => d)
      ?.flatMap((m) => m.list)
      .reverse() || [];

  const { topRef, chatContainerRef } = useScrollListenerAgentChat();

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
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonMessage key={index} />
          ))}
        </>
      ) : list && list.length > 0 ? (
        <>
          <div ref={topRef} style={{ height: '1px' }} />
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonMessage key={index} />
              ))}
            </>
          )}
          {list.map((chat) => {
            return <MessageIndividual chat={chat} key={chat.id} />;
          })}
          {isResponding && <SkeletonMessage />}
          <div id={'bottomRef'} />
        </>
      ) : (
        <AglintAiWelcome
          slotStartOption={<CommandShortCuts />}
          textAiHeader={
            `Good morning, ` + getFullName(recruiterUser.first_name, '')
          }
        />
      )}
    </Stack>
  );
}

export default ChatMessageList;
