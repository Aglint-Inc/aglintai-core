import {
  type DatabaseEnums,
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabase } from '@/src/utils/supabase/client';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const triggerinterval: Partial<
  Record<DatabaseEnums['workflow_trigger'], number>
> = {
  sendAvailReqReminder: 24 * 60,
  selfScheduleReminder: 24 * 60,
};

export const createRequestWorkflowAction = async ({
  wAction,
  request_id,
  recruiter_id,
}: {
  wAction: DatabaseTableInsert['workflow_action'];
  request_id: string;
  recruiter_id: string;
}) => {
  console.log(wAction);
  const trigger = wAction.target_api.split('_')[0] as any;
  let interval = 0;
  if (triggerinterval[trigger]) {
    interval = triggerinterval[trigger];
  }
  let wTrigger: DatabaseTable['workflow'];
  [wTrigger] = supabaseWrap(
    await supabase
      .from('workflow')
      .select()
      .eq('request_id', request_id)
      .eq('trigger', trigger),
    false,
  );
  if (!wTrigger) {
    [wTrigger] = supabaseWrap(
      await supabase
        .from('workflow')
        .insert({
          request_id: request_id,
          trigger: trigger,
          phase: 'after',
          recruiter_id: recruiter_id,
          interval: interval,
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

export const deleteRequestWorkflowAction = async (workflowActionId: string) => {
  supabaseWrap(
    await supabase.from('workflow_action').delete().eq('id', workflowActionId),
  );
};
