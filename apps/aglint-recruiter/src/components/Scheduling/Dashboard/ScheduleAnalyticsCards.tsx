import { type DatabaseTable } from '@aglint/shared-types';
import { Skeleton } from '@components/ui/skeleton';
import { ScheduleCountStats } from '@devlink3/ScheduleCountStats';
import React from 'react';

import { useScheduleSessionsAnalytics } from '@/queries/scheduling-dashboard';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
type scheduleType = {
  interview_meeting: DatabaseTable['interview_meeting'];
  interview_session: DatabaseTable['interview_session'];
};
type sessionStatusType = DatabaseTable['interview_meeting']['status'];

type processDataType = {
  grouping_unit_a: {
    /* eslint-disable no-unused-vars */
    [_key in sessionStatusType]: scheduleType[];
  };
  grouping_unit_b: {
    [_key in sessionStatusType]: scheduleType[];
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
          <Skeleton className='w-5 h-7' />
        ) : (
          (processedData.grouping_unit_a.completed || []).length || 0
        )
      }
      textIncreasedCompleted={
        loading ? (
          <Skeleton className='w-[130px] h-5' />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.completed || []).length, (processedData.grouping_unit_b.completed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textWaitingCount={
        loading ? (
          <Skeleton className='w-5 h-7' />
        ) : (
          (processedData.grouping_unit_a.waiting || []).length || 0
        )
      }
      textIncreasedWaiting={
        loading ? (
          <Skeleton className='w-[130px] h-5' />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.waiting || []).length, (processedData.grouping_unit_b.waiting || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textConfirmedCount={
        loading ? (
          <Skeleton className='w-5 h-7' />
        ) : (
          (processedData.grouping_unit_a.confirmed || []).length || 0
        )
      }
      textIncreasedConfirmed={
        loading ? (
          <Skeleton className='w-[130px] h-5' />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.confirmed || []).length, (processedData.grouping_unit_b.confirmed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textNotScheduledCount={
        loading ? (
          <Skeleton className='w-5 h-7' />
        ) : (
          (processedData.grouping_unit_a.not_scheduled || []).length || 0
        )
      }
      textIncreasedNotScheduled={
        loading ? (
          <Skeleton className='w-[130px] h-5' />
        ) : (
          `${Math.round(percentChange((processedData.grouping_unit_a.not_scheduled || []).length, (processedData.grouping_unit_b.not_scheduled || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
        )
      }
      textCancelledCount={
        loading ? (
          <Skeleton className='w-5 h-7' />
        ) : (
          (processedData.grouping_unit_a.cancelled || []).length || 0
        )
      }
      textIncreasedCancelled={
        loading ? (
          <Skeleton className='w-[130px] h-5' />
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
