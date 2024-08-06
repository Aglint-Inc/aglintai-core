import { DatabaseTableInsert } from '@aglint/shared-types';
import { ApiError, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { v4 as uuidv4 } from 'uuid';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ProgressLoggerType = ReturnType<typeof createRequestProgressLogger>;

export const createRequestProgressLogger = (
  request_id: string,
  event_run_id: string,
) => {
  const logger = async (
    payload: Pick<
      DatabaseTableInsert['request_progress'],
      'log' | 'log_type' | 'event_type' | 'status' | 'meta' | 'id'
    >,
  ) => {
    if (!payload.id) {
      payload.id = uuidv4();
    }
    const [rec] = await supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .upsert({
          ...payload,
          request_id: request_id,
          created_at: dayjsLocal().toISOString(),
          meta: {
            event_run_id,
          },
        })
        .select(),
    );
    return rec;
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
  let progress_id = uuidv4();
  try {
    await logger({ ...logger_args, status: 'in_progress', id: progress_id });
    const res = await callback1(args);
    await logger({ ...logger_args, status: 'completed', id: progress_id });
    return res;
  } catch (err) {
    let err_log = 'Something wrong happenned';
    if (err instanceof ApiError && err.type === 'CLIENT') {
      err_log = err.message;
    }
    await logger({
      ...logger_args,
      status: 'failed',
      id: progress_id,
      log: err_log,
    });
    throw new ApiError('WORKFLOW_ACTION', err.message, 500);
  }
}
