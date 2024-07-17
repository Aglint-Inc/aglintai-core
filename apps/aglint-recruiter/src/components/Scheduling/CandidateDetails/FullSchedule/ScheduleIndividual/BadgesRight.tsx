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

  const cancelRequests = cancelReasons.filter(
    (reason) => reason.type === 'declined',
  );
  const rescheduleRequests = cancelReasons.filter(
    (reason) => reason.type === 'reschedule',
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
              <GlobalBadge
                size={1}
                showIcon={true}
                iconName={'info'}
                color={'warning'}
                textBadge={pausedUser.length}
              />
            )}
          </>
        )}

      {interview_meeting?.status !== 'cancelled' &&
        cancelRequests.length > 0 && (
          <GlobalBadge
            color={'error'}
            iconName='event_busy'
            textBadge={`${cancelRequests.length} Cancel Request`}
            showIcon={true}
            iconSize={2}
          />
        )}

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
