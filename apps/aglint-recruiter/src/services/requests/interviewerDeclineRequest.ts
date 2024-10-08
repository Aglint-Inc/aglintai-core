import { type DatabaseFunctions } from '@aglint/shared-types';
import {
  type createInterviewerRequestSchema,
  dayjsLocal,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import { CApiError } from '@aglint/shared-utils/src/customApiError';
import { type z } from 'zod';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export async function interviewerDeclineRequest(
  parsed: z.output<typeof createInterviewerRequestSchema>,
) {
  const supabaseAdmin = getSupabaseServer();
  const {
    application,
    application_id,
    interviewer,
    request_details,
    candidate_tz,
    session_name,
  } = await fetchInterviewerRequest(parsed);

  const details: DatabaseFunctions['create_session_request']['Args'] = {
    application: application_id,
    request: {
      assignee_id: request_details.assignee_id,
      assigner_id: request_details.assigner_id,
      schedule_start_date: dayjsLocal().tz(candidate_tz).format(),
      schedule_end_date: dayjsLocal()
        .tz(candidate_tz)
        .startOf('day')
        .add(1, 'day')
        .format(),
      priority: 'urgent',
      status: 'to_do',
      title: `${getFullName(interviewer.first_name, interviewer.last_name)} Declined ${session_name} with candidate ${getFullName(application.candidates.first_name, application.candidates.last_name)}  Request`,
      type: 'decline_request',
      note: null,
    },
    sessions: [parsed.session_id],
  };

  const decline_request_id = supabaseWrap(
    await supabaseAdmin.rpc('create_session_request', details),
  ) as string;

  const rec = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_relation')
      .update({ accepted_status: 'declined' })
      .eq('id', parsed.session_relation_id)
      .select()
      .single(),
  );
  let reason = 'interview declined in Slack';
  if (parsed.declined_place === 'calender') {
    reason = 'interview declined in Calender';
  }
  const decline_request = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .insert({
        reason,
        session_id: rec.session_id,
        session_relation_id: parsed.session_relation_id,
        type: 'declined',
        request_id: decline_request_id,
      })
      .select()
      .single(),
  );
  return {
    decline_request,
  };
}

const fetchInterviewerRequest = async (
  parsed: z.output<typeof createInterviewerRequestSchema>,
) => {
  const supabaseAdmin = getSupabaseServer();

  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('*,interview_meeting!inner(*)')
      .eq('id', parsed.session_id)
      .single(),
  );
  const schedule_request_id = meeting_details.interview_meeting
    .schedule_request_id as string;

  const [request_details] = supabaseWrap(
    await supabaseAdmin.from('request').select().eq('id', schedule_request_id),
  );

  const application_id = meeting_details.interview_meeting
    .application_id as string;

  const [application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('*,candidates!inner(*)')
      .eq('id', application_id),
  );
  const [interviewer] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('session_relation_id', parsed.session_relation_id),
  );
  const candidate_tz = meeting_details.interview_meeting.confirmed_candidate_tz;
  if (!candidate_tz) {
    throw new CApiError('CLIENT', 'Candidate timezone not found');
  }
  return {
    session_name: meeting_details.name,
    application,
    interviewer,
    meeting_details,
    candidate_tz,
    request_details,
    schedule_request_id,
    application_id,
  };
};
