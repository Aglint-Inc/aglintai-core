import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const getFilterId = async (request_id) => {
  const {
    data: [filter_json],
    error,
  } = await supabaseAdmin
    .from('interview_filter_json')
    .select('id')
    .eq('request_id', request_id);

  if (error) {
    throw new Error('getting req_ava_id error');
  }
  if (filter_json?.id) return filter_json.id;
  else throw new Error('getting req_ava_id error');
};

export const sendSelfScheduleReminder = async (filter_id, target_api) => {
  const { data: workFlow_data, error: workflow_error } = await supabaseAdmin
    .from('workflow_action_logs')
    .select('id')
    .eq('meta->>target_api', target_api)
    .eq('meta->>filter_id', filter_id);

  if (workflow_error || !workFlow_data[0].id)
    throw new Error('getting workflow_action_id error');

  const workflow_action_id = workFlow_data[0].id;
  await supabaseAdmin.rpc('run_workflow_action', {
    action_id: workflow_action_id,
  });
};
