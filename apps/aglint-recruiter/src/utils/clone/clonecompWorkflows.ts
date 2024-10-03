import { supabaseWrap } from '@aglint/shared-utils';
import { v4 } from 'uuid';

import { type SupabaseClientType } from '../supabase/supabaseAdmin';

export const cloneCompWorkflowsForJob = async ({
  job_id,
  company_id,
  supabase,
}: {
  job_id: string;
  company_id: string;
  supabase: SupabaseClientType;
}) => {
  const job_trigs = supabaseWrap(
    await supabase.from('workflow_job_relation').select().eq('job_id', job_id),
  );
  supabaseWrap(
    await supabase
      .from('workflow')
      .delete()
      .in(
        'id',
        job_trigs.map((j) => j.workflow_id),
      ),
  );

  const workflows = supabaseWrap(
    await supabase
      .from('workflow')
      .select('*,workflow_action(*)')
      .eq('recruiter_id', company_id)
      .eq('workflow_type', 'company'),
  ).filter((w) => w.workflow_action && w.is_active);

  const promises = workflows.map(async (w) => {
    const jobTrigger = supabaseWrap(
      await supabase
        .from('workflow')
        .insert({
          phase: w.phase,
          recruiter_id: company_id,
          trigger: w.trigger,
          auto_connect: w.auto_connect,
          interval: w.interval,
          is_active: false,
          title: w.title,
          workflow_type: 'job',
        })
        .select()
        .single(),
    );
    const actions = w.workflow_action.map((a) => {
      return {
        ...a,
        id: v4(),
        workflow_id: jobTrigger.id,
      };
    });
    const insertedActions = supabaseWrap(
      await supabase.from('workflow_action').insert(actions).select(),
    );
    await supabase.from('workflow_job_relation').insert({
      job_id,
      workflow_id: jobTrigger.id,
    });
    return insertedActions;
  });
  return await Promise.all(promises);
};
