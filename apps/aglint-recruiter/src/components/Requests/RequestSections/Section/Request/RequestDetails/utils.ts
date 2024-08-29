import { DatabaseTableInsert } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';

export const createRequestWorkflow = async ({
  workflow,
  actions,
}: {
  request_id: string;
  workflow: DatabaseTableInsert['workflow'];
  actions: DatabaseTableInsert['workflow_action'];
}) => {
  const { data: workflowData } = await supabase
    .from('workflow')
    .insert({
      ...workflow,
    })
    .select()
    .single();
  const { ...resetActions } = actions;
  const { data: action } = await supabase.from('workflow_action').insert({
    ...resetActions,
    workflow_id: workflowData.id,
  });

  return {
    workflow,
    action,
  };
};
