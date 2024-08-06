import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import React from 'react';

import { AglintAiWelcome } from '@/devlink2/AglintAiWelcome';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';

import CommandShortCuts from '../CommandShortCuts';
import MessageIndividual from './MessageIndividual';

function ChatMessageList() {
  const { recruiterUser } = useAuthDetails();
  const { data, isLoading } = useUserChat({
    user_id: recruiterUser.user_id,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        <Stack spacing={'var(--space-4)'} width={'100%'}>
          {data.map((chat) => (
            <MessageIndividual chat={chat} key={chat.id} />
          ))}
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
