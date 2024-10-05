import { type DatabaseTable } from '@aglint/shared-types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { CircleCheck, XCircle } from 'lucide-react';
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

      {type == 'waiting' && <CircleCheck className='h-4 w-4 text-gray-300' />}
      {type == 'accepted' && <CircleCheck className='h-4 w-4 text-green-600' />}
      {type == 'declined' && <XCircle className='h-4 w-4 text-green-600' />}
    </>
  );
}

export default InterviewerAcceptDeclineIcon;
