import { DatabaseTableInsert } from '@aglint/shared-types';
import { ApiError, supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ProgressLoggerType = ReturnType<typeof createRequestProgressLogger>;

export const createRequestProgressLogger = (request_id: string) => {
  const logger = async (
    payload: Pick<
      DatabaseTableInsert['request_progress'],
      'log' | 'log_type' | 'event_type' | 'status' | 'meta'
    >,
  ) => {
    await supabaseWrap(
      await supabaseAdmin.from('request_progress').insert({
        request_id,
        ...payload,
      }),
    );
  };
  return logger;
};

// Define a generic type for the async callback function
type AsyncCallbackFunction<T extends any, U extends unknown> = (
  // eslint-disable-next-line no-unused-vars
  args: T,
) => Promise<U>;

export async function executeWorkflowAction<T1 extends any, U extends unknown>(
  callback1: AsyncCallbackFunction<T1, U>,
  args: T1,
  logger: ProgressLoggerType,
  logger_args: Pick<
    DatabaseTableInsert['request_progress'],
    'log' | 'log_type' | 'event_type' | 'status' | 'meta'
  >,
): Promise<U> {
  try {
    await logger({ ...logger_args, status: 'in_progress' });
    const res = await callback1(args);
    await logger({ ...logger_args, status: 'completed' });
    return res;
  } catch (err) {
    await logger({ ...logger_args, status: 'failed' });
    throw new ApiError('WORKFLOW_ACTION', err.message, 500);
  }
}
