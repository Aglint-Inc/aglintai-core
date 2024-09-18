import { type DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabase } from '@/utils/supabase/client';
import { TRIGGER_PAYLOAD } from '@/workflows/constants';

export const createRequestWorkflowAction = async ({
  wActions,
  request_id,
  recruiter_id,
  interval,
  workflow_id,
}: {
  wActions: DatabaseTableInsert['workflow_action'][];
  request_id: string;
  recruiter_id: string;
  interval: number;
  workflow_id?: string;
}) => {
  const trigger = wActions[0].target_api.split('_')[0] as any;
  const phase = TRIGGER_PAYLOAD.find((t) => t.trigger === trigger).phase[0];
  if (workflow_id) {
    supabaseWrap(
      await supabase
        .from('workflow')
        .update({
          interval: interval,
        })
        .eq('id', workflow_id),
      false,
    );
  } else {
    supabaseWrap(
      await supabase
        .from('workflow')
        .delete()
        .eq('request_id', request_id)
        .eq('trigger', trigger),
    );
    const [wTrigger] = supabaseWrap(
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
    workflow_id = wTrigger.id;
  }

  supabaseWrap(
    await supabase
      .from('workflow_action')
      .delete()
      .eq('workflow_id', workflow_id),
  );
  supabaseWrap(
    await supabase
      .from('workflow_action')
      .insert(
        wActions.map((action) => {
          return {
            ...action,
            workflow_id: workflow_id,
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
