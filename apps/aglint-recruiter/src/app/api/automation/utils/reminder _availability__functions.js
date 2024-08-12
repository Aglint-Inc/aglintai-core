import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const getAvaRequestId = async (request_id) => {
  const {
    data: [req_ava],
    error,
  } = await supabaseAdmin
    .from('candidate_request_availability')
    .select('id')
    .eq('request_id', request_id);

  if (error) {
    throw new Error('getting req_ava_id error');
  }
  if (req_ava?.id) return req_ava.id;
  else throw new Error('getting req_ava_id error');
};

export const sendReminder = async (req_ava_id, target_api) => {
  const { data: workFlow_data, error: workflow_error } = await supabaseAdmin
    .from('workflow_action_logs')
    .select('id')
    .eq('meta->>target_api', target_api)
    .eq('meta->>avail_req_id', req_ava_id);

  if (workflow_error || !workflow_action_id || workFlow_data[0].id)
    throw new Error('getting workflow_action_id error');

  const workflow_action_id = workFlow_data[0].id;
  await supabaseAdmin.rpc('run_workflow_action', {
    action_id: workflow_action_id,
  });
};
