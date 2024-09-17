import {
  type DatabaseTable,
  type DatabaseTableInsert,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabase } from '@/utils/supabase/client';
import { TRIGGER_PAYLOAD } from '@/workflows/constants';

export const createRequestWorkflowAction = async ({
  wActions,
  request_id,
  recruiter_id,
  interval,
}: {
  wActions: DatabaseTableInsert['workflow_action'][];
  request_id: string;
  recruiter_id: string;
  interval: number;
}) => {
  const trigger = wActions[0].target_api.split('_')[0] as any;
  const phase = TRIGGER_PAYLOAD.find((t) => t.trigger === trigger).phase[0];
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
          phase: phase,
          recruiter_id: recruiter_id,
          interval: interval,
          workflow_type: 'job',
        })
        .select(),
    );
  }
  supabaseWrap(
    await supabase
      .from('workflow_action')
      .delete()
      .eq('workflow_id', wTrigger.id),
  );
  supabaseWrap(
    await supabase
      .from('workflow_action')
      .insert(
        wActions.map((action) => {
          return {
            ...action,
            workflow_id: wTrigger.id,
          };
        }),
      )
      .select(),
  );
};

export const deleteRequestWorkflowAction = async (workflowActionId: string) => {
  supabaseWrap(
    await supabase.from('workflow_action').delete().eq('id', workflowActionId),
  );
};
