import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const onUpdateInterviewMeeting = async ({
  new_data,
  old_data,
}: {
  old_data: DatabaseTable['interview_meeting'];
  new_data: DatabaseTable['interview_meeting'];
}) => {
  if (new_data.status === 'confirmed' && old_data.status !== 'confirmed') {
    await updateScheduleProgress({ new_data });
  }
};

const updateScheduleProgress = async ({
  new_data,
}: {
  new_data: DatabaseTable['interview_meeting'];
}) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const schedule_req_id = new_data.schedule_request_id;
    if (!schedule_req_id) {
      console.error('schedule_request_id not found');
      return;
    }

    supabaseWrap(
      await supabaseAdmin
        .from('request')
        .update({
          status: 'completed',
        })
        .eq('id', schedule_req_id),
    );
  } catch (err) {
    console.error('Failed to update schedule progress', err.message);
  }
};
