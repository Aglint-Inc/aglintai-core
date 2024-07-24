import {
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import React from 'react';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { SchedulingApplication } from '../../store';
import { ScheduleIndividualCardType } from './types';

function BadgesRight({
  interview_module,
  interview_meeting,
  cancelReasons,
  users,
}: {
  interview_module: SchedulingApplication['initialSessions'][0]['interview_module'];
  interview_meeting: ScheduleIndividualCardType['interview_meeting'];
  cancelReasons: ScheduleIndividualCardType['cancelReasons'];
  users: SchedulingApplication['initialSessions'][0]['users'];
}) {
  const { recruiter } = useAuthDetails();

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

  // const cancelRequests = cancelReasons.filter(
  //   (reason) => reason.interview_session_cancel.type === 'declined',
  // );
  const rescheduleRequests = cancelReasons.filter(
    (reason) => reason.interview_session_cancel.type === 'reschedule',
  );

  const pausedUser = users.filter(
    (user) => !!user?.interview_module_relation?.pause_json,
  );
  const calenderNotConnectedUser = users.filter(
    (user) =>
      !(
        (!!recruiter.service_json &&
          recruiter.email.split('@')[1] ===
            user.user_details.email.split('@')[1]) ||
        !!(user.user_details.schedule_auth as any)?.access_token
      ),
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
          </>
        )}

      {/* {interview_meeting?.status !== 'cancelled' && // when cancelled it should not show
        cancelRequests.length > 0 && (
          <GlobalBadge
            color={'error'}
            iconName='event_busy'
            textBadge={`${cancelRequests.length} Cancel Request`}
            showIcon={true}
            iconSize={2}
          />
        )} */}

      {rescheduleRequests.length > 0 && (
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
