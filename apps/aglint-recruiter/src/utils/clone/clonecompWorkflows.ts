import { v4 } from 'uuid';

import { type SupabaseClientType } from '../supabase/supabaseAdmin';

export const cloneCompWorkflowsForJob = async ({
  job_id,
  company_id,
  supabase,
}: {
  job_id: string;
  company_id;
  supabase: SupabaseClientType;
}) => {
  const job_trigs = await supabase
    .from('workflow_job_relation')
    .select()
    .eq('job_id', job_id)
    .throwOnError();

  await supabase
    .from('workflow')
    .delete()
    .in(
      'id',
      job_trigs.data.map((j) => j.workflow_id),
    )
    .throwOnError();

  const workflows = (
    await supabase
      .from('workflow')
      .select('*,workflow_action(*)')
      .eq('recruiter_id', company_id)
      .eq('workflow_type', 'company')
      .throwOnError()
  ).data.filter((w) => w.workflow_action && w.is_active);

  const promises = workflows.map(async (w) => {
    const jobTrigger = await supabase
      .from('workflow')
      .insert({
        phase: w.phase,
        recruiter_id: company_id,
        trigger: w.trigger,
        auto_connect: w.auto_connect,
        interval: w.interval,
        is_active: w.is_active,
        title: w.title,
        workflow_type: 'job',
      })
      .select()
      .single()
      .throwOnError();
    const actions = w.workflow_action.map((a) => {
      return {
        ...a,
        id: v4(),
        workflow_id: jobTrigger.data.id,
      };
    });
    delete w.workflow_action;
    const insertedActions = (
      await supabase
        .from('workflow_action')
        .insert(actions)
        .throwOnError()
        .select()
    ).data;
    await supabase.from('workflow_job_relation').insert({
      job_id,
      workflow_id: jobTrigger.data.id,
    });
    return insertedActions;
  });
  return await Promise.all(promises);
};
