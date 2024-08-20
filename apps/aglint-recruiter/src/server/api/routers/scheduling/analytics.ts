import { DatabaseFunctions } from '@aglint/shared-types';
import { z } from 'zod';

import { SchedulingAnalyticsFunctions } from '@/src/queries/scheduling-analytics/types';

import { createTRPCRouter, privateProcedure } from '../../trpc';

const common_schema = z.object({
  recruiter_id: z.string().uuid(),
  departments: z.array(z.number()).optional(),
  jobs: z.array(z.string()).optional(),
});

const completed_interviews_type = z.object({
  type: z.enum(['day', 'month']).optional(),
});

const interviewers_type = z.object({
  type: z.enum(['training', 'qualified']).optional(),
});

const leaderboard_type = z.object({
  type: z.enum(['month', 'all_time', 'year', 'week']).optional(),
});

const reasons_type = z.object({
  type: z.enum(['reschedule', 'declined']).optional(),
});

const training_progress_type = z.object({
  type: z.enum(['training', 'qualified']).optional(),
});

const schedulingAnalyticsSchema: AnalysisProcedures = {
  completed_interviews: {
    table: 'scheduling_analytics_completed_interviews',
    schema: common_schema.merge(completed_interviews_type),
  },
  decline_requests: {
    table: 'scheduling_analytics_decline_requests',
    schema: common_schema,
  },
  interview_types: {
    table: 'scheduling_analytics_interview_types',
    schema: common_schema,
  },
  interviewers: {
    table: 'scheduling_analytics_interviewers',
    schema: common_schema.merge(interviewers_type),
  },
  leaderboard: {
    table: 'scheduling_analytics_leaderboard',
    schema: common_schema.merge(leaderboard_type),
  },
  reasons: {
    table: 'scheduling_analytics_reasons',
    schema: common_schema.merge(reasons_type),
  },
  recent_decline_reschedule: {
    table: 'scheduling_analytics_recent_decline_reschedule',
    schema: common_schema,
  },
  tabs: {
    table: 'scheduling_analytics_tabs',
    schema: common_schema,
  },
  training_progress: {
    table: 'scheduling_analytics_training_progress',
    schema: common_schema.merge(training_progress_type),
  },
};

export const schedulingAnalyticsRouter = createTRPCRouter({
  completed_interviews: privateProcedure
    .input(schedulingAnalyticsSchema.completed_interviews.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.completed_interviews.table, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data,
    ),
  decline_requests: privateProcedure
    .input(schedulingAnalyticsSchema.decline_requests.schema)
    .query(
      async ({ ctx: { db }, input: { recruiter_id, departments, jobs } }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.decline_requests.table, {
              recruiter_id,
              departments,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  interview_types: privateProcedure
    .input(schedulingAnalyticsSchema.interview_types.schema)
    .query(
      async ({ ctx: { db }, input: { recruiter_id, departments, jobs } }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.interview_types.table, {
              recruiter_id,
              departments,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  interviewers: privateProcedure
    .input(schedulingAnalyticsSchema.interviewers.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.interviewers.table, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data,
    ),
  leaderboard: privateProcedure
    .input(schedulingAnalyticsSchema.leaderboard.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.leaderboard.table, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data,
    ),
  reasons: privateProcedure
    .input(schedulingAnalyticsSchema.reasons.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.reasons.table, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data,
    ),
  recent_decline_reschedule: privateProcedure
    .input(schedulingAnalyticsSchema.recent_decline_reschedule.schema)
    .query(
      async ({ ctx: { db }, input: { recruiter_id, departments, jobs } }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.recent_decline_reschedule.table, {
              recruiter_id,
              departments,
              jobs,
            })
            .throwOnError()
        ).data,
    ),
  tabs: privateProcedure.input(schedulingAnalyticsSchema.tabs.schema).query(
    async ({ ctx: { db }, input: { recruiter_id, departments, jobs } }) =>
      (
        await db
          .rpc(schedulingAnalyticsSchema.tabs.table, {
            recruiter_id,
            departments,
            jobs,
          })
          .single()
          .throwOnError()
      ).data,
  ),
  training_progress: privateProcedure
    .input(schedulingAnalyticsSchema.training_progress.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.training_progress.table, {
              recruiter_id,
              departments,
              jobs,
              type,
            })
            .throwOnError()
        ).data,
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
    table: `scheduling_analytics_${id}`;
  };
};

export type SchedulingAnalysisSchema<T extends SchedulingAnalyticsFunctions> =
  AnalysisProcedures[T]['schema'] extends z.ZodSchema<infer R> ? R : never;
