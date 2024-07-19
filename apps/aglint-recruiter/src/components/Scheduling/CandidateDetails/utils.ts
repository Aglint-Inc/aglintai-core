/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  APIScheduleDebreif,
  DB,
  EmailTemplateAPi,
  InterviewSessionTypeDB,
  JobApplcationDB,
  PlanCombinationRespType,
  SupabaseType,
} from '@aglint/shared-types';
import { BookingConfirmationMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../Candidates/queries/utils';
import { selfScheduleReminderMailToCandidate } from './mailUtils';
import { SchedulingFlow } from './SchedulingDrawer/store';
import { SchedulingApplication } from './store';

export const fetchInterviewMeetingProgresstask = async ({
  session_ids,
}: {
  session_ids: string[];
}) => {
  try {
    const { data: intSes, error: errSes } = await supabase
      .from('interview_session')
      .select('*,interview_meeting(*)')
      .in('id', session_ids);

    if (errSes) throw new Error(errSes.message);

    const { data: intSesRel, error: errSesRel } = await supabase
      .from('interview_session_relation')
      .select('*,interview_module_relation(*,recruiter_user(*))')
      .in('session_id', session_ids);

    if (errSesRel) throw new Error(errSesRel.message);

    const resMeetings = intSes.map((session) => ({
      interview_session: session,
      interview_meeting: session.interview_meeting,
      interview_session_relation: intSesRel.filter(
        (rel) => rel.session_id === session.id,
      ),
    }));

    return resMeetings;
  } catch (e) {
    //
  }
};

export const updateApplicationStatus = async ({
  status,
  application_id,
}: {
  status: JobApplcationDB['status'];
  application_id: string;
}) => {
  const { error } = await supabase
    .from('applications')
    .update({
      status: status,
    })
    .eq('id', application_id);

  if (error) {
    return false;
  } else {
    return true;
  }
};

export const scheduleDebrief = async ({
  selectedDebrief,
  recruiter_id,
  user_tz,
  schedule_id,
  candidate_email,
  candidate_id,
  candidate_name,
  filter_id,
  initialSessions,
  selectedSessionIds,
  application_id,
  rec_user_id,
  supabase,
  task_id,
}: {
  selectedDebrief: PlanCombinationRespType;
  recruiter_id: string;
  user_tz: string;
  schedule_id: string;
  candidate_email: string;
  candidate_id: string;
  candidate_name: string;
  filter_id: string;
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: string[];
  application_id: string;
  rec_user_id: string;
  supabase: SupabaseType;
  task_id: string;
}) => {
  console.log({
    selectedDebrief,
    recruiter_id,
    user_tz,
    schedule_id,
    candidate_email,
    candidate_id,
    candidate_name,
    filter_id,
  });

  const bodyParams: APIScheduleDebreif = {
    session_id: selectedDebrief.sessions[0].session_id,
    schedule_id,
    user_tz,
    selectedOption: selectedDebrief,
    filter_id,
    task_id,
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/booking/schedule-debreif`,
    bodyParams,
  );

  if (res.status === 200) {
    return res.data;
  } else {
    console.log('Failed to schedule debrief');
    throw new Error('Failed to schedule debrief');
  }
};

export const createFilterJson = async ({
  sessions_ids,
  schedule_id,
  organizer_name,
  dateRange,
  supabase,
  rec_user_id,
}: {
  sessions_ids: string[];
  schedule_id: string;
  organizer_name: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  supabase: ReturnType<typeof createServerClient<DB>>;
  rec_user_id: string;
}) => {
  const { data: filterJson, error: errorFilterJson } = await supabase
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        organizer_name: organizer_name,
      },
      session_ids: sessions_ids,
      schedule_id: schedule_id,
      created_by: rec_user_id,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  return filterJson[0];
};

export const fetchInterviewSessionTask = async ({
  job_id,
  application_id,
  supabase,
}: {
  job_id: string;
  application_id: string;
  supabase: SupabaseType;
}) => {
  // used for fetching the sessions for the task
  try {
    const { data: schedule, error } = await supabase
      .from('interview_schedule')
      .select('*')
      .eq('application_id', application_id);

    if (error) throw new Error(error.message);

    if (schedule.length == 0) {
      const { data: interviewSession, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select(
            '*,interview_module(*),interview_plan!inner(*),interview_session_relation(id)',
          )
          .eq('interview_plan.job_id', job_id)
          .neq('session_type', 'debrief');

      if (interviewSessionError) throw new Error(interviewSessionError.message);
      const sessions = interviewSession
        .filter((ses) => ses.interview_session_relation.length > 0)
        .map(
          (meet) =>
            ({
              break_duration: meet.break_duration,
              created_at: meet.created_at,
              id: meet.id,
              interview_plan_id: meet.interview_plan_id,
              interviewer_cnt: meet.interviewer_cnt,
              location: meet.location,
              module_id: meet.module_id,
              name: meet.name,
              schedule_type: meet.schedule_type,
              session_duration: meet.session_duration,
              session_order: meet.session_order,
              session_type: meet.session_type,
            }) as InterviewSessionTypeDB,
        );

      return sessions.sort(
        (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
      ) as InterviewSessionTypeDB[];
    } else {
      const { data: interviewSessions, error: interviewSessionError } =
        await supabase
          .from('interview_session')
          .select(
            '*,interview_meeting!inner(*,interview_schedule(*)),interview_session_relation(id)',
          )
          .eq('interview_meeting.interview_schedule_id', schedule[0].id)
          .neq('session_type', 'debrief')
          .eq('interview_meeting.status', 'not_scheduled');

      if (interviewSessionError) throw new Error(interviewSessionError.message);

      return interviewSessions
        .filter((ses) => ses.interview_session_relation.length > 0)
        .sort(
          (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
        ) as InterviewSessionTypeDB[];
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const onClickResendInvite = async ({
  candidate_name,
  session_name,
  rec_user_id,
  application_id,
  filter_id,
  request_id,
  task_id,
}: {
  candidate_name: string;
  session_name: string;
  rec_user_id: string;
  application_id: string;
  filter_id: string | null;
  request_id: string | null;
  task_id: string;
}) => {
  try {
    if (filter_id) {
      const resMail = await selfScheduleReminderMailToCandidate({
        filter_id: filter_id,
        task_id,
      });

      if (resMail) {
        addScheduleActivity({
          title: `Resent booking link to ${candidate_name} for ${session_name}`,
          application_id: application_id,
          logged_by: 'user',
          supabase,
          created_by: rec_user_id,
        });
        toast.success('Invite resent successfully.');
      }
      return resMail;
    } else if (request_id) {
      const bodyParams: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
        {
          avail_req_id: request_id,
          organizer_user_id: rec_user_id,
        };

      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/sendAvailabilityRequest_email_applicant`,
        {
          meta: bodyParams,
        },
      );
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const getTaskDetails = async (application_id: string) => {
  const { data } = await supabase
    .from('tasks_view')
    .select('*')
    .eq('application_id', application_id);
  return data;
};
