import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { v4 as uuidv4 } from 'uuid';

import { ApiError } from '@/src/utils/customApiError';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ProgressLoggerType = ReturnType<typeof createRequestProgressLogger>;

export const createRequestProgressLogger = (
  request_id: string,
  event_run_id: number,
) => {
  const logger = async (
    payload: Pick<
      DatabaseTableInsert['request_progress'],
      'log' | 'event_type' | 'status' | 'id' | 'is_progress_step'
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
  logger.resetEventProgress = async (
    type: DatabaseTable['request_progress']['event_type'],
  ) => {
    supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .delete()
        .eq('event_type', type)
        .eq('request_id', request_id),
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
    'log' | 'event_type' | 'status' | 'meta'
  >,
): Promise<U> {
  let progress_id = uuidv4();
  try {
    await logger.resetEventProgress(logger_args.event_type);
    await logger({
      ...logger_args,
      status: 'in_progress',
      is_progress_step: false,
      id: progress_id,
    });
    const res = await callback1(args);
    await logger({
      ...logger_args,
      status: 'completed',
      id: progress_id,
      is_progress_step: false,
    });
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
      is_progress_step: false,
    });
    throw new ApiError('WORKFLOW_ACTION', err.message, 500);
  }
}
