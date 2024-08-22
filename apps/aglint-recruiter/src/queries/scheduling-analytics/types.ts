import { DatabaseFunctions } from '@aglint/shared-types';

import type { api } from '@/src/trpc/client';

export type SchedulingAnalyticsFunctions =
  Extract<
    keyof DatabaseFunctions,
    `scheduling_analytics_${string}`
  > extends `scheduling_analytics_${infer R}`
    ? R
    : never;

export type SchedulingAnalyticsProcedureArgs<
  T extends SchedulingAnalyticsFunctions,
> = Parameters<
  (typeof api)['scheduling']['analytics'][T]['mutate']
>[0] extends infer K
  ? K extends void
    ? never
    : K
  : never;
