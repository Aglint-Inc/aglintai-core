import { type CalendarEvent } from '@aglint/shared-types';

import { type RouterHelper, type RouterInputs } from '@/src/trpc/client';

export type interviewersTab =
  | 'availability'
  | 'interview_load'
  | 'training'
  | 'metrics';

export type CalendarEventWithType = (CalendarEvent & {
  type: string;
})[];

export type LeaderAnalyticsFilterType = RouterHelper<
  RouterInputs['scheduling']['analytics']['leaderboard']
>;

export type TrainingProgressType = RouterHelper<
  RouterInputs['scheduling']['analytics']['training_progress']
>;
export type EventType =
  | 'cal_event'
  | 'soft'
  | 'break'
  | 'free_time'
  | 'ooo'
  | 'recruiting_blocks'
  | 'working_hour'
  | 'bg'
  | 'company_off'
  | 'early_morning'
  | 'after_work';
