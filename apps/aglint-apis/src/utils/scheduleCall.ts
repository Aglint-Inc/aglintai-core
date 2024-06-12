import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from '../services/supabase/SupabaseAdmin';

export const scheduleCallUtil = async (task_id: string, new_time: string) => {
  if (!task_id) return;
  supabaseWrap(
    await supabaseAdmin
      .from('new_tasks')
      .update({
        start_date: new_time,
        status: 'scheduled',
      })
      .eq('id', task_id)
      .select()
  );
};
