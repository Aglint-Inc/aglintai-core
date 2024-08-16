import { DatabaseTable } from '@aglint/shared-types';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const onUpdateMeetingInterview = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_meeting'];
  new_data: DatabaseTable['interview_meeting'];
}) => {
  if (new_data.status === 'confirmed' && old_data.status === 'not_scheduled') {
    supabaseAdmin.rpc('create_new_workflow_action_log');
  }
};
