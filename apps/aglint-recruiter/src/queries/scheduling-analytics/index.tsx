import { queryOptions } from '@tanstack/react-query';

import { api } from '@/src/trpc/client';

import { appKey, GC_TIME } from '..';
import {
  SchedulingAnalyticsFunctions,
  SchedulingAnalyticsProcedureArgs,
} from './types';

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
        { type: args.type },
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
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'decline_requests'],
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
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'interview_types'],
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
        { type: args.type },
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
        { type: args.type },
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
        { type: args.type },
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
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'tabs'],
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
        { type: args.type },
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
} satisfies {
  // eslint-disable-next-line no-unused-vars
  [id in `${'key' | 'queryKey' | SchedulingAnalyticsFunctions}`]: any;
};
