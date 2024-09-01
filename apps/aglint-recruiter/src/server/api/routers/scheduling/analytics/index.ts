import { createTRPCRouter, privateProcedure } from '../../../trpc';
import { schedulingAnalyticsSchema } from './schema';
import type { SchedulingAnalyticsFunctions } from './types';

export const schedulingAnalyticsRouter = createTRPCRouter({
  filters: privateProcedure
    .input(schedulingAnalyticsSchema.filters.schema)
    .query(
      async ({ ctx: { db }, input: { recruiter_id } }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.filters.rpc, {
              recruiter_id,
            })
            .single()
            .throwOnError()
        ).data,
    ),
  completed_interviews: privateProcedure
    .input(schedulingAnalyticsSchema.completed_interviews.schema)
    .query(
      async ({
        ctx: { db },
        input: { recruiter_id, departments, jobs, type },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.completed_interviews.rpc, {
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
            .rpc(schedulingAnalyticsSchema.decline_requests.rpc, {
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
            .rpc(schedulingAnalyticsSchema.interview_types.rpc, {
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
            .rpc(schedulingAnalyticsSchema.interviewers.rpc, {
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
            .rpc(schedulingAnalyticsSchema.leaderboard.rpc, {
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
            .rpc(schedulingAnalyticsSchema.reasons.rpc, {
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
            .rpc(schedulingAnalyticsSchema.recent_decline_reschedule.rpc, {
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
          .rpc(schedulingAnalyticsSchema.tabs.rpc, {
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
        input: { recruiter_id, departments, jobs, locations },
      }) =>
        (
          await db
            .rpc(schedulingAnalyticsSchema.training_progress.rpc, {
              recruiter_id,
              departments,
              jobs,
              locations,
            })
            .throwOnError()
        ).data,
    ),
  // eslint-disable-next-line no-unused-vars
} satisfies { [id in SchedulingAnalyticsFunctions]: any });
