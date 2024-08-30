import { DatabaseTable, DatabaseTableInsert } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';

export const createRequestWorkflow = async ({
  old_workflow_id,
  workflow,
  actions,
}: {
  old_workflow_id: string;
  workflow: DatabaseTableInsert['workflow'];
  actions: DatabaseTableInsert['workflow_action'];
}) => {
  if (old_workflow_id) {
    const { data: workflowData } = await supabase
      .from('workflow')
      .upsert({
        ...workflow,
        id: old_workflow_id,
      })
      .select()
      .single()
      .throwOnError();
    const { ...resetActions } = actions;
    const { data: action } = await supabase.from('workflow_action').insert({
      ...resetActions,
      workflow_id: workflowData.id,
    });

    return {
      workflow,
      action,
    };
  } else {
    const { data: workflowData } = await supabase
      .from('workflow')
      .insert({
        ...workflow,
      })
      .select()
      .single()
      .throwOnError();
    const { ...resetActions } = actions;
    const { data: action } = await supabase.from('workflow_action').insert({
      ...resetActions,
      workflow_id: workflowData.id,
    });

    return {
      workflow,
      action,
    };
  }
};

export const deleteRequestWorkFlow = async ({
  request_id,
  trigger,
}: {
  request_id: string;
  workflow_id: string;
  trigger: DatabaseTable['workflow']['trigger'];
}) => {
  const { data, error } = await supabase
    .from('workflow')
    .delete()
    .eq('request_id', request_id)
    .eq('trigger', trigger)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};
