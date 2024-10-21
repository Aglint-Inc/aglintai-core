import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns';

import { useTenant } from '@/company/hooks';
import type { InterviewCount } from '@/routers/analytics/interview_count';
import { type InterviewDecline } from '@/routers/analytics/interview_decline';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useAnalyticsContext } from '../../context/AnalyticsContext/AnalyticsContextProvider';

const useInterviewCountProcedure = (
  input: InterviewCount['input'],
): ProcedureQuery<InterviewCount> =>
  api.analytics.interview_count.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export function useInterviewCount(unit: 'today' | 'day' | 'week' | 'month') {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data, isFetching, isError } = useInterviewCountProcedure({
    recruiter_id: recruiter.id,
    job_id: filters.job,
    location_id: filters.location,
    department_id: filters.department,
    data_range: filters.dateRange,
  });

  const groupedData = data
    ? groupByDate(data, unit, filters.dateRange, {
        cancelled: 0,
        confirmed: 0,
        completed: 0,
        not_scheduled: 0,
        reschedule: 0,
        waiting: 0,
      })
    : {};
  const average = Object.entries(
    Object.entries(groupedData).reduce(
      (acc, curr) => {
        Object.entries(curr[1]).forEach(([key, value]) => {
          const tempKey = key as unknown as keyof typeof acc;
          acc[tempKey] = (acc[tempKey] || 0) + value;
        });
        return acc;
      },

      {} as {
        // eslint-disable-next-line no-unused-vars
        [key in NonNullable<typeof data>[number]['status']]?: number;
      },
    ) || {},
  ).map(([name, value]) => ({
    name: capitalizeFirstLetter(name),
    value,
  }));
  return {
    average,
    groupedData: Object.entries(groupedData || {})
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, data]) => ({
        ...data,
        date,
      })),
    isFetching,
    isError,
  };
}

const useInterviewDecline = (
  input: InterviewDecline['input'],
): ProcedureQuery<InterviewDecline> =>
  api.analytics.interview_decline.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export function useDeclineCount() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data, isFetching, isError } = useInterviewDecline({
    recruiter_id: recruiter.id,
    job_id: filters.job,
    location_id: filters.location,
    department_id: filters.department,
    data_range: filters.dateRange,
  });
  const groupedData = data
    ? //@ts-ignore
      groupByDate(data, 'day', filters.dateRange, { cancelled: 0 })
    : {};
  return {
    average: Object.values(groupedData)
      .map((i) => i.cancelled || 0)
      .reduce((a, b) => a + b, 0),
    scatterData: Object.entries(groupedData).map((item) => ({
      date: item[0],
      cancelled: item[1].cancelled || null,
    })),
    isFetching,
    isError,
  };
}

function groupByDate<T extends { [key: string]: number }>(
  data: {
    created_at?: string;
    status?: keyof T;
  }[],
  groupBy: 'today' | 'day' | 'week' | 'month' = 'day',
  dateRange: { from: Date; to: Date } | null,
  baseData: T = {} as T,
) {
  const start =
    dateRange?.from || new Date(new Date().setDate(new Date().getDate() - 30));
  const end = dateRange?.to || new Date(new Date().setHours(23, 59, 59, 999));

  let dateIntervals: Date[] = [];

  // Generate the date intervals based on the groupBy parameter
  switch (groupBy) {
    case 'today':
      dateIntervals = [new Date(new Date().setHours(0, 0, 0, 0))];
      break;
    case 'day':
      dateIntervals = eachDayOfInterval({ start, end });
      break;
    case 'week':
      dateIntervals = eachWeekOfInterval({ start, end });
      break;
    case 'month':
      dateIntervals = eachMonthOfInterval({ start, end });
      break;
  }
  const grouped = data.reduce(
    (acc, curr) => {
      let dateKey = '';
      const createdAtDate = new Date(curr.created_at || '');
      dateKey = getGroupKey(dateKey, createdAtDate);
      acc[dateKey] = (acc[dateKey] || { ...baseData }) as (typeof acc)[string];

      if (curr.status) {
        acc[dateKey][curr.status] = (acc[dateKey][curr.status] || 0) + 1;
      }
      return acc;
    },
    {} as Record<
      string,
      {
        // eslint-disable-next-line no-unused-vars
        [key in NonNullable<(typeof data)[number]['status']>]?: number;
      }
    >,
  );

  dateIntervals.forEach((interval) => {
    let intervalKey = '';
    intervalKey = getGroupKey(intervalKey, interval);
    if (!grouped[intervalKey]) {
      grouped[intervalKey] = { ...baseData };
    }
  });

  return grouped;

  function getGroupKey(dateKey: string, createdAtDate: Date) {
    switch (groupBy) {
      case 'day':
        dateKey = format(createdAtDate, 'yyyy-MM-dd');
        break;
      case 'week': {
        const weekStart = startOfWeek(createdAtDate);
        const weekEnd = endOfWeek(createdAtDate);
        dateKey =
          format(weekStart, 'yyyy-MM-dd') + ' to ' + format(weekEnd, 'MM-dd');
        break;
      }
      case 'month':
        dateKey = format(createdAtDate, 'yyyy-MM');
        break;
    }
    return dateKey;
  }
}
