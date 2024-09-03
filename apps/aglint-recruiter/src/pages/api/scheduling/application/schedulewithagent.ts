/* eslint-disable no-console */
import { type SupabaseType } from '@aglint/shared-types';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { agentTrigger } from '@/src/utils/scheduling/agentTrigger';
import { createFilterJson } from '@/src/utils/scheduling/createFilterJson';
import { handleMeetingsOrganizerResetRelations } from '@/src/utils/scheduling/upsertMeetingsWithOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type ApiBodyParamsScheduleAgent = {
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
  job_id: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      application_id,
      dateRange,
      rec_user_id,
      rec_user_phone,
      recruiter_user_name,
      session_ids,
      task_id,
      type,
      candidate_name,
      company_name,
    } = req.body as ApiBodyParamsScheduleAgent;

    let resAgent = null;

    if (task_id) {
      resAgent = await scheduleWithAgent({
        application_id,
        dateRange,
        recruiter_user_name,
        session_ids,
        task_id: task_id,
        type: type,
        candidate_name: candidate_name,
        company_name: company_name,
        rec_user_phone,
        rec_user_id,
        supabase: supabaseAdmin,
      });
    } else {
      console.log('no task id');
      return res.status(200).send('no task id');
    }

    return res.status(200).send(resAgent);
  } catch (error) {
    // console.log('error', error);
    res.status(500).send(error.message);
  }
};

export default handler;

export const scheduleWithAgent = async ({
  type,
  session_ids,
  application_id,
  dateRange,
  task_id,
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
  task_id: string;
  recruiter_user_name: string;
  candidate_name: string;
  company_name: string;
  rec_user_phone: string;
  rec_user_id: string;
  supabase: SupabaseType;
}) => {
  console.log(application_id, 'application_id');
  console.log(task_id, 'task_id');

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

    await handleMeetingsOrganizerResetRelations({
      application_id,
      selectedSessions: sessions.map((ses) => ({
        interview_session_id: ses.id,
        interview_meeting_id: ses.interview_meeting.id,
        interview_schedule_id: ses.interview_meeting.interview_schedule_id,
        job_id: ses.interview_meeting.job_id,
        recruiter_id: ses.interview_meeting.recruiter_id,
      })),
      supabase,
      meeting_flow: type === 'email_agent' ? 'mail_agent' : 'phone_agent',
    });

    const filterJson = await createFilterJson({
      dateRange,
      organizer_name: recruiter_user_name,
      sessions_ids: session_ids,
      supabase,
      rec_user_id,
      application_id,
    });

    await supabase
      .from('new_tasks')
      .update({
        filter_id: filterJson.id,
      })
      .eq('id', task_id)
      .throwOnError();

    await addScheduleActivity({
      title: `Candidate invited for ${sessions
        .map((ses) => ses.name)
        .join(' , ')} via ${
        type === 'email_agent' ? 'email agent' : 'phone agent'
      }`,
      logged_by: 'user',
      application_id,
      supabase,
      created_by: rec_user_id,
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
    return true;
  } else {
    throw new Error('agent type not mentioned');
  }
};
