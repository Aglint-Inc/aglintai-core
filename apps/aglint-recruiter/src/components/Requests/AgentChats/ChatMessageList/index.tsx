import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import React from 'react';

import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import Loader from '@/src/components/Common/Loader';
import RequestList from '@/src/components/Requests/AgentChats/Components/RequestList';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import { useAgentIEditor } from '../AgentEditorContext';
import CommandShortCuts from '../CommandShortCuts';
import MessageIndividual from './MessageIndividual';
import SkeletonMessage from './MessageIndividual/Skeleton';

function ChatMessageList() {
  const { recruiterUser } = useAuthDetails();
  const { data, isLoading } = useUserChat({
    user_id: recruiterUser.user_id,
  });

  const { isResponding } = useAgentIEditor();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <Stack spacing={'var(--space-4)'}>
          {data.map((chat) => (
            <MessageIndividual chat={chat} key={chat.id} />
          ))}
          {isResponding && <SkeletonMessage />}
        </Stack>
      ) : (
        <AglintAiWelcome
          slotStartOption={<CommandShortCuts />}
          textAiHeader={
            `Good morning, ` + getFullName(recruiterUser.first_name, '')
          }
        />
      )}
    </>
  );
}

export default ChatMessageList;
