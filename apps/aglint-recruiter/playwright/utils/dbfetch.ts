import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getCompanyDetails = async () => {
  const supabaseAdmin = await getSupabaseServer();
  const company = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('*, recruiter_user!inner(*)')
      .eq('recruiter_user.email', process.env.E2E_TEST_EMAIL)
      .single(),
  );
  return company;
};

export const getCandidateSelfSchedulingLink = async (request_id: string) => {
  const supabaseAdmin = await getSupabaseServer();
  const filter_json = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select()
      .eq('request_id', request_id)
      .single(),
  );
  return `${process.env.NEXT_PUBLIC_HOST_NAME}/self-scheduling/${filter_json.id}`;
};

export const getConfirmedMeetings = async () => {
  const companyDetails = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const confirmedMeetings = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select('*,applications!inner(*, candidates!inner(*))')
      .eq('applications.candidates.recruiter_id', companyDetails.id)
      .eq('status', 'confirmed'),
    false,
  );
  const sesnCancels = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select()
      .in(
        'session_id',
        confirmedMeetings.map((meeting) => meeting.session_id),
      ),
    false,
  );
  return confirmedMeetings.filter(
    (meeting) => !sesnCancels.find((s) => s.session_id === meeting.session_id),
  );
};

export const getMeetingInterviewers = async (meeting_id: string) => {
  const supabaseAdmin = await getSupabaseServer();

  const interviewers = supabaseWrap(
    await supabaseAdmin
      .from('meeting_interviewers')
      .select()
      .eq('is_confirmed', true)
      .eq('accepted_status', 'waiting')
      .eq('interviewer_type', 'qualified')
      .eq('meeting_id', meeting_id),
  );
  return interviewers;
};

export const getDeclineRequests = async (session_relation_id: string) => {
  const supabaseAdmin = await getSupabaseServer();

  const declineRequest = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('*,request!inner(*)')
      .eq('session_relation_id', session_relation_id)
      .eq('is_resolved', false)
      .single(),
  );
  return declineRequest.request;
};
