import {
  styled,
  Tooltip,
  tooltipClasses,
  type TooltipProps,
} from '@mui/material';

import { UIBadge } from '@/components/Common/UIBadge';
import { type StageWithSessions } from '@/queries/application';

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

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'bg-neutral-700',
      border: '1px solid border-neutral-300',
      color: 'text-neutral-50',
      fontSize: 'text-xs',
      fontWeight: '400',
    },
  }));

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
              <LightTooltip
                enterDelay={100}
                enterNextDelay={100}
                PopperProps={{
                  style: {
                    marginTop: '0px', // Adjust this value to reduce the top margin
                  },
                }}
                sx={{
                  '& .MuiTooltip-tooltip': {
                    padding: '0px 10px',
                    fontSize: '5px',
                  },
                }}
                placement='left'
                title={
                  <>
                    <span
                      style={{
                        fontSize: 'text-xs',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${pausedUser.length} Interviewer${pausedUser.length > 1 ? 's' : ''} paused`,
                      }}
                    ></span>
                  </>
                }
              >
                <div className="flex flex-col">
                  <UIBadge
                    size={'sm'}
                    iconName={'Info'}
                    color={'warning'}
                    textBadge={pausedUser.length}
                  />
                </div>
              </LightTooltip>
            )}
            {allUsers.length === 0 && (
              <LightTooltip
                enterDelay={100}
                enterNextDelay={100}
                PopperProps={{
                  style: {
                    marginTop: '0px', // Adjust this value to reduce the top margin
                  },
                }}
                sx={{
                  '& .MuiTooltip-tooltip': {
                    padding: '0px 10px',
                    fontSize: '5px',
                  },
                }}
                placement='left'
                title={
                  <>
                    <span
                      style={{
                        fontSize: 'text-xs',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `No interviewers assigned`,
                      }}
                    ></span>
                  </>
                }
              >
                <div className="flex flex-col">
                  <UIBadge
                    size={'sm'}
                    iconName={'CircleAlert'}
                    color={'error'}
                    textBadge={1}
                  />
                </div>
              </LightTooltip>
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
