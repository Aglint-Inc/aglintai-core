/* eslint-disable no-console */
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
import { processInterviewerDeclineRequests } from './interviewer-decline';
import { scheduleRequests } from './scheduleRequests';
import { sessnRelnAccept } from './UpdateinterAttendStatus';

export const generateReportForJob = async (job_id: string) => {
  const { allRequests, job_details } = await getJobScheduleRequests(
    job_id,
    'schedule_request',
  );
  const to_do_requests = allRequests
    .filter((app) => app.status === 'to_do')
    .slice(0, 3);
  await scheduleRequests({
    allRequests: to_do_requests,
    company_id: job_details.recruiter_id,
  });

  const meeting_details = await getAllMeetingDetails(job_id);
  if (meeting_details.length === 0) {
    console.log(`no meeting details found for job ${job_id}`);
    return;
  }
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

  const cancel_meetings = meeting_details.slice(
    0,
    candidate_cancel_meetings_cnt,
  );

  const reschedule_meetings = meeting_details.slice(
    candidate_cancel_meetings_cnt,
    candidate_cancel_meetings_cnt + candidate_reschedule_meetings_cnt,
  );

  const interviewer_decline_meetings = meeting_details.slice(
    candidate_cancel_meetings_cnt + candidate_reschedule_meetings_cnt,
    candidate_cancel_meetings_cnt +
      candidate_reschedule_meetings_cnt +
      interviewer_decline_meetings_cnt,
  );

  console.log('cancel_meetings', cancel_meetings.length);
  console.log('reschedule_meetings', reschedule_meetings.length);
  console.log(
    'interviewer_decline_meetings',
    interviewer_decline_meetings.length,
  );

  await createCandidateInterviewCancelReq(
    cancel_meetings.map(mapMeetingDetailsToMeetingDetail),
    job_details.recruiter_id,
  );
  await createCandidateInterviewRescheduleRequest(
    reschedule_meetings.map(mapMeetingDetailsToMeetingDetail),
  );

  await processInterviewerDeclineRequests(
    interviewer_decline_meetings.map(mapMeetingDetailsToMeetingDetail),
  );

  if (report_gen_Params.is_schedule_reschedule_requests) {
    const { allRequests: reschedule_requests } = await getJobScheduleRequests(
      job_id,
      'reschedule_request',
    );
    await scheduleRequests({
      allRequests: reschedule_requests,
      company_id: job_details.recruiter_id,
    });
  }
  await sessnRelnAccept();
  return 'ok';
};

const getAllMeetingDetails = async (job_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  const meeting_details = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .or('status.eq.confirmed,status.eq.completed')
      .eq('job_id', job_id),
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