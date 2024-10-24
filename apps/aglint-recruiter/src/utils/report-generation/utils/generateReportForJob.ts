import { type DatabaseView } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { report_gen_Params } from '../constant';
import {
  createCandidateInterviewCancelReq,
  createCandidateInterviewRescheduleRequest,
  type MeetingDetail,
} from './candidate-requests';
import { getJobScheduleRequests } from './getJobScheduleRequests';
import { createInterviewDeclineRequest } from './interviewer-decline';
import { scheduleRequests } from './scheduleRequests';

export const generateReportForJob = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(
    job_id,
    'schedule_request',
  );
  const to_do_requests = allRequests
    .filter((app) => app.status === 'to_do')
    .slice(0, 5);
  await scheduleRequests({
    allRequests: to_do_requests,
    company_id: job_details.recruiter_id,
  });
  const application_ids = to_do_requests.map((app) => app.application_id);

  const meeting_details = await getAllMeetingDetails(application_ids);

  const candidate_cancel_meetings_cnt = Math.floor(
    meeting_details.length *
      report_gen_Params.candidate_cancel_request_percentage,
  );
  const candidate_reschedule_meetings_cnt = Math.floor(
    meeting_details.length *
      report_gen_Params.candidate_reschedule_request_percentage,
  );
  const interviewer_decline_meetings_cnt = Math.floor(
    meeting_details.length *
      report_gen_Params.interviewer_decline_request_percentage,
  );

  await createCandidateInterviewCancelReq(
    meeting_details
      .slice(0, candidate_cancel_meetings_cnt)
      .map(mapMeetingDetailsToMeetingDetail),
  );
  await createCandidateInterviewRescheduleRequest(
    meeting_details
      .slice(
        candidate_cancel_meetings_cnt,
        candidate_cancel_meetings_cnt + candidate_reschedule_meetings_cnt,
      )
      .map(mapMeetingDetailsToMeetingDetail),
  );
  await createInterviewDeclineRequest(
    meeting_details
      .slice(
        candidate_cancel_meetings_cnt + candidate_reschedule_meetings_cnt,
        candidate_cancel_meetings_cnt +
          candidate_reschedule_meetings_cnt +
          interviewer_decline_meetings_cnt,
      )
      .map(mapMeetingDetailsToMeetingDetail),
  );
};

const getAllMeetingDetails = async (application_ids: string[]) => {
  const supabaseAdmin = getSupabaseServer();
  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .neq(`meeting_link`, null)
      .in('application_id', application_ids),
    false,
  );
  return meeting_details;
};

const mapMeetingDetailsToMeetingDetail = (
  meeting_detail: DatabaseView['meeting_details'],
) => {
  const meeting_detail_map: MeetingDetail = {
    session_id: meeting_detail.session_id,
    application_id: meeting_detail.application_id,
    meeting_schedule_start_time: meeting_detail.start_time!,
    meeting_schedule_end_time: meeting_detail.end_time!,
  };
  return meeting_detail_map;
};
