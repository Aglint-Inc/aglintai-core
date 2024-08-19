import { z } from 'zod';

import { SchedulingAnalyticsFunctions } from '@/src/queries/scheduling-analytics/types';

import { createTRPCRouter, privateProcedure } from '../../trpc';

export const schedulingAnalyticsRouter = createTRPCRouter({
  completed_interviews: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        type: z.enum(['day', 'month']).optional(),
        jobs: z.array(z.string().uuid()).optional(),
      }),
    )
    .query(
      async ({ ctx: { db }, input: { recruiter_id, type, jobs } }) =>
        (
          await db
            .rpc('scheduling_analytics_completed_interviews', {
              recruiter_id,
              type,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  decline_requests: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, end_time, jobs, start_time },
      }) =>
        (
          await db
            .rpc('scheduling_analytics_decline_requests', {
              recruiter_id,
              end_time,
              jobs,
              start_time,
            })
            .throwOnError()
        ).data,
    ),
  interview_types: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
      }),
    )
    .query(
      async ({ ctx: { db }, input: { recruiter_id, jobs } }) =>
        (
          await db
            .rpc('scheduling_analytics_interview_types', {
              recruiter_id,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  interviewers: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
        type: z.enum(['training', 'qualified']).optional(),
      }),
    )
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, end_time, jobs, start_time, type },
      }) =>
        (
          await db
            .rpc('scheduling_analytics_interviewers', {
              recruiter_id,
              end_time,
              jobs,
              start_time,
              type,
            })
            .throwOnError()
        ).data,
    ),
  leaderboard: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, end_time, jobs, start_time },
      }) =>
        (
          await db
            .rpc('scheduling_analytics_leaderboard', {
              recruiter_id,
              end_time,
              jobs,
              start_time,
            })
            .throwOnError()
        ).data,
    ),
  reasons: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, end_time, jobs, start_time },
      }) =>
        (
          await db
            .rpc('scheduling_analytics_reasons', {
              recruiter_id,
              end_time,
              jobs,
              start_time,
            })
            .throwOnError()
        ).data,
    ),
  recent_decline_reschedule: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, end_time, jobs, start_time },
      }) =>
        (
          await db
            .rpc('scheduling_analytics_recent_decline_reschedule', {
              recruiter_id,
              end_time,
              jobs,
              start_time,
            })
            .throwOnError()
        ).data,
    ),
  tabs: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({ ctx: { db }, input: { recruiter_id, jobs } }) =>
        (
          await db
            .rpc('scheduling_analytics_tabs', {
              recruiter_id,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  training_progress: privateProcedure
    .input(
      z.object({
        recruiter_id: z.string().uuid(),
        jobs: z.array(z.string().uuid()).optional(),
        end_time: z.string().date().optional(),
        start_time: z.string().date().optional(),
      }),
    )
    .query(
      async ({ ctx: { db }, input: { recruiter_id, jobs } }) =>
        (
          await db
            .rpc('scheduling_analytics_training_progress', {
              recruiter_id,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  // eslint-disable-next-line no-unused-vars
} satisfies { [id in SchedulingAnalyticsFunctions]: any });
