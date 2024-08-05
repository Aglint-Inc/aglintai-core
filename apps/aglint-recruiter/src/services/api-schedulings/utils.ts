import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

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
