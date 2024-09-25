import {
  DatabaseTable,
  DatabaseTableInsert,
  SupabaseType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { v4 as uuidv4 } from 'uuid';
import { CApiError } from '../customApiError';
import { supabaseWrap } from '../supabaseWrap';

export type ProgressLoggerType = ReturnType<typeof createRequestProgressLogger>;

export const createRequestProgressLogger = ({
  event_run_id,
  request_id,
  supabaseAdmin,
  event_type,
}: {
  supabaseAdmin: SupabaseType;
  event_type: DatabaseTable['request_progress']['event_type'];
  request_id: string;
  event_run_id?: number;
}) => {
  const logger = async (
    payload?: Pick<
      DatabaseTableInsert['request_progress'],
      'log' | 'status' | 'id' | 'is_progress_step' | 'meta'
    >
  ) => {
    let progress_id = uuidv4();
    if (payload?.id) {
      progress_id = payload.id;
    }
    const rec = await supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .upsert({
          request_id: request_id,
          created_at: dayjsLocal().toISOString(),
          meta: {
            event_run_id,
            ...(payload?.meta ?? {}),
          },
          log: payload?.log,
          id: progress_id,
          event_type: event_type,
          status: payload?.status,
          is_progress_step: payload?.is_progress_step,
        })
        .select()
        .single()
    );
    return rec;
  };
  logger.resetEventProgress = async () => {
    supabaseWrap(
      await supabaseAdmin
        .from('request_progress')
        .delete()
        .eq('event_type', event_type)
        .eq('request_id', request_id)
    );
  };
  return logger;
};

// Define a generic type for the async callback function
type AsyncCallbackFunction<T extends any, U extends unknown> = (
  // eslint-disable-next-line no-unused-vars
  args: T
) => Promise<U>;

export async function executeWorkflowAction<T1 extends any, U extends unknown>(
  callback1: AsyncCallbackFunction<T1, U>,
  args: T1,
  logger: ProgressLoggerType,
  log_id = uuidv4(),
  logger_args?: Pick<DatabaseTableInsert['request_progress'], 'meta'>
): Promise<U | null> {
  try {
    await logger({
      ...(logger_args ?? {}),
      status: 'in_progress',
      is_progress_step: false,
      id: log_id,
    });
    const res = await callback1(args);
    await logger({
      ...(logger_args ?? {}),
      status: 'completed',
      id: log_id,
      is_progress_step: false,
    });
    return res;
  } catch (err: any) {
    let err_log = 'Something wrong happenned';
    if (err instanceof CApiError && err.type === 'CLIENT') {
      err_log = err.message;
    }
    await logger({
      ...(logger_args ?? {}),
      status: 'failed',
      id: log_id,
      log: err_log,
      is_progress_step: false,
    });
    throw new CApiError('WORKFLOW_ACTION', err.message, 500);
  }
}
