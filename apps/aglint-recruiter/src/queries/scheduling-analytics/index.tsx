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
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'completed_interviews',
      ],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.completed_interviews.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  decline_requests: (
    args: SchedulingAnalyticsProcedureArgs<'decline_requests'>,
  ) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'decline_requests'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.decline_requests.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  interview_types: (
    args: SchedulingAnalyticsProcedureArgs<'interview_types'>,
  ) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'interview_types'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.interview_types.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  interviewers: (args: SchedulingAnalyticsProcedureArgs<'interviewers'>) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'interviewers'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.interviewers.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  leaderboard: (args: SchedulingAnalyticsProcedureArgs<'leaderboard'>) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'leaderboard'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.leaderboard.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  reasons: (args: SchedulingAnalyticsProcedureArgs<'reasons'>) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'reasons'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.reasons.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  recent_decline_reschedule: (
    args: SchedulingAnalyticsProcedureArgs<'recent_decline_reschedule'>,
  ) =>
    queryOptions({
      queryKey: [
        ...schedulingAnalyticsQueries.queryKey(),
        'recent_decline_reschedule',
      ],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.recent_decline_reschedule.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  tabs: (args: SchedulingAnalyticsProcedureArgs<'tabs'>) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'tabs'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
      queryFn: async () =>
        await api.scheduling.analytics.tabs.query(args, {
          context: {
            skipBatch: true,
          },
        }),
    }),
  training_progress: (
    args: SchedulingAnalyticsProcedureArgs<'training_progress'>,
  ) =>
    queryOptions({
      queryKey: [...schedulingAnalyticsQueries.queryKey(), 'training_progress'],
      enabled: !!args.recruiter_id,
      gcTime: !!args.recruiter_id ? GC_TIME : 0,
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
