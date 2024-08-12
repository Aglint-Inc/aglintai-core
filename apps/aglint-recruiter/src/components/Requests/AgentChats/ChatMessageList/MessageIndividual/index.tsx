import { FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';

import { Text } from '@/devlink/Text';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ChatType, useUserChat } from '@/src/queries/userchat';
import { getFullName } from '@/src/utils/jsonResume';

import Widgets from '../Widgets';
import AgentIcon from './AgentIcon';
import CustomTypographyLink from './CustomTypographyLink';

function MessageIndividual({
  chat,
}: {
  chat: ChatType;
}) {
  const { recruiterUser } = useAuthDetails();

  const definedUi: FunctionNames[] = [
    'fetch_scheduled_interviews',
    'fetch_user_requests',
    'fetch_candidate_declined_interviews',
  ];

  const replaceLinks =
    chat?.metadata
      ?.flatMap((ele) => ele?.links?.map((link) => link))
      .filter(Boolean) || [];

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
          {definedUi.includes(chat.function) ? (
            <Widgets chat={chat} />
          ) : (
            <CustomTypographyLink text={chat.content} links={replaceLinks} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MessageIndividual;
