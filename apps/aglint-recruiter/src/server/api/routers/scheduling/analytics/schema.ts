import { z } from 'zod';

import { type AnalysisProcedures } from './types';

const completed_interviews_type = z.object({
  type: z.enum(['month', 'quarter', 'year']).optional(),
});

const filters_type = z.object({
  recruiter_id: z.string().uuid(),
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
  type: z.enum(['reschedule', 'declined']).optional(),
});

const training_progress_type = z.object({
  locations: z.array(z.number()).optional(),
});

export const schedulingAnalyticsSchema: AnalysisProcedures = {
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
