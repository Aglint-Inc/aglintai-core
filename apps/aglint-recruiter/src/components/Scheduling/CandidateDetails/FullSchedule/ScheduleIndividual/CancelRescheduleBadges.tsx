import React from 'react';

import { GlobalBadge } from '@/devlink3/GlobalBadge';

import { ScheduleIndividualCardType } from './types';

function CancelRescheduleBadges({
  cancelReasons,
}: {
  cancelReasons: ScheduleIndividualCardType['cancelReasons'];
}) {
  const cancelRequests = cancelReasons.filter(
    (reason) => reason.type === 'declined',
  );
  const rescheduleRequests = cancelReasons.filter(
    (reason) => reason.type === 'reschedule',
  );
  return (
    <>
      {cancelRequests.length > 0 && (
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
          color={'event_repeat'}
          iconName='refresh'
          textBadge={`${rescheduleRequests.length} Reschedule Request`}
          showIcon={true}
          iconSize={2}
        />
      )}
    </>
  );
}

export default CancelRescheduleBadges;
