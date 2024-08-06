import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useUserChat } from '@/src/queries/userchat';
import { getFullName } from '@/src/utils/jsonResume';

import Widgets from '../Widgets';
import AgentIcon from './AgentIcon';

function MessageIndividual({
  chat,
}: {
  chat: ReturnType<typeof useUserChat>['data'][0];
}) {
  const { recruiterUser } = useAuthDetails();

  return (
    <Stack width={'100%'}>
      <Stack direction={'row'} spacing={'var(--space-2)'} width={'100%'}>
        {chat.type === 'user' ? (
          <MuiAvatar
            src={recruiterUser.profile_image}
            level={recruiterUser.first_name}
            variant='rounded'
            width='24px'
            height='24px'
          />
        ) : (
          <AgentIcon />
        )}

        <Stack spacing={'var(--space-1)'} width={'100%'}>
          <Stack direction={'row'} spacing={'var(--space-2)'}>
            <Text
              size={1}
              weight={'medium'}
              content={
                chat.type === 'agent'
                  ? 'Aglint'
                  : getFullName(
                      recruiterUser.first_name,
                      recruiterUser.last_name,
                    )
              }
            />
            <Text
              size={1}
              content={dayjsLocal(chat.created_at).fromNow()}
              color={'neutral'}
            />
          </Stack>
          {chat.metadata ? (
            <Widgets chat={chat} />
          ) : (
            <Text size={2} content={chat.title} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MessageIndividual;
