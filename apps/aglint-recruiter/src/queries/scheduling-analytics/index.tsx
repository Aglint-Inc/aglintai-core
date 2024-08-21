import { queryOptions } from '@tanstack/react-query';

import { api } from '@/src/trpc/client';

import { appKey, argsToKeys, GC_TIME } from '..';
import {
  SchedulingAnalyticsFunctions,
  SchedulingAnalyticsProcedureArgs,
} from './types';

const schedulingArgsToKeys = <
  T extends SchedulingAnalyticsProcedureArgs<SchedulingAnalyticsFunctions>,
>({
  // eslint-disable-next-line no-unused-vars
  recruiter_id,
  ...args
}: T) => argsToKeys(args);

export const schedulingAnalyticsQueries = {
  key: () => 'scheduling-analytics' as const,
  queryKey: () => [appKey, schedulingAnalyticsQueries.key()],
  completed_interviews: (
    args: SchedulingAnalyticsProcedureArgs<'completed_interviews'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'completed_interviews',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.completed_interviews.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  decline_requests: (
    args: SchedulingAnalyticsProcedureArgs<'decline_requests'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'decline_requests',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.decline_requests.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  interview_types: (
    args: SchedulingAnalyticsProcedureArgs<'interview_types'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'interview_types',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.interview_types.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  interviewers: (
    args: SchedulingAnalyticsProcedureArgs<'interviewers'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'interviewers',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.interviewers.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  leaderboard: (
    args: SchedulingAnalyticsProcedureArgs<'leaderboard'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'leaderboard',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.leaderboard.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  reasons: (
    args: SchedulingAnalyticsProcedureArgs<'reasons'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'reasons',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.reasons.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  recent_decline_reschedule: (
    args: SchedulingAnalyticsProcedureArgs<'recent_decline_reschedule'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'recent_decline_reschedule',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.recent_decline_reschedule.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  tabs: (
    args: SchedulingAnalyticsProcedureArgs<'tabs'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'tabs',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.tabs.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  training_progress: (
    args: SchedulingAnalyticsProcedureArgs<'training_progress'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'training_progress',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.training_progress.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  filters: (
    args: SchedulingAnalyticsProcedureArgs<'filters'>,
    enabled: boolean = true,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'filters',
        ...schedulingArgsToKeys(args),
      ],
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.filters.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
} satisfies {
  // eslint-disable-next-line no-unused-vars
  [id in `${'key' | 'queryKey' | SchedulingAnalyticsFunctions}`]: any;
};
