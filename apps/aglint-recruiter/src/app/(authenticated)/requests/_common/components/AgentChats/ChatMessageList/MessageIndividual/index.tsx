import { type FunctionNames } from '@aglint/shared-types/src/aglintApi/supervisor/functions';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Image from 'next/image';

import { useTenant } from '@/company/hooks';

import { type ChatType } from '../hooks/fetch';
import Widgets from '../Widgets';
import CustomTypographyLink from './CustomTypographyLink';

function MessageIndividual({ chat }: { chat: ChatType }) {
  const { recruiter_user } = useTenant();

  const definedUi: FunctionNames[] = [
    'fetch_scheduled_interviews',
    'fetch_user_requests',
    'fetch_candidate_declined_interviews',
  ];

  const replaceLinks =
    chat?.metadata
      ?.flatMap((ele) => ele?.links?.map((link) => link))
      .filter((ele) => ele !== undefined) || [];

  return (
    <div className='w-full' id={chat.id}>
      <div className='flex w-full flex-row space-x-2'>
        {chat.type === 'user' ? (
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={recruiter_user.profile_image ?? ''}
              alt={recruiter_user.first_name}
            />
            <AvatarFallback>
              {recruiter_user.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Image
            src='/agent/agent-icon.svg'
            alt='Agent Icon'
            width={32}
            height={32}
          />
        )}

        <div className='flex w-full flex-col space-y-1'>
          <div className='flex flex-row space-x-2'>
            <p className='text-sm font-semibold'>
              {chat.type === 'agent'
                ? 'Aglint'
                : getFullName(
                    recruiter_user.first_name,
                    recruiter_user.last_name,
                  )}
            </p>
            <p className='text-sm text-muted-foreground'>
              {dayjsLocal(chat.created_at).fromNow()}
            </p>
          </div>
          {chat?.function && definedUi.includes(chat.function) ? (
            <Widgets chat={chat} />
          ) : (
            <CustomTypographyLink
              text={chat?.content ?? ''}
              links={replaceLinks}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageIndividual;
