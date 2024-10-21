import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { UIBadge } from '@components/ui-badge';
import {
  Archive,
  CalendarOff,
  CircleAlert,
  Info,
  RefreshCcw,
} from 'lucide-react';

import { type StageWithSessions } from '../../../hooks/useInterviewStages';

function BadgesRight({
  session,
}: {
  session: NonNullable<StageWithSessions>[0]['sessions'][0];
}) {
  let allUsers = session.users;
  const interview_meeting = session.interview_meeting;
  const interview_module = session.interview_module;
  const users = session.users;
  const cancelReasons = session.cancel_reasons;

  if (
    interview_meeting?.status === 'confirmed' ||
    interview_meeting?.status === 'completed'
  ) {
    allUsers = users?.filter(
      (user) => user.interview_session_relation.is_confirmed,
    );
  }

  const rescheduleRequests = cancelReasons.filter(
    (reason) =>
      reason.interview_session_cancel.type === 'candidate_request_reschedule',
  );

  const pausedUser = users.filter(
    (user) => !!user?.interview_module_relation?.pause_json,
  );
  const calenderNotConnectedUser = users.filter(
    (user) => !user.user_details.is_calendar_connected,
  );

  return (
    <>
      {interview_module?.is_archived && (
        <UIBadge
          size={'sm'}
          icon={Archive}
          variant={'destructive'}
          textBadge={'Interview Type Archived'}
        />
      )}

      {interview_meeting?.status !== 'confirmed' &&
        interview_meeting?.status !== 'completed' && (
          <>
            {calenderNotConnectedUser.length > 0 && (
              <UIBadge
                size={'sm'}
                icon={CalendarOff}
                variant={'destructive'}
                textBadge={calenderNotConnectedUser.length}
              />
            )}
            {pausedUser.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='flex flex-col'>
                      <UIBadge
                        size={'sm'}
                        icon={Info}
                        variant={'warning'}
                        textBadge={pausedUser.length}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='left'
                    className='border border-neutral-300 bg-neutral-700 p-2 text-xs font-normal text-muted-foreground'
                  >
                    {`${pausedUser.length} Interviewer${pausedUser.length > 1 ? 's' : ''} paused`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {allUsers.length === 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className='flex flex-col'>
                      <UIBadge
                        size={'sm'}
                        icon={CircleAlert}
                        variant={'destructive'}
                        textBadge={1}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='left'
                    className='border border-border bg-muted p-2 text-xs font-normal text-muted-foreground'
                  >
                    No interviewers assigned
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </>
        )}

      {rescheduleRequests.length > 0 &&
        interview_meeting?.status !== 'completed' &&
        interview_meeting?.status !== 'cancelled' && (
          <>
            <UIBadge
              size={'sm'}
              variant={'warning'}
              icon={RefreshCcw}
              textBadge={`${rescheduleRequests.length} Reschedule Request`}
            />
          </>
        )}
    </>
  );
}

export default BadgesRight;
