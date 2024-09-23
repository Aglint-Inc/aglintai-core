import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const onInsertRequestProgress = async ({
  new_data,
}: {
  new_data: DatabaseTable['request_progress'];
}) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({ status: 'in_progress' })
        .eq('id', new_data.request_id)
        .eq('status', 'to_do'),
    );
  } catch (err) {
    console.error('Failed onInsertRequestProgress', err.message);
  }
};
