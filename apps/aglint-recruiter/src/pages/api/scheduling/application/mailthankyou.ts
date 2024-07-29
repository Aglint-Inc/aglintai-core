/* eslint-disable security/detect-object-injection */
import {
  APICandScheduleMailThankYou,
  EmailTemplateAPi,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import { agent_activities } from '@/src/utils/scheduling_v2/agents_activity';
import { getCandidateLogger } from '@/src/utils/scheduling_v2/getCandidateLogger';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { ApiDebriefAddUsers } from './debrief-add-users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      cand_tz,
      session_ids,
      task_id,
      application_id,
      filter_id,
      availability_request_id,
      schedule_id,
      is_debreif,
      booking_request_from = 'candidate',
    } = req.body as APICandScheduleMailThankYou;

    const { candidate, meeting_data } = await fetchSessionDetails(
      session_ids,
      application_id,
    );

    addScheduleActivity({
      title: `Booked ${meeting_data.map((ses) => ses.name).join(' , ')}`,
      application_id: application_id,
      logged_by: 'candidate',
      supabase: supabaseAdmin,
      created_by: null,
      task_id,
      metadata: {
        type: 'booking_confirmation',
        sessions: meeting_data,
        filter_id,
        availability_request_id,
        action: 'waiting',
      },
    });

    if (task_id) {
      supabaseWrap(
        await supabaseAdmin
          .from('new_tasks')
          .update({
            status: 'completed',
          })
          .eq('id', task_id)
          .select(),
      );
      const candLogger = getCandidateLogger(
        task_id,
        getFullName(candidate.first_name, candidate.last_name),
        candidate.id,
        'candidate',
      );
      const meeging_start_time = meeting_data.sort(
        (m1, m2) => m1.session_order - m2.session_order,
      )[0].interview_meeting.start_time;

      await candLogger(
        agent_activities['email_agent'].tools['book-interview-slot']
          .scheduled_sucess,
        {
          '{candidate}': getFullName(candidate.first_name, candidate.last_name),
          '{time_format}': userTzDayjs(meeging_start_time)
            .tz(cand_tz)
            .toISOString(),
        },
        booking_request_from,
        'interview_schedule',
      );
    }

    if (!is_debreif) {
      const payload: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'] =
        {
          availability_req_id: availability_request_id,
          application_id: application_id,
          session_ids: session_ids,
          filter_id: filter_id,
          schedule_id: schedule_id,
        };
      await axios.post(
        `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/confirmInterview_email_applicant`,
        { ...payload },
      );

      if (filter_id) {
        const payloadDebriefAddUsers: ApiDebriefAddUsers = {
          filter_id,
        };
        axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/debrief-add-users`,
          payloadDebriefAddUsers,
        );
      }
    }

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

export const fetchSessionDetails = async (
  session_ids: string[],
  application_id: string,
) => {
  const meeting_data = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(id,start_time,end_time,status,cal_event_id,meeting_link),interview_session_relation(*,interview_module_relation(id,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
      )
      .in('id', session_ids),
  );
  const [application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('id,candidates(id,first_name,last_name,email)')
      .eq('id', application_id),
  );
  return { meeting_data, candidate: application.candidates };
};
