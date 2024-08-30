import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
export const getWActions = async ({
  company_id,
  request_id,
}: {
  company_id: string;
  request_id?: string;
}) => {
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
    request_workflows: request_id
      ? all_actions.filter((act) => act.workflow.request_id === request_id)
      : [],
  };
};
