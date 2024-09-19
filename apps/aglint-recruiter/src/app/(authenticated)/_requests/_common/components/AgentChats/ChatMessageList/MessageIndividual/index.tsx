import { type FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';

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
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={recruiterUser.profile_image}
              alt={recruiterUser.first_name}
            />
            <AvatarFallback>
              {recruiterUser.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
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
