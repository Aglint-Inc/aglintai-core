import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
export const getWActions = async ({
  company_id,
  request_id,
}: {
  company_id: string;
  request_id?: string;
}) => {
  let request_workflow_ids: string[] = [];
  if (request_id) {
    request_workflow_ids = supabaseWrap(
      await supabaseAdmin
        .from('workflow_request_relation')
        .select()
        .eq('request_id', request_id),
    ).map((reln) => reln.workflow_id);
  }

  const all_actions = supabaseWrap(
    await supabaseAdmin
      .from('workflow_action')
      .select('*,workflow(*)')
      .eq('workflow.recruiter_id', company_id),
  );

  return {
    company_actions: all_actions.filter(
      (act) => act.workflow.workflow_type === 'system',
    ),
    request_workflows: all_actions.filter((act) =>
      request_workflow_ids.includes(act.workflow_id),
    ),
  };
};
