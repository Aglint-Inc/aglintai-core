import {
  type TooltipProps,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
} from '@mui/material';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { type StageWithSessions } from '@/src/queries/application';

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
      backgroundColor: 'var(--neutral-11)',
      border: '1px solid var(--neutral-6)',
      color: 'var(--neutral-1)',
      boxShadow: 'none',
      fontSize: 'var(--font-size-1)',
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
        <GlobalBadge
          size={1}
          showIcon={true}
          iconName={'warning'}
          color={'error'}
          textBadge={'Interview Type Archived'}
        />
      )}

      {interview_meeting?.status !== 'confirmed' &&
        interview_meeting?.status !== 'completed' && (
          <>
            {calenderNotConnectedUser.length > 0 && (
              <GlobalBadge
                size={1}
                showIcon={true}
                iconName={'warning'}
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
                        fontSize: 'var(--font-size-1)',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `${pausedUser.length} Interviewer${pausedUser.length > 1 ? 's' : ''} paused`,
                      }}
                    ></span>
                  </>
                }
              >
                <Stack>
                  <GlobalBadge
                    size={1}
                    showIcon={true}
                    iconName={'info'}
                    color={'warning'}
                    textBadge={pausedUser.length}
                  />
                </Stack>
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
                        fontSize: 'var(--font-size-1)',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `No interviewers assigned`,
                      }}
                    ></span>
                  </>
                }
              >
                <Stack>
                  <GlobalBadge
                    size={1}
                    showIcon={true}
                    iconName={'warning'}
                    color={'error'}
                    textBadge={1}
                  />
                </Stack>
              </LightTooltip>
            )}
          </>
        )}

      {rescheduleRequests.length > 0 &&
        interview_meeting?.status !== 'completed' &&
        interview_meeting?.status !== 'cancelled' && (
          <GlobalBadge
            color={'warning'}
            iconName='refresh'
            textBadge={`${rescheduleRequests.length} Reschedule Request`}
            showIcon={true}
            iconSize={2}
          />
        )}
    </>
  );
}

export default BadgesRight;
