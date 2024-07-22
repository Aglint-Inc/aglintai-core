/* eslint-disable no-console */
import { SupabaseType } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  fetchApplicationDetails,
  fetchSessionDetailsFromInterviewPlan,
  fetchSessionDetailsFromSchedule,
} from '@/src/components/Scheduling/CandidateDetails/queries/utils';
import { createFilterJson } from '@/src/components/Scheduling/CandidateDetails/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { getScheduleName } from '@/src/components/Scheduling/utils';
import { agentTrigger } from '@/src/utils/scheduling/agentTrigger';
import { createCloneSession } from '@/src/utils/scheduling/createCloneSession';
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
      recruiter_id,
      recruiter_user_name,
      session_ids,
      task_id,
      type,
      candidate_name,
      company_name,
      job_id,
    } = req.body as ApiBodyParamsScheduleAgent;

    let resAgent = null;

    if (task_id) {
      resAgent = await scheduleWithAgent({
        application_id,
        dateRange,
        recruiter_id,
        recruiter_user_name,
        session_ids,
        task_id: task_id,
        type: type,
        candidate_name: candidate_name,
        company_name: company_name,
        rec_user_phone,
        rec_user_id,
        supabase: supabaseAdmin,
        job_id,
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
  recruiter_id,
  task_id,
  recruiter_user_name,
  candidate_name,
  company_name,
  rec_user_phone,
  rec_user_id,
  supabase,
  job_id,
}: {
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
  candidate_name: string;
  company_name: string;
  rec_user_phone: string;
  rec_user_id: string;
  supabase: SupabaseType;
  job_id: string;
}) => {
  console.log(application_id, 'application_id');
  console.log(task_id, 'task_id');

  if (type) {
    const { data: checkSch } = await supabase
      .from('interview_schedule')
      .select('id')
      .eq('application_id', application_id)
      .throwOnError();

    const resApplicationDetails = await fetchApplicationDetails({
      application_id,
      supabaseCaller: supabase,
    });

    if (checkSch.length === 0) {
      console.log('fetchInterviewDataJob');

      const sessionsWithPlan = await fetchSessionDetailsFromInterviewPlan({
        job_id,
        supabaseCaller: supabase,
      });

      const scheduleName = getScheduleName({
        job_title: resApplicationDetails.public_jobs.job_title,
        first_name: resApplicationDetails.candidates.first_name,
        last_name: resApplicationDetails.candidates.last_name,
      });

      const createCloneRes = await createCloneSession({
        is_get_more_option: false,
        application_id,
        allSessions: sessionsWithPlan,
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

      const { data: task, error: eroorSubTasks } = await supabase
        .from('new_tasks')
        .update({
          filter_id: filterJson.id,
        })
        .eq('id', task_id)
        .select();

      if (eroorSubTasks) throw new Error(eroorSubTasks.message);

      console.log(`task status updated to ${task[0].status}`);

      await addScheduleActivity({
        title: `Candidate invited for ${createCloneRes.refSessions
          .filter((ses) => ses.isSelected)
          .map((ses) => ses.interview_session.name)
          .join(' , ')} via ${
          type === 'email_agent' ? 'email agent' : 'phone agent'
        }`,
        logged_by: 'user',
        application_id,
        task_id,
        supabase,
        created_by: rec_user_id,
      });

      await agentTrigger({
        type,
        filterJsonId: filterJson.id,
        task_id,
        recruiter_user_name,
        candidate_name,
        company_name,
        jobRole: resApplicationDetails.public_jobs.job_title,
        candidate_email: resApplicationDetails.candidates.email,
        rec_user_phone,
        recruiter_user_id: rec_user_id,
      });
    } else {
      console.log('fetchInterviewDataSchedule');

      const sessionsWithPlan = await fetchSessionDetailsFromSchedule({
        application_id,
        supabaseCaller: supabase,
      });

      const selectedSessions = sessionsWithPlan.filter((ses) =>
        session_ids.includes(ses.interview_session.id),
      );

      await handleMeetingsOrganizerResetRelations({
        application_id,
        selectedSessions,
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

      await supabase
        .from('new_tasks')
        .update({
          filter_id: filterJson.id,
        })
        .eq('id', task_id)
        .throwOnError();

      await addScheduleActivity({
        title: `Candidate invited for ${selectedSessions
          .map((ses) => ses.interview_session.name)
          .join(' , ')} via ${
          type === 'email_agent' ? 'email agent' : 'phone agent'
        }`,
        logged_by: 'user',
        application_id,
        task_id,
        supabase,
        created_by: rec_user_id,
      });

      await agentTrigger({
        type,
        filterJsonId: filterJson.id,
        task_id,
        recruiter_user_name,
        candidate_name,
        company_name,
        jobRole: resApplicationDetails.public_jobs.job_title,
        candidate_email: resApplicationDetails.candidates.email,
        rec_user_phone,
        recruiter_user_id: rec_user_id,
      });
    }
    return true;
  } else {
    throw new Error('agent type not mentioned');
  }
};
