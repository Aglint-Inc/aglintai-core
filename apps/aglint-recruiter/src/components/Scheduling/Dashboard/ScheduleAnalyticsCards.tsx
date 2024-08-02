import { DatabaseTable } from '@aglint/shared-types';
import { Skeleton } from '@mui/material';
import React from 'react';

import { ScheduleCountStats } from '@/devlink3/ScheduleCountStats';
import { useScheduleSessionsAnalytics } from '@/src/queries/scheduling-dashboard';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
type scheduleType = {
  interview_meeting: DatabaseTable['interview_meeting'];
  interview_schedule: DatabaseTable['interview_schedule'];
  interview_session: DatabaseTable['interview_session'];
};
type sessionStatusType = DatabaseTable['interview_meeting']['status'];

type processDataType = {
  grouping_unit_a: {
    /* eslint-disable no-unused-vars */
    [key in sessionStatusType]: scheduleType[];
  };
  grouping_unit_b: {
    [key in sessionStatusType]: scheduleType[];
  };
  /* eslint-enable no-unused-vars */
};
export default function ScheduleAnalyticsCards() {
  const groupingUnit: 'week' | 'month' | 'year' = 'month';
  const { data: analyticData, isPending: loading } =
    useScheduleSessionsAnalytics();
  const processedData = (analyticData || []).reduce(
    (acc, curr) => {
      if (groupingUnit === 'month') {
        const date = new Date();
        const barrier = new Date(date.getFullYear(), date.getMonth(), 1);
        const session_date = new Date(
          ['not_scheduled', 'waiting'].includes(curr.interview_meeting.status)
            ? curr.interview_meeting.created_at
            : curr.interview_meeting.start_time,
        );
        if (barrier < session_date) {
          const temp =
            acc.grouping_unit_a?.[curr.interview_meeting.status] || [];
          acc.grouping_unit_a[curr.interview_meeting.status] = [...temp, curr];
        } else {
          const temp =
            acc.grouping_unit_b?.[curr.interview_meeting.status] || [];
          acc.grouping_unit_b[curr.interview_meeting.status] = [...temp, curr];
        }
      }
      return acc;
    },
    { grouping_unit_a: {}, grouping_unit_b: {} } as processDataType,
  );

  return (
    <ScheduleCountStats
      textCompletedCount={
        loading ? (
          <Skeleton variant='rounded' width={20} height={28} sx={{backgroundColor:'var(--neutral-5)'}}/>
        ) : (
          (processedData.grouping_unit_a.completed || []).length || 0
        )
      }
      textIncreasedCompleted={
        loading || false ? (
          <Skeleton variant='rounded' width={130} height={20} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.completed || []).length, (processedData.grouping_unit_b.completed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textWaitingCount={
        loading ? (
          <Skeleton variant='rounded' width={20} height={28} sx={{backgroundColor:'var(--neutral-5)'}}/>
        ) : (
          (processedData.grouping_unit_a.waiting || []).length || 0
        )
      }
      textIncreasedWaiting={
        loading || false ? (
          <Skeleton variant='rounded' width={130} height={20} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.waiting || []).length, (processedData.grouping_unit_b.waiting || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textConfirmedCount={
        loading ? (
          <Skeleton variant='rounded' width={20} height={28} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          (processedData.grouping_unit_a.confirmed || []).length || 0
        )
      }
      textIncreasedConfirmed={
        loading || false ? (
          <Skeleton variant='rounded' width={130} height={20} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.confirmed || []).length, (processedData.grouping_unit_b.confirmed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textNotScheduledCount={
        loading ? (
          <Skeleton variant='rounded' width={20} height={28} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          (processedData.grouping_unit_a.not_scheduled || []).length || 0
        )
      }
      textIncreasedNotScheduled={
        loading || false ? (
          <Skeleton variant='rounded' width={130} height={20} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.not_scheduled || []).length, (processedData.grouping_unit_b.not_scheduled || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textCancelledCount={
        loading ? (
          <Skeleton variant='rounded' width={20} height={28} sx={{backgroundColor:'var(--neutral-5)'}} />
        ) : (
          (processedData.grouping_unit_a.cancelled || []).length || 0
        )
      }
      textIncreasedCancelled={
        loading || false ? (
          <Skeleton variant='rounded' width={130} height={20} sx={{backgroundColor:'var(--neutral-5)'}}/>
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.cancelled || []).length, (processedData.grouping_unit_b.cancelled || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
    />
  );
}

const percentChange = (a: number, b: number) => {
  return 100 * Math.abs((a - b) / (b || 1));
};
