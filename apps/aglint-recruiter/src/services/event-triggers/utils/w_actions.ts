import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getWActions = async ({
  company_id,
  request_id,
}: {
  company_id: string;
  request_id: string | null;
}) => {
  const supabaseAdmin = getSupabaseServer();
  const all_actions = (
    await supabaseAdmin
      .from('workflow_action')
      .select('*,workflow!inner(*)')
      .eq('workflow.recruiter_id', company_id)
      .throwOnError()
  ).data;

  if (!all_actions) {
    return { company_actions: [], request_workflows: [] };
  }

  return {
    company_actions: all_actions
      .filter((act) => act.workflow.workflow_type === 'company')
      .map((t) => {
        return {
          ...t,
          workflow: t.workflow as NonNullable<typeof t.workflow>,
        };
      }),
    request_workflows: request_id
      ? all_actions
          .filter((act) => act.workflow.request_id === request_id)
          .map((t) => {
            return {
              ...t,
              workflow: t.workflow as NonNullable<typeof t.workflow>,
            };
          })
      : [],
  };
};
