import { EmailTemplateAPi, InterviewSession } from '@aglint/shared-types';
import { schema_send_avail_req_link, supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_send_avail_req_link, {
      ...req.body,
    });
    const organizer_id = await getOrganizerId(
      parsedData.application_id,
      supabaseAdmin,
    );
    const selected_session_names = parsedData.session_details.map((s) =>
      s.session_name.toLowerCase(),
    );
    const { schedule_id, cand_sessions: sessions_data } =
      await getCandidateSessions(
        parsedData.application_id,
        parsedData.job_id,
        parsedData.company_id,
        organizer_id,
      );

    const selected_sessions = await sessions_data
      .filter((s) =>
        selected_session_names.find(
          (sel_sess) => sel_sess === s.name.toLowerCase(),
        ),
      )
      .map((s) => ({
        interview_session_id: s.id,
        interview_schedule_id: schedule_id,
        interview_meeting_id: s.meeting_id,
      }));

    await handleMeetingsOrganizerResetRelations({
      application_id: parsedData.application_id,
      meeting_flow: 'candidate_request',
      selectedSessions: selected_sessions,
      supabase: supabaseAdmin,
    });
    const [avail_data] = supabaseWrap(
      await supabaseAdmin
        .from('candidate_request_availability')
        .insert({
          application_id: parsedData.application_id,
          recruiter_id: parsedData.company_id,
          date_range: [parsedData.start_date, parsedData.end_date],
        })
        .select(),
    );
    await supabaseAdmin.from('request_session_relation').insert(
      selected_sessions.map((ele) => ({
        session_id: ele.interview_session_id,
        request_availability_id: avail_data.id,
      })),
    );

    const avail_link = `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${avail_data.id}`;
    await sendMail(avail_data.application_id, organizer_id);
    return res.status(200).json({ avail_link: avail_link });
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
};

export default handler;

const sendMail = async (avail_req_id: string, organizer_id) => {
  try {
    const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
      {
        organizer_user_id: organizer_id,
        avail_req_id: avail_req_id,
      };
    await axios.post(`/api/emails/sendAvailabilityRequest_email_applicant`, {
      meta: {
        ...payload,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getCandidateSessions = async (
  application_id: string,
  job_id: string,
  company_id: string,
  organizer_id: string,
) => {
  let cand_sessions: (Pick<
    InterviewSession,
    | 'id'
    | 'name'
    | 'break_duration'
    | 'session_type'
    | 'session_order'
    | 'meeting_id'
  > & { schedule_id: string })[] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('status', 'not_scheduled')
      .eq('application_id', application_id),
    false,
  ).map((s) => ({
    id: s.session_id,
    name: s.session_name,
    break_duration: s.break_duration,
    session_type: s.session_type,
    session_order: s.session_order,
    meeting_id: s.id,
    schedule_id: s.interview_schedule_id,
  }));

  let schedule_id = null;
  if (cand_sessions.length > 0) {
    schedule_id = cand_sessions[0].schedule_id;
  } else {
    const [int_plan] = supabaseWrap(
      await supabaseAdmin.from('interview_plan').select().eq('job_id', job_id),
    );
    cand_sessions = supabaseWrap(
      await supabaseAdmin
        .from('interview_session')
        .select()
        .eq('interview_plan_id', int_plan.id),
    ).map((s) => ({
      id: s.id,
      name: s.name,
      break_duration: s.break_duration,
      session_type: s.session_type,
      session_order: s.session_order,
      meeting_id: s.meeting_id,
      schedule_id: null,
    }));

    const [schedule] = supabaseWrap(
      await supabaseAdmin
        .from('interview_schedule')
        .insert({
          application_id: application_id,
          recruiter_id: company_id,
          schedule_name: '',
          created_by: organizer_id,
        })
        .select(),
    );
    schedule_id = schedule.id;
  }

  return { cand_sessions, schedule_id };
};
