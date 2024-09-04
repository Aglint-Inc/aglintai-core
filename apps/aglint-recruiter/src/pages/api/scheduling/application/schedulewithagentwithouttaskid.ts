/* eslint-disable no-console */
import { type SupabaseType } from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { agentTrigger } from '@/src/utils/scheduling/agentTrigger';
import { createFilterJson } from '@/src/utils/scheduling/createFilterJson';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export interface ApiBodyParamsScheduleAgentWithoutTaskId {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  task_id: string;
  recruiter_user_name: string;
  candidate_name?: string;
  company_name?: string;
  rec_user_phone: string;
  rec_user_id: string;
  user_tz: string;
  trigger_count: number;
  job_id: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      dateRange,
      rec_user_id,
      rec_user_phone,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      type,
      candidate_name,
      company_name,
      user_tz,
    } = req.body as ApiBodyParamsScheduleAgentWithoutTaskId;

    const resAgent = await scheduleWithAgentWithoutTaskId({
      application_id,
      dateRange,
      recruiter_id,
      recruiter_user_name,
      session_ids,
      type: type,
      candidate_name: candidate_name,
      company_name: company_name,
      rec_user_phone,
      rec_user_id,
      supabase: supabaseAdmin,
      user_tz,
    });

    return res.status(200).send(resAgent);
  } catch (error) {
    // console.log('error', error);
    res.status(400).send(error.message);
  }
};

export default handler;

const scheduleWithAgentWithoutTaskId = async ({
  type,
  session_ids,
  application_id,
  dateRange,
  recruiter_user_name,
  candidate_name,
  company_name,
  rec_user_phone,
  rec_user_id,
  supabase,
}: {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  recruiter_user_name: string;
  candidate_name?: string;
  company_name?: string;
  rec_user_phone: string;
  rec_user_id: string;
  supabase: SupabaseType;
  user_tz: string;
}) => {
  console.log(application_id, 'application_id');

  if (type) {
    const app = (
      await supabaseAdmin
        .from('applications')
        .select('id,candidates(email),public_jobs(job_title)')
        .eq('id', application_id)
        .single()
        .throwOnError()
    ).data;

    const sessions = (
      await supabaseAdmin
        .from('interview_session')
        .select('*,interview_meeting(*)')
        .in('id', session_ids)
        .throwOnError()
    ).data;

    const filterJson = await createFilterJson({
      dateRange,
      organizer_name: recruiter_user_name,
      sessions_ids: session_ids,
      supabase,
      rec_user_id,
      application_id,
    });

    await agentTrigger({
      type,
      filterJsonId: filterJson.id,
      recruiter_user_name,
      candidate_name,
      company_name,
      jobRole: app.public_jobs.job_title,
      candidate_email: app.candidates.email,
      rec_user_phone,
      recruiter_user_id: rec_user_id,
    });

    await handleMeetingsOrganizerResetRelations({
      application_id,
      selectedSessions: sessions.map((ses) => ({
        interview_session_id: ses.id,
        interview_meeting_id: ses.meeting_id,
        interview_schedule_id: ses.interview_meeting.interview_schedule_id,
        job_id: ses.interview_meeting.job_id,
        recruiter_id: ses.interview_meeting.recruiter_id,
      })),
      supabase,
      meeting_flow: type === 'email_agent' ? 'mail_agent' : 'phone_agent',
    });

    await addScheduleActivity({
      title: `Candidate invited for session ${sessions
        .map((ses) => ses.name)
        .join(' , ')} via ${
        type === 'email_agent' ? 'Email Agent' : 'Phone Agent'
      }`,
      logged_by: 'user',

      application_id,
      supabase,
      created_by: rec_user_id,
    });
    return true;
  }
};
