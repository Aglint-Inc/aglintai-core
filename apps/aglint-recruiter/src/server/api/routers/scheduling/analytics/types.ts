import type { DatabaseFunctions } from '@aglint/shared-types';
import type { z } from 'zod';

export type AnalysisProcedures<
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

export type SchedulingAnalyticsFunctions =
  Extract<
    keyof DatabaseFunctions,
    `scheduling_analytics_${string}`
  > extends `scheduling_analytics_${infer R}`
    ? R
    : never;
