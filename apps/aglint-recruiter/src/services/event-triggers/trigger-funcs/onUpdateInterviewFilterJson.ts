import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const onUpdateInterviewFilterJson = async ({
  new_data,
  old_data,
}: {
  new_data: DatabaseTable['interview_filter_json'];
  old_data: DatabaseTable['interview_filter_json'];
}) => {
  // when candidate schedule interview filter json
  if (
    old_data.confirmed_on === null &&
    new_data.confirmed_on &&
    new_data.confirmed_on.length > 0
  ) {
    await stopSelfScheduleReminder(new_data);
    await candConfirmSlot(new_data);
  }
};

const stopSelfScheduleReminder = async (
  new_data: DatabaseTable['interview_filter_json'],
) => {
  try {
    supabaseWrap(
      await supabaseAdmin
        .from('workflow_action_logs')
        .update({ status: 'stopped' })
        .eq('related_table', 'interview_filter_json')
        .eq('related_table_pkey', new_data.id)
        .eq('meta->>target_api', 'selfScheduleReminder_email_applicant'),
    );
  } catch (err) {
    console.error('Failed to stop self schedule reminder', err.message);
  }
};

const candConfirmSlot = async (
  new_data: DatabaseTable['interview_filter_json'],
) => {
  try {
    if (!new_data.request_id) return;
    supabaseWrap(
      await supabaseAdmin.from('request_progress').insert({
        event_type: 'CAND_CONFIRM_SLOT',
        request_id: new_data.request_id,
        status: 'completed',
        is_progress_step: false,
      }),
    );
    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', new_data.request_id),
    );
  } catch (err) {
    console.error('Failed to candConfirmSlot', err.message);
  }
};
