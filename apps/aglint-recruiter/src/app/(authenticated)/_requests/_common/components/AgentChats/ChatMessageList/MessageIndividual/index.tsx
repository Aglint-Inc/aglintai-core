import { type FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { type ChatType } from '../hooks/fetch';
import Widgets from '../Widgets';
import AgentIcon from './AgentIcon';
import CustomTypographyLink from './CustomTypographyLink';

function MessageIndividual({ chat }: { chat: ChatType }) {
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
    <div className='w-full' id={chat.id}>
      <div className='flex w-full flex-row space-x-2'>
        {chat.type === 'user' ? (
          <MuiAvatar
            src={recruiterUser.profile_image}
            level={recruiterUser.first_name}
            width='24px'
            height='24px'
          />
        ) : (
          <AgentIcon />
        )}

        <div className='flex w-full flex-col space-y-1'>
          <div className='flex flex-row space-x-2'>
            <p className='text-sm font-semibold'>
              {chat.type === 'agent'
                ? 'Aglint'
                : getFullName(
                    recruiterUser.first_name,
                    recruiterUser.last_name,
                  )}
            </p>
            <p className='text-sm text-muted-foreground'>
              {dayjsLocal(chat.created_at).fromNow()}
            </p>
          </div>
          {definedUi.includes(chat.function) ? (
            <Widgets chat={chat} />
          ) : (
            <CustomTypographyLink text={chat.content} links={replaceLinks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageIndividual;
