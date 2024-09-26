import { type DatabaseTable } from '@aglint/shared-types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { CircleCheck, CircleDashed, XCircle } from 'lucide-react';
import React from 'react';

import { UIBadge } from '../UIBadge';

function InterviewerAcceptDeclineIcon({
  type,
}: {
  type: DatabaseTable['interview_session_relation']['accepted_status'];
}) {
  return (
    <>
      {type === 'request_reschedule' && (
        <Tooltip>
          <TooltipTrigger>
            <div className='flex flex-col'>
              <UIBadge
                iconName={'CalendarSearch'}
                size={'sm'}
                color={'warning'}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className='text-sm'>Requested Reschedule</p>
          </TooltipContent>
        </Tooltip>
      )}

      {type == 'waiting' && <CircleDashed className='w-4 h-4 ml-2' />}
      {type == 'accepted' && <CircleCheck className='w-4 h-4  ml-2' />}
      {type == 'declined' && <XCircle className='w-4 h-4  ml-2' />}
    </>
  );
}

export default InterviewerAcceptDeclineIcon;
