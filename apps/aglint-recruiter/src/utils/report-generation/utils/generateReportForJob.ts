import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { report_gen_Params } from '../constant';
import {
  createCandidateInterviewCancelReq,
  createCandidateInterviewRescheduleRequest,
} from './candidate-requests';
import { getJobScheduleRequests } from './getJobScheduleRequests';
import { scheduleRequests } from './scheduleRequests';

export const generateReportForJob = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(job_id);
  // const to_do_requests = allRequests.filter((app) => app.status === 'to_do');
  // await scheduleRequests({
  //   allRequests: to_do_requests,
  //   company_id: job_details.recruiter_id,
  // });
  const application_ids = allRequests
    .filter((req) => req.status !== 'to_do')
    .map((app) => app.application_id);

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
    meeting_details.slice(0, candidate_cancel_meetings_cnt).map((m) => ({
      session_id: m.session_id,
      application_id: m.application_id,
      meeting_schedule_start_time: m.start_time!,
      meeting_schedule_end_time: m.end_time!,
    })),
  );
  await createCandidateInterviewRescheduleRequest(
    meeting_details
      .slice(
        candidate_cancel_meetings_cnt,
        candidate_cancel_meetings_cnt + candidate_reschedule_meetings_cnt,
      )
      .map((m) => ({
        session_id: m.session_id,
        application_id: m.application_id,
        meeting_schedule_start_time: m.start_time!,
        meeting_schedule_end_time: m.end_time!,
      })),
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
