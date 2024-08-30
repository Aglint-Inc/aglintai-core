import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabase } from '@/src/utils/supabase/client';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const createRequestWorkflow = async ({
  wAction,
  request_id,
  recruiter_id,
}: {
  wAction: DatabaseTableInsert['workflow_action'];
  request_id: string;
  recruiter_id: string;
}) => {
  let wTrigger: DatabaseTable['workflow'];
  [wTrigger] = supabaseWrap(
    await supabase
      .from('workflow')
      .select()
      .eq('request_id', request_id)
      .eq('trigger', 'onRequestSchedule'),
    false,
  );
  if (!wTrigger) {
    [wTrigger] = supabaseWrap(
      await supabase
        .from('workflow')
        .insert({
          request_id: request_id,
          trigger: 'onRequestSchedule',
          phase: 'after',
          recruiter_id: recruiter_id,
          interval: 0,
          workflow_type: 'job',
        })
        .select(),
    );
  }
  supabaseWrap(
    await supabaseAdmin
      .from('workflow_action')
      .delete()
      .eq('workflow_id', wTrigger.id),
  );
  supabaseWrap(
    await supabase
      .from('workflow_action')
      .insert([
        {
          ...wAction,
          workflow_id: wTrigger.id,
        },
      ])
      .select(),
  );
};
