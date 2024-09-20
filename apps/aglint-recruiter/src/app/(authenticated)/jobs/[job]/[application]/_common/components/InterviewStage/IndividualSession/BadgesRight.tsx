import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import { UIBadge } from '@/components/Common/UIBadge';

import { type StageWithSessions } from '../../../hooks/useInterviewStages';

function BadgesRight({
  session,
}: {
  session: StageWithSessions[0]['sessions'][0];
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
    (reason) => reason.interview_session_cancel.type === 'reschedule',
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
          iconName={'Archive'}
          color={'error'}
          textBadge={'Interview Type Archived'}
        />
      )}

      {interview_meeting?.status !== 'confirmed' &&
        interview_meeting?.status !== 'completed' && (
          <>
            {calenderNotConnectedUser.length > 0 && (
              <UIBadge
                size={'sm'}
                iconName={'CalendarOff'}
                color={'error'}
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
                        iconName={'Info'}
                        color={'warning'}
                        textBadge={pausedUser.length}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='left'
                    className='border border-neutral-300 bg-neutral-700 p-2 text-xs font-normal text-neutral-50'
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
                        iconName={'CircleAlert'}
                        color={'error'}
                        textBadge={1}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='left'
                    className='border border-neutral-300 bg-neutral-700 p-2 text-xs font-normal text-neutral-50'
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
          <UIBadge
            size={'sm'}
            color={'warning'}
            iconName='RefreshCcw'
            textBadge={`${rescheduleRequests.length} Reschedule Request`}
          />
        )}
    </>
  );
}

export default BadgesRight;
