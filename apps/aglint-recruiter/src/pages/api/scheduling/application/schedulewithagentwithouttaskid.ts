/* eslint-disable no-console */
import { SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchInterviewDataJob,
  fetchInterviewDataSchedule,
} from '@/src/components/Scheduling/CandidateDetails/hooks';
import { createFilterJson } from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { getScheduleName } from '@/src/components/Scheduling/utils';
import { agentTrigger } from '@/src/utils/scheduling/agentTrigger';
import { createCloneSession } from '@/src/utils/scheduling/createCloneSession';
import { createTask } from '@/src/utils/scheduling/createTask';
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
  recruiter_id,
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
    const { data: checkSch, error: errorCheckSch } = await supabase
      .from('interview_schedule')
      .select('id')
      .eq('application_id', application_id);

    console.log(checkSch[0]);

    if (errorCheckSch) throw new Error(errorCheckSch.message);

    if (checkSch.length === 0) {
      console.log('fetchInterviewDataJob');

      const sessionsWithPlan = await fetchInterviewDataJob({
        application_id,
        supabase,
      });

      const scheduleName = getScheduleName({
        job_title: sessionsWithPlan.application.public_jobs.job_title,
        first_name: sessionsWithPlan.application.candidates.first_name,
        last_name: sessionsWithPlan.application.candidates.last_name,
      });

      const createCloneRes = await createCloneSession({
        is_get_more_option: false,
        application_id,
        allSessions: sessionsWithPlan.sessions,
        session_ids,
        scheduleName,
        supabase,
        recruiter_id: recruiter_id,
        rec_user_id,
        meeting_flow: type === 'email_agent' ? 'mail_agent' : 'phone_agent',
      });

      console.log(
        createCloneRes.refSessions
          .filter((ses) => ses.isSelected)
          .map(
            (ses) =>
              `old session_id ${ses.interview_session.id} to ${ses.newId}`,
          ),
      );

      const filterJson = await createFilterJson({
        dateRange,
        organizer_name: recruiter_user_name,
        sessions_ids: createCloneRes.session_ids,
        schedule_id: createCloneRes.schedule.id,
        supabase,
        rec_user_id,
      });

      console.log(filterJson.id, 'filter_id');

      const selSes = createCloneRes.refSessions.filter((ses) => ses.isSelected);

      const task = await createTask({
        application_id,
        dateRange,
        filter_id: filterJson.id,
        rec_user_id,
        recruiter_id,
        selectedSessions: selSes,
        type,
        recruiter_user_name,
        supabase,
        candidate_name,
      });

      addScheduleActivity({
        title: `Candidate invited for session ${selSes
          .map((ses) => ses.interview_session.name)
          .join(' , ')} via ${
          type === 'email_agent' ? 'Email Agent' : 'Phone Agent'
        }`,
        logged_by: 'user',

        application_id,
        task_id: task.id,
        supabase,
        created_by: rec_user_id,
      });

      await agentTrigger({
        type,
        filterJsonId: filterJson.id,
        task_id: task.id,
        recruiter_user_name,
        candidate_name,
        company_name,
        jobRole: sessionsWithPlan.application.public_jobs.job_title,
        candidate_email: sessionsWithPlan.application.candidates.email,
        rec_user_phone,
        recruiter_user_id: rec_user_id,
      });
    } else {
      console.log('fetchInterviewDataSchedule');

      const sessionsWithPlan = await fetchInterviewDataSchedule(
        checkSch[0].id,
        application_id,
        supabase,
      );

      const selectedSessions = sessionsWithPlan.sessions.filter((ses) =>
        session_ids.includes(ses.interview_session.id),
      );

      await handleMeetingsOrganizerResetRelations({
        application_id,
        selectedSessions: selectedSessions,
        supabase,
        meeting_flow: type === 'email_agent' ? 'mail_agent' : 'phone_agent',
      });

      const filterJson = await createFilterJson({
        dateRange,
        organizer_name: recruiter_user_name,
        sessions_ids: session_ids,
        schedule_id: checkSch[0].id,
        supabase,
        rec_user_id,
      });

      const task = await createTask({
        application_id,
        dateRange,
        filter_id: filterJson.id,
        rec_user_id,
        recruiter_id,
        selectedSessions,
        type,
        recruiter_user_name,
        supabase,
        candidate_name,
      });

      await addScheduleActivity({
        title: `Candidate invited for session ${selectedSessions
          .map((ses) => ses.interview_session.name)
          .join(' , ')} via ${
          type === 'email_agent' ? 'Email Agent' : 'Phone Agent'
        }`,
        logged_by: 'user',

        application_id,
        task_id: task.id,
        supabase,
        created_by: rec_user_id,
      });

      await agentTrigger({
        type,
        filterJsonId: filterJson.id,
        task_id: task.id,
        recruiter_user_name,
        candidate_name,
        company_name,
        jobRole: sessionsWithPlan.application.public_jobs.job_title,
        candidate_email: sessionsWithPlan.application.candidates.email,
        rec_user_phone,
        recruiter_user_id: rec_user_id,
      });
    }
    return true;
  }
};
