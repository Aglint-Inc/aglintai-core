import { type DatabaseTable } from '@aglint/shared-types';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
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
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {loading ? (
              <Skeleton className='w-5 h-7' />
            ) : (
              (processedData.grouping_unit_a.completed || []).length || 0
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-[130px] h-5' />
            ) : (
              `${Math.round(percentChange((processedData.grouping_unit_a.completed || []).length, (processedData.grouping_unit_b.completed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waiting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {loading ? (
              <Skeleton className='w-5 h-7' />
            ) : (
              (processedData.grouping_unit_a.waiting || []).length || 0
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-[130px] h-5' />
            ) : (
              `${Math.round(percentChange((processedData.grouping_unit_a.waiting || []).length, (processedData.grouping_unit_b.waiting || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confirmed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {loading ? (
              <Skeleton className='w-5 h-7' />
            ) : (
              (processedData.grouping_unit_a.confirmed || []).length || 0
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-[130px] h-5' />
            ) : (
              `${Math.round(percentChange((processedData.grouping_unit_a.confirmed || []).length, (processedData.grouping_unit_b.confirmed || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Not Scheduled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {loading ? (
              <Skeleton className='w-5 h-7' />
            ) : (
              (processedData.grouping_unit_a.not_scheduled || []).length || 0
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-[130px] h-5' />
            ) : (
              `${Math.round(percentChange((processedData.grouping_unit_a.not_scheduled || []).length, (processedData.grouping_unit_b.not_scheduled || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cancelled</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {loading ? (
              <Skeleton className='w-5 h-7' />
            ) : (
              (processedData.grouping_unit_a.cancelled || []).length || 0
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            {loading ? (
              <Skeleton className='w-[130px] h-5' />
            ) : (
              `${Math.round(percentChange((processedData.grouping_unit_a.cancelled || []).length, (processedData.grouping_unit_b.cancelled || []).length))}% from last ${capitalizeFirstLetter(groupingUnit)}`
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const percentChange = (a: number, b: number) => {
  return 100 * Math.abs((a - b) / (b || 1));
};
