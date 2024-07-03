/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  APIFindAvailability,
  APIScheduleDebreif,
  DatabaseEnums,
  DatabaseTableInsert,
  DB,
  EmailTemplateAPi,
  InterviewMeetingTypeDb,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  SupabaseType,
} from '@aglint/shared-types';
import { BookingConfirmationMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import {
  geoCodeLocation,
  getTimeZoneOfGeo,
} from '@/src/utils/location-to-time-zone';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../Candidates/queries/utils';
// import { mailHandler } from '../Candidates/utils';
import { getScheduleName } from '../utils';
import { fetchInterviewDataJob, fetchInterviewDataSchedule } from './hooks';
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

export const createCloneSession = async ({
  is_get_more_option,
  application_id,
  allSessions,
  session_ids,
  scheduleName,
  supabase,
  recruiter_id,
  rec_user_id,
  meeting_flow,
}: {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  recruiter_id: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
  rec_user_id: string;
  meeting_flow: DatabaseEnums['meeting_flow'];
}) => {
  // create schedule first then create sessions and meetings and then create session relation
  let new_schedule_id = uuidv4();
  try {
    const { data, error } = await supabase
      .from('interview_schedule')
      .insert({
        is_get_more_option: is_get_more_option,
        application_id: application_id,
        schedule_name: scheduleName,
        id: new_schedule_id,
        recruiter_id: recruiter_id,
        created_by: rec_user_id,
      })
      .select();

    if (error) throw new Error(error.message);
    const refSessions = allSessions.map((session) => ({
      ...session,
      newId: uuidv4(),
      isSelected: session_ids.includes(session.interview_session.id),
      new_meeting_id: uuidv4(),
      new_schedule_id: new_schedule_id,
    }));

    const organizer_id = await getOrganizerId(application_id, supabase);

    const insertableMeetings: DatabaseTableInsert['interview_meeting'][] =
      refSessions.map((ses) => {
        return {
          interview_schedule_id: ses.new_schedule_id,
          status: ses.isSelected ? 'waiting' : 'not_scheduled',
          instructions: refSessions.find((s) => s.interview_session.id === ses.interview_session.id)
            ?.interview_module?.instructions,
          id: ses.new_meeting_id,
          organizer_id,
          meeting_flow,
        };
      });

    const { data: insertedMeetings, error: errorInsertedMeetings } =
      await supabase
        .from('interview_meeting')
        .insert(insertableMeetings)
        .select();

    if (errorInsertedMeetings) throw new Error(errorInsertedMeetings.message);

    const insertableSessions: DatabaseTableInsert['interview_session'][] =
      allSessions.map((session) => ({
        interview_plan_id: null,
        id: refSessions.find((ref) => ref.interview_session.id === session.interview_session.id).newId,
        break_duration: session.interview_session.break_duration,
        interviewer_cnt: session.interview_session.interviewer_cnt,
        location: session.interview_session.location,
        module_id: session.interview_session.module_id,
        name: session.interview_session.name,
        schedule_type: session.interview_session.schedule_type,
        session_duration: session.interview_session.session_duration,
        session_order: session.interview_session.session_order,
        session_type: session.interview_session.session_type,
        meeting_id: refSessions.find((ref) => ref.interview_session.id === session.interview_session.id)
          .new_meeting_id,
      }));

    const { error: errorInsertedSessions } = await supabase
      .from('interview_session')
      .insert(insertableSessions);

    if (errorInsertedSessions) throw new Error(errorInsertedSessions.message);

    let insertableUserRelation: DatabaseTableInsert['interview_session_relation'][] =
      [];

    refSessions.map((session) => {
      session.users?.map((user) => {
        const insertRel: DatabaseTableInsert['interview_session_relation'] = {
          interview_module_relation_id: user.interview_module_relation?.id,
          interviewer_type: user.interview_session_relation.interviewer_type,
          session_id: session.newId,
          training_type: user.interview_session_relation.training_type,
          user_id: user.user_details.user_id,
        };
        insertableUserRelation.push(insertRel);
      });
    });

    const { error: errorInsertedUserRelation } = await supabase
      .from('interview_session_relation')
      .insert(insertableUserRelation);

    if (errorInsertedUserRelation)
      throw new Error(errorInsertedUserRelation.message);

    const newSessionIds = refSessions
      .filter((ses) => ses.isSelected)
      .map((session) => session.newId);

    const updatedRefSessions = refSessions.map((ses) => ({
      ...ses,
      interview_meeting: insertedMeetings.find(
        (meet) => meet.id === ses.new_meeting_id,
      ),
    }));

    // task session replace
    const oldSessionIds = refSessions.map((ses) => ses.interview_session.id);

    const { data: taskSelRel, error: errTaskSelRel } = await supabase
      .from('task_session_relation')
      .select()
      .in('session_id', oldSessionIds);

    if (errTaskSelRel) throw new Error(errTaskSelRel.message);

    if (taskSelRel.length > 0) {
      const { error: errTaskUpdSesRel } = await supabase
        .from('task_session_relation')
        .upsert(
          taskSelRel.map((taskRel) => ({
            id: taskRel.id,
            session_id: refSessions.find((ses) => ses.interview_session.id === taskRel.session_id)
              .newId,
            task_id: taskRel.task_id,
          })),
        );

      if (errTaskUpdSesRel) throw new Error(errTaskUpdSesRel.message);
    }

    // task session replace

    return {
      schedule: data[0],
      session_ids: newSessionIds,
      refSessions: updatedRefSessions,
    };
  } catch (e) {
    await supabase
      .from('interview_schedule')
      .delete()
      .eq('id', new_schedule_id);
    // eslint-disable-next-line no-console
    console.log(e.message);
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
}: {
  selectedDebrief: SchedulingFlow['filteredSchedulingOptions'][number];
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
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/booking/schedule-debreif`,
    bodyParams,
  );

  if (res.status === 200) {
    const session_id = selectedDebrief.sessions[0].session_id;
    const { data: session, error: errorSes } = await supabase
      .from('interview_session')
      .select(
        '*,interview_meeting(id,start_time,end_time,status,cal_event_id,meeting_link),interview_session_relation(*,interview_module_relation(id,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
      )
      .eq('id', session_id);

    if (errorSes) throw new Error(errorSes.message);

    const metadata: BookingConfirmationMetadata = {
      action: 'waiting',
      filter_id,
      sessions: session,
      type: 'booking_confirmation',
    };

    addScheduleActivity({
      title: `Scheduling ${initialSessions
        .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
        .map((ses) => ses.interview_session.name)
        .join(' , ')}`,
      logged_by: 'user',
      application_id,
      supabase,
      created_by: rec_user_id,
      metadata,
    });
  }
};

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
  supabase: ReturnType<typeof createServerClient<DB>>;
}) => {
  try {
    console.log(application_id, 'application_id');
    console.log(task_id, 'task_id');

    if (type) {
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', application_id);

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
            .map((ses) => `old session_id ${ses.interview_session.id} to ${ses.newId}`),
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
            session_ids: createCloneRes.refSessions
              .filter((ses) => ses.isSelected)
              .map((ses) => {
                return {
                  id: ses.interview_session.id,
                  name: ses.interview_session.name,
                  interview_meeting: ses.interview_meeting
                    ? {
                        id: ses.interview_meeting.id,
                        start_time: ses.interview_meeting.start_time,
                        end_time: ses.interview_meeting.end_time,
                        meeting_link: ses.interview_meeting.meeting_link,
                      }
                    : null,
                  session_order: ses.interview_session.session_order,
                  users: [],
                };
              }),
          })
          .eq('id', task_id)
          .select();
        if (eroorSubTasks) throw new Error(eroorSubTasks.message);

        console.log(`task status updated to ${task[0].status}`);

        addScheduleActivity({
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
        const organizer_id = await getOrganizerId(application_id, supabase);
        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert(
            selectedSessions.map((ses) => ({
              status: 'waiting',
              id: ses.interview_meeting.id,
              interview_schedule_id:
                ses.interview_meeting.interview_schedule_id,
              organizer_id,
            })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const filterJson = await createFilterJson({
          dateRange,
          organizer_name: recruiter_user_name,
          sessions_ids: session_ids,
          schedule_id: checkSch[0].id,
          supabase,
          rec_user_id,
        });

        const { error: eroorSubTasks } = await supabase
          .from('new_tasks')
          .update({
            filter_id: filterJson.id,
            session_ids: selectedSessions.map((ses) => {
              return {
                id: ses.interview_session.id,
                name: ses.interview_session.name,
                interview_meeting: ses.interview_meeting
                  ? {
                      id: ses.interview_meeting.id,
                      start_time: ses.interview_meeting.start_time,
                      end_time: ses.interview_meeting.end_time,
                      meeting_link: ses.interview_meeting.meeting_link,
                    }
                  : null,
                session_order: ses.interview_session.session_order,
                users: [],
              };
            }),
          })
          .eq('id', task_id);
        if (eroorSubTasks) throw new Error(eroorSubTasks.message);

        addScheduleActivity({
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
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          candidate_email: sessionsWithPlan.application.candidates.email,
          rec_user_phone,
          recruiter_user_id: rec_user_id,
        });
      }
      return true;
    } else {
      throw new Error('agent type not mentioned');
    }
  } catch (err) {
    console.log(err?.message || err);
  }
};

export const scheduleWithAgentWithoutTaskId = async ({
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
  supabase: ReturnType<typeof createServerClient<DB>>;
  user_tz: string;
}) => {
  try {
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
            .map((ses) => `old session_id ${ses.interview_session.id} to ${ses.newId}`),
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

        const selSes = createCloneRes.refSessions.filter(
          (ses) => ses.isSelected,
        );

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
        const organizer_id = await getOrganizerId(application_id, supabase);
        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert(
            selectedSessions.map((ses) => ({
              status: 'waiting',
              id: ses.interview_meeting.id,
              interview_schedule_id:
                ses.interview_meeting.interview_schedule_id,
              organizer_id,
            })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

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

        addScheduleActivity({
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
  } catch (e) {
    console.log(e);
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

export const agentTrigger = async ({
  type,
  filterJsonId,
  task_id,
  recruiter_user_name,
  candidate_name,
  company_name,
  jobRole,
  candidate_email,
  rec_user_phone = '',

  recruiter_user_id,
}: {
  type: 'email_agent' | 'phone_agent';
  filterJsonId: string;
  task_id: string;
  recruiter_user_name: string;
  candidate_name: string;
  company_name: string;
  jobRole: string;
  candidate_email: string;
  rec_user_phone: string;
  recruiter_user_id: string;
}) => {
  console.log({
    type,
    candidate_name,
    candidate_email,
    rec_user_phone: formatPhoneNumber(rec_user_phone),
  });

  if (type === 'email_agent') {
    const bodyParams: InitAgentBodyParams = {
      filter_json_id: filterJsonId,
      task_id: task_id,
      recruiter_user_id,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/mail-agent/init-agent`,
      bodyParams,
    );

    if (res?.status === 200) {
      console.log(res);

      console.log('mail agent triggered successfully');
    } else {
      console.log('error in mail agent');
    }

    return res.status;
  } else if (type === 'phone_agent') {
    const res = await axios.post(
      // 'https://rested-logically-lynx.ngrok-free.app/api/schedule-agent/create-phone-call',
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/schedule-agent/create-phone-call`,
      {
        begin_sentence_template: `Hi ${candidate_name}, this is ${recruiter_user_name} calling from ${company_name}. We wanted to schedule an interview for the position of ${jobRole}, Is this the right time to talk?`,
        interviewer_name: recruiter_user_name,
        // to_phone_no: '+919482306657',
        from_phone_no: '+12512066348',
        to_phone_no: formatPhoneNumber(rec_user_phone),
        // retell_agent_id: 'dcc1869a822931ef646f28e185e7402e',
        retell_agent_id: process.env.RETELL_AGENT_ID,
        filter_json_id: filterJsonId,
        cand_email: candidate_email,
        // cand_email: sessionsWithPlan.application.candidates.email,
        task_id: task_id,
      },
    );

    if (res?.status === 200) {
      console.log('phone agent triggered successfully');
    } else {
      console.log('error in phone agent');
    }
    return res.status;
  }
};

export const createTask = async ({
  selectedSessions,
  application_id,
  rec_user_id,
  recruiter_id,
  dateRange,
  filter_id,
  type,
  recruiter_user_name,
  supabase,
  candidate_name,
}: {
  selectedSessions: Awaited<
    ReturnType<typeof fetchInterviewDataJob>
  >['sessions'];
  application_id: string;
  rec_user_id: string;
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  filter_id: string;
  type: 'phone_agent' | 'email_agent' | 'user';
  recruiter_user_name: string;
  candidate_name: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
}) => {
  const assignee =
    type == 'email_agent'
      ? EmailAgentId
      : type == 'phone_agent'
        ? PhoneAgentId
        : rec_user_id;

  const { data: task, error: errorTasks } = await supabase
    .from('new_tasks')
    .insert({
      name: `Schedule interview for ${candidate_name} - ${selectedSessions
        .map((ses) => ses.interview_session.name)
        .join(' , ')}`,
      application_id,
      created_by: rec_user_id,
      status: 'in_progress',
      recruiter_id,
      due_date: dateRange.end_date,
      schedule_date_range: dateRange,
      start_date: new Date().toISOString(),
      assignee: [assignee],
      filter_id: filter_id,
      type: type === 'user' ? 'self_schedule' : 'schedule',
      trigger_count: 1,
      task_owner: rec_user_id,
    })
    .select()
    .single();

  if (errorTasks) throw new Error(errorTasks.message);

  const insertTaskSesRels: DatabaseTableInsert['task_session_relation'][] =
    selectedSessions.map((ses) => {
      return {
        task_id: task.id,
        session_id: ses.interview_session.id,
      };
    });

  const { data: taskSesRel, error: errorTaskSesRel } = await supabase
    .from('task_session_relation')
    .insert(insertTaskSesRels);

  if (errorTaskSesRel) throw new Error(errorTaskSesRel.message);

  await createTaskProgress({
    type: 'create_task',
    data: {
      progress_type: 'schedule',
      created_by: { id: rec_user_id, name: recruiter_user_name },
      task_id: task.id,
    },
    optionData: {
      candidateName: candidate_name,
      sessions: selectedSessions.map((ele) => ({
        id: ele.interview_session.id,
        name: ele.interview_session.name,
      })) as meetingCardType[],
    },
    supabaseCaller: supabase,
  });

  console.log(`Created task ${task.id}`);

  return task;
};

function formatPhoneNumber(phoneNumber) {
  // Remove all non-numeric characters except '+'
  const numericPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

  return numericPhoneNumber;
}

const getCandidateTimezone = async ({
  location,
  candidate_id,
}: {
  location: string;
  candidate_id: string;
}) => {
  const resGeoCode = await geoCodeLocation(location);
  let timeZone = null;
  if (resGeoCode) {
    const resTimezone = await getTimeZoneOfGeo(resGeoCode);
    timeZone = resTimezone;
    if (resTimezone) {
      const { data } = await supabase
        .from('candidates')
        .update({
          timezone: resTimezone,
        })
        .eq('id', candidate_id)
        .select();
      console.log(data);
    }
  }
  return timeZone;
};

const checkAvailibility = async ({
  session_ids,
  recruiter_id,
  dateRange,
  timezone,
  task_id,
  type,
}: {
  session_ids: string[];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  timezone: string;
  task_id: string;
  type: 'phone_agent' | 'email_agent';
}) => {
  const assignee = type == 'email_agent' ? EmailAgentId : PhoneAgentId;
  const resAllOptions = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/find_availability`,
    {
      session_ids: session_ids,
      recruiter_id: recruiter_id,
      start_date_str: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
      end_date_str: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
      candidate_tz: timezone || 'America/Los_Angeles',
      is_debreif: false,
    } as APIFindAvailability,
  );

  if (resAllOptions.data.length === 0) {
    console.log('No slots for selected date range');

    const { error } = await supabase
      .from('new_tasks')
      .update({
        status: 'failed',
      })
      .eq('id', task_id);

    if (error) {
      console.log(error.message);
    }

    await createTaskProgress({
      type: 'slots_failed',
      data: {
        progress_type: 'standard',
        created_by: {
          id: assignee,
          name: type === 'email_agent' ? 'Email Agent' : 'Phone Agent',
        },
        task_id: task_id,
      },
      optionData: {
        prevScheduleDateRange: dateRange,
      },
      supabaseCaller: supabase,
    });

    return false;
  } else {
    return true;
  }
};

export const onClickResendInvite = async ({
  candidate_name,
  session_name,
  rec_user_id,
  application_id,
  filter_id,
  request_id,
}: {
  candidate_name: string;
  session_name: string;
  rec_user_id: string;
  application_id: string;
  filter_id: string | null;
  request_id: string | null;
}) => {
  try {
    if (filter_id) {
      const resMail = await selfScheduleReminderMailToCandidate({
        filter_id: filter_id,
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
          recruiter_user_id: rec_user_id,
        };

      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/emails/sendAvailabilityRequest_email_applican`,
        {
          meta: bodyParams,
        },
      );
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const getOrganizerId = async (
  application_id: string,
  supabase: SupabaseType,
) => {
  const { data: app, error: errApp } = await supabase
    .from('applications')
    .select(
      'public_jobs(interview_coordinator,recruiter,recruiting_coordinator,hiring_manager,sourcer,recruiter_id)',
    )
    .eq('id', application_id)
    .single();

  if (errApp) throw new Error(errApp.message);

  let organizer_id =
    app.public_jobs.recruiting_coordinator ||
    app.public_jobs.interview_coordinator ||
    app.public_jobs.hiring_manager ||
    app.public_jobs.recruiter;

  if (!organizer_id) {
    const { data: recRel, error: errRecRel } = await supabase
      .from('recruiter_relation')
      .select('*')
      .eq('recruiter_id', app.public_jobs.recruiter_id)
      .eq('role', 'admin')
      .single();

    if (errRecRel) throw new Error(errRecRel.message);

    organizer_id = recRel.user_id;
  }

  return organizer_id;
};
