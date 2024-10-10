import type { DatabaseFunctions } from '@aglint/shared-types';
import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import type { SchedulingAnalyticsFunctions } from './types';

const completed_interviews_type = z.object({
  type: z.enum(['month', 'quarter', 'year']).optional(),
});

const filters_type = z.object({
  departments: z.array(z.number()).optional(),
  jobs: z.array(z.string()).optional(),
});

const interviewers_type = z.object({
  type: z.enum(['training', 'qualified']).optional(),
});

const leaderboard_type = z.object({
  type: z.enum(['month', 'all_time', 'year', 'week']).optional(),
});

const reasons_type = z.object({
  type: z
    .enum([
      'interviewer_request_decline' ,
        'candidate_request_decline' ,
        'admin_cancel' ,
        'candidate_request_reschedule',
    ])
    .optional(),
});

const training_progress_type = z.object({
  locations: z.array(z.number()).optional(),
});

const schedulingAnalyticsSchema: AnalysisProcedures = {
  filters: {
    rpc: 'scheduling_analytics_filters',
    schema: z.object({ recruiter_id: z.string().uuid() }),
  },
  completed_interviews: {
    rpc: 'scheduling_analytics_completed_interviews',
    schema: filters_type.merge(completed_interviews_type),
  },
  decline_requests: {
    rpc: 'scheduling_analytics_decline_requests',
    schema: filters_type,
  },
  interview_types: {
    rpc: 'scheduling_analytics_interview_types',
    schema: filters_type,
  },
  interviewers: {
    rpc: 'scheduling_analytics_interviewers',
    schema: filters_type.merge(interviewers_type),
  },
  leaderboard: {
    rpc: 'scheduling_analytics_leaderboard',
    schema: filters_type.merge(leaderboard_type),
  },
  reasons: {
    rpc: 'scheduling_analytics_reasons',
    schema: filters_type.merge(reasons_type),
  },
  recent_decline_reschedule: {
    rpc: 'scheduling_analytics_recent_decline_reschedule',
    schema: filters_type,
  },
  tabs: {
    rpc: 'scheduling_analytics_tabs',
    schema: filters_type,
  },
  training_progress: {
    rpc: 'scheduling_analytics_training_progress',
    schema: filters_type.merge(training_progress_type),
  },
};

export const schedulingAnalyticsRouter = createTRPCRouter({
  filters: privateProcedure
    .input(schedulingAnalyticsSchema.filters.schema)
    .mutation(async ({ input: { recruiter_id } }) => {
      const db = createPublicClient();
      return (
        await db
          .rpc(schedulingAnalyticsSchema.filters.rpc, {
            recruiter_id: recruiter_id!,
          })
          .single()
          .throwOnError()
      ).data!;
    }),
  completed_interviews: privateProcedure
    .input(schedulingAnalyticsSchema.completed_interviews.schema)
    .mutation(
      async ({ ctx: { recruiter_id }, input: { departments, jobs, type } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.completed_interviews.rpc, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data!;
      },
    ),
  decline_requests: privateProcedure
    .input(schedulingAnalyticsSchema.decline_requests.schema)
    .mutation(
      async ({ ctx: { recruiter_id }, input: { departments, jobs } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.decline_requests.rpc, {
              recruiter_id,
              departments,
              jobs,
            })
            .throwOnError()
        ).data!;
      },
    ),
  interview_types: privateProcedure
    .input(schedulingAnalyticsSchema.interview_types.schema)
    .query(async ({ ctx: { recruiter_id }, input: { departments, jobs } }) => {
      const db = createPublicClient();
      return (
        await db
          .rpc(schedulingAnalyticsSchema.interview_types.rpc, {
            recruiter_id,
            departments,
            jobs,
          })
          .throwOnError()
      ).data!;
    }),
  interviewers: privateProcedure
    .input(schedulingAnalyticsSchema.interviewers.schema)
    .mutation(
      async ({ ctx: { recruiter_id }, input: { departments, jobs, type } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.interviewers.rpc, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data!;
      },
    ),
  leaderboard: privateProcedure
    .input(schedulingAnalyticsSchema.leaderboard.schema)
    .mutation(
      async ({ ctx: { recruiter_id }, input: { departments, jobs, type } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.leaderboard.rpc, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data!;
      },
    ),
  reasons: privateProcedure
    .input(schedulingAnalyticsSchema.reasons.schema)
    .query(
      async ({ ctx: { recruiter_id }, input: { departments, jobs, type } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.reasons.rpc, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data!;
      },
    ),
  recent_decline_reschedule: privateProcedure
    .input(schedulingAnalyticsSchema.recent_decline_reschedule.schema)
    .query(async ({ ctx: { recruiter_id }, input: { departments, jobs } }) => {
      const db = createPublicClient();
      return (
        await db
          .rpc(schedulingAnalyticsSchema.recent_decline_reschedule.rpc, {
            recruiter_id,
            departments,
            jobs,
          })
          .throwOnError()
      ).data!;
    }),
  tabs: privateProcedure
    .input(schedulingAnalyticsSchema.tabs.schema)
    .mutation(
      async ({ ctx: { recruiter_id }, input: { departments, jobs } }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.tabs.rpc, {
              recruiter_id,
              departments,
              jobs,
            })
            .single()
            .throwOnError()
        ).data!;
      },
    ),
  training_progress: privateProcedure
    .input(schedulingAnalyticsSchema.training_progress.schema)
    .query(
      async ({
        ctx: { recruiter_id },
        input: { departments, jobs, locations },
      }) => {
        const db = createPublicClient();
        return (
          await db
            .rpc(schedulingAnalyticsSchema.training_progress.rpc, {
              recruiter_id,
              departments,
              jobs,
              locations,
            })
            .throwOnError()
        ).data!;
      },
    ),
  // eslint-disable-next-line no-unused-vars
} satisfies { [id in SchedulingAnalyticsFunctions]: any });

type AnalysisProcedures<
  T extends SchedulingAnalyticsFunctions = SchedulingAnalyticsFunctions,
> = {
  [id in T]: {
    schema: z.ZodSchema<
      Partial<DatabaseFunctions[`scheduling_analytics_${id}`]['Args']>
    >;
    rpc: `scheduling_analytics_${id}`;
  };
};

export type SchedulingAnalysisSchema<T extends SchedulingAnalyticsFunctions> =
  AnalysisProcedures[T]['schema'] extends z.ZodSchema<infer R> ? R : never;
