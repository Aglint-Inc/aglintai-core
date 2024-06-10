/* eslint-disable no-console */
import {
  APIFindAvailability,
  APIScheduleDebreif,
  DatabaseTable,
  DB,
  InterviewMeetingTypeDb,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  SupabaseType,
} from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { meetingCardType } from '@/src/components/Tasks/TaskBody/ViewTask/Progress/SessionCard';
import { createTaskProgress } from '@/src/components/Tasks/utils';
import { getFullName } from '@/src/utils/jsonResume';
import {
  geoCodeLocation,
  getTimeZoneOfGeo,
} from '@/src/utils/location-to-time-zone';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../Candidates/queries/utils';
import { mailHandler } from '../Candidates/utils';
import { getScheduleName } from '../utils';
import { fetchInterviewDataJob, fetchInterviewDataSchedule } from './hooks';
import { SchedulingFlow } from './SelfSchedulingDrawer/store';
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
}: {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  recruiter_id: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
  rec_user_id: string;
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
      isSelected: session_ids.includes(session.id),
      new_meeting_id: uuidv4(),
      new_schedule_id: new_schedule_id,
    }));

    const organizer_id = await getOrganizerId(application_id, supabase);

    const { data: insertedMeetings, error: errorInsertedMeetings } =
      await supabase
        .from('interview_meeting')
        .insert(
          refSessions.map((ses) => {
            return {
              interview_schedule_id: ses.new_schedule_id,
              status: ses.isSelected ? 'waiting' : 'not_scheduled',
              instructions: refSessions.find((s) => s.id === ses.id)
                ?.interview_module?.instructions,
              id: ses.new_meeting_id,
              organizer_id,
            } as InterviewMeetingTypeDb;
          }),
        )
        .select();

    if (errorInsertedMeetings) throw new Error(errorInsertedMeetings.message);

    const { error: errorInsertedSessions } = await supabase
      .from('interview_session')
      .insert(
        allSessions.map((session) => ({
          interview_plan_id: null,
          id: refSessions.find((ref) => ref.id === session.id).newId,
          break_duration: session.break_duration,
          interviewer_cnt: session.interviewer_cnt,
          location: session.location,
          module_id: session.module_id,
          name: session.name,
          schedule_type: session.schedule_type,
          session_duration: session.session_duration,
          session_order: session.session_order,
          session_type: session.session_type,
          meeting_id: refSessions.find((ref) => ref.id === session.id)
            .new_meeting_id,
        })) as InterviewSessionTypeDB[],
      );

    if (errorInsertedSessions) throw new Error(errorInsertedSessions.message);

    let insertableUserRelation = [];
    refSessions.map((session) => {
      session.users?.map((user) => {
        insertableUserRelation.push({
          interview_module_relation_id: user.interview_module_relation?.id,
          interviewer_type: user.interviewer_type,
          session_id: session.newId,
          training_type: user.training_type,
          user_id: user.user_id,
        } as InterviewSessionRelationTypeDB);
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

export const sendToCandidate = async ({
  is_mail,
  is_debrief = false,
  selectedApplication,
  initialSessions,
  selectedSessionIds,
  recruiter_id,
  dateRange,
  selectedSlots,
  selectedDebrief,
  recruiterUser,
  supabase,
  user_tz,
  selectedApplicationLog,
}: {
  is_mail: boolean;
  is_debrief?: boolean;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  selectedSlots?: SchedulingFlow['filteredSchedulingOptions'];
  selectedDebrief: SchedulingFlow['filteredSchedulingOptions'][number];
  recruiterUser: {
    email: string;
    first_name: string;
    last_name: string;
    user_id: string;
  };
  supabase: ReturnType<typeof createServerClient<DB>>;
  user_tz: string;
  selectedApplicationLog?: DatabaseTable['application_logs'];
}) => {
  try {
    const scheduleName = getScheduleName({
      job_title: selectedApplication.public_jobs.job_title,
      first_name: selectedApplication.candidates.first_name,
      last_name: selectedApplication.candidates.last_name,
    });
    const { data: checkSch, error: errorCheckSch } = await supabase
      .from('interview_schedule')
      .select('id')
      .eq('application_id', selectedApplication.id);

    if (errorCheckSch) throw new Error(errorCheckSch.message);

    // check if schedule is already created (if yes then sessions are cached on candidate level)
    if (checkSch.length === 0) {
      // if not then cache all the sessions on candidate level
      const createCloneRes = await createCloneSession({
        is_get_more_option: false,
        application_id: selectedApplication.id,
        allSessions: initialSessions,
        session_ids: selectedSessionIds,
        scheduleName: scheduleName,
        recruiter_id: recruiter_id,
        supabase: supabase,
        rec_user_id: recruiterUser.user_id,
      });

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            organizer_name: recruiterUser.first_name,
          },
          session_ids: createCloneRes.session_ids,
          schedule_id: createCloneRes.schedule.id,
          selected_options: selectedSlots.map((slot) => {
            return {
              ...slot,
              sessions: slot.sessions.map((ses) => ({
                ...ses,
                session_id: createCloneRes.refSessions.find(
                  (s) => s.id === ses.session_id,
                ).newId,
                meeting_id: createCloneRes.refSessions.find(
                  (s) => s.id === ses.session_id,
                ).interview_meeting.id,
              })),
            };
          }),
          created_by: recruiterUser.user_id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      if (!is_debrief) {
        addScheduleActivity({
          title: `Sent booking link to ${getFullName(selectedApplication.candidates.first_name, selectedApplication.candidates.first_name)} for ${createCloneRes.refSessions
            .filter((ses) => ses.isSelected)
            .map((ses) => ses.name)
            .join(' , ')}`,
          application_id: selectedApplication.id,
          logged_by: 'user',
          supabase,
          created_by: recruiterUser.user_id,
        });
      }

      if (!is_debrief && is_mail) {
        mailHandler({
          filter_id: filterJson[0].id,
          supabase,
          application_id: selectedApplication.id,
        });
      }
      if (is_debrief && selectedDebrief) {
        const res = await scheduleDebrief({
          selectedDebrief,
          candidate_email: selectedApplication.candidates.email,
          candidate_id: selectedApplication.candidates.id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          filter_id: filterJson[0].id,
          recruiter_id,
          schedule_id: createCloneRes.schedule.id,
          user_tz,
        });

        if (res) {
          addScheduleActivity({
            title: `Scheduling ${createCloneRes.refSessions
              .filter((ses) => ses.isSelected)
              .map((ses) => ses.name)
              .join(' , ')}`,
            application_id: selectedApplication.id,
            logged_by: 'user',

            supabase,
            created_by: recruiterUser.user_id,
          });
        } else {
          console.log('Error in scheduling debrief');
          throw new Error('Error in scheduling debrief');
        }
      }
    } else {
      const organizer_id = await getOrganizerId(
        selectedApplication.id,
        supabase,
      );
      const { error: errorUpdatedMeetings } = await supabase
        .from('interview_meeting')
        .upsert(
          initialSessions
            .filter((ses) => selectedSessionIds.includes(ses.id))
            .map((ses) => ({
              status: 'waiting',
              id: ses.interview_meeting.id,
              interview_schedule_id:
                ses.interview_meeting.interview_schedule_id,
              organizer_id,
            })) as InterviewMeetingTypeDb[],
        );

      if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            organizer_name: recruiterUser.first_name,
          },
          session_ids: selectedSessionIds,
          schedule_id: checkSch[0].id,
          selected_options: selectedSlots,
          created_by: recruiterUser.user_id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      if (!is_debrief) {
        addScheduleActivity({
          title: `Candidate invited for session ${initialSessions
            .filter((ses) => selectedSessionIds.includes(ses.id))
            .map((ses) => ses.name)
            .join(' , ')}`,
          logged_by: 'user',
          application_id: selectedApplication.id,

          supabase,
          created_by: recruiterUser.user_id,
        });
      }

      if (!is_debrief && is_mail) {
        mailHandler({
          filter_id: filterJson[0].id,
          supabase,
          application_id: selectedApplication.id,
        });
      }

      if (is_debrief && selectedDebrief) {
        const resSchDeb = await scheduleDebrief({
          selectedDebrief,
          candidate_email: selectedApplication.candidates.email,
          candidate_id: selectedApplication.candidates.id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          filter_id: filterJson[0].id,
          recruiter_id,
          schedule_id: checkSch[0].id,
          user_tz,
        });

        if (resSchDeb) {
          addScheduleActivity({
            title: `Scheduling ${initialSessions
              .filter((ses) => selectedSessionIds.includes(ses.id))
              .map((ses) => ses.name)
              .join(' , ')}`,
            logged_by: 'user',
            application_id: selectedApplication.id,

            supabase,
            created_by: recruiterUser.user_id,
          });
        } else {
          console.log('Error in scheduling debrief');
          throw new Error('Error in scheduling debrief');
        }
      }
    }

    if (selectedApplicationLog) {
      await supabase
        .from('application_logs')
        .update({
          metadata: {
            ...selectedApplicationLog.metadata,
            action: 'rescheduled',
          },
        })
        .eq('id', selectedApplicationLog.id);
      await supabase
        .from('interview_filter_json')
        .delete()
        .eq('id', selectedApplicationLog.metadata.filter_id);
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

const scheduleDebrief = async ({
  selectedDebrief,
  recruiter_id,
  user_tz,
  schedule_id,
  candidate_email,
  candidate_id,
  candidate_name,
  filter_id,
}: {
  selectedDebrief: SchedulingFlow['filteredSchedulingOptions'][number];
  recruiter_id: string;
  user_tz: string;
  schedule_id: string;
  candidate_email: string;
  candidate_id: string;
  candidate_name: string;
  filter_id: string;
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
    console.log('Booked debrief session');
    return true;
  } else {
    return false;
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
        });

        console.log(
          createCloneRes.refSessions
            .filter((ses) => ses.isSelected)
            .map((ses) => `old session_id ${ses.id} to ${ses.newId}`),
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
                  id: ses.id,
                  name: ses.name,
                  interview_meeting: ses.interview_meeting
                    ? {
                        id: ses.interview_meeting.id,
                        start_time: ses.interview_meeting.start_time,
                        end_time: ses.interview_meeting.end_time,
                        meeting_link: ses.interview_meeting.meeting_link,
                      }
                    : null,
                  session_order: ses.session_order,
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
            .map((ses) => ses.name)
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
          candidate: {
            timezone: sessionsWithPlan.application.candidates.timezone,
            city: sessionsWithPlan.application.candidates.city,
            state: sessionsWithPlan.application.candidates.state,
            id: sessionsWithPlan.application.candidates.id,
          },
          filterJsonId: filterJson.id,
          task_id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          candidate_email: sessionsWithPlan.application.candidates.email,
          rec_user_phone,
          dateRange,
          session_ids: createCloneRes.session_ids,
          recruiter_id,
        });
      } else {
        console.log('fetchInterviewDataSchedule');

        const sessionsWithPlan = await fetchInterviewDataSchedule(
          checkSch[0].id,
          application_id,
          supabase,
        );

        const selectedSessions = sessionsWithPlan.sessions.filter((ses) =>
          session_ids.includes(ses.id),
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
                id: ses.id,
                name: ses.name,
                interview_meeting: ses.interview_meeting
                  ? {
                      id: ses.interview_meeting.id,
                      start_time: ses.interview_meeting.start_time,
                      end_time: ses.interview_meeting.end_time,
                      meeting_link: ses.interview_meeting.meeting_link,
                    }
                  : null,
                session_order: ses.session_order,
                users: [],
              };
            }),
          })
          .eq('id', task_id);
        if (eroorSubTasks) throw new Error(eroorSubTasks.message);

        addScheduleActivity({
          title: `Candidate invited for ${selectedSessions
            .map((ses) => ses.name)
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
          candidate: {
            timezone: sessionsWithPlan.application.candidates.timezone,
            city: sessionsWithPlan.application.candidates.city,
            state: sessionsWithPlan.application.candidates.state,
            id: sessionsWithPlan.application.candidates.id,
          },
          filterJsonId: filterJson.id,
          task_id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          candidate_email: sessionsWithPlan.application.candidates.email,
          rec_user_phone,
          dateRange,
          session_ids,
          recruiter_id,
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
        });

        console.log(
          createCloneRes.refSessions
            .filter((ses) => ses.isSelected)
            .map((ses) => `old session_id ${ses.id} to ${ses.newId}`),
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
            .map((ses) => ses.name)
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
          candidate: {
            timezone: sessionsWithPlan.application.candidates.timezone,
            city: sessionsWithPlan.application.candidates.city,
            state: sessionsWithPlan.application.candidates.state,
            id: sessionsWithPlan.application.candidates.id,
          },
          filterJsonId: filterJson.id,
          task_id: task.id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          candidate_email: sessionsWithPlan.application.candidates.email,
          rec_user_phone,
          dateRange,
          recruiter_id,
          session_ids: createCloneRes.session_ids,
        });
      } else {
        console.log('fetchInterviewDataSchedule');

        const sessionsWithPlan = await fetchInterviewDataSchedule(
          checkSch[0].id,
          application_id,
          supabase,
        );

        const selectedSessions = sessionsWithPlan.sessions.filter((ses) =>
          session_ids.includes(ses.id),
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
            .map((ses) => ses.name)
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
          candidate: {
            timezone: sessionsWithPlan.application.candidates.timezone,
            city: sessionsWithPlan.application.candidates.city,
            state: sessionsWithPlan.application.candidates.state,
            id: sessionsWithPlan.application.candidates.id,
          },
          filterJsonId: filterJson.id,
          task_id: task.id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          candidate_email: sessionsWithPlan.application.candidates.email,
          rec_user_phone,
          dateRange,
          recruiter_id,
          session_ids,
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
  dateRange,
  recruiter_id,
  session_ids,
  candidate,
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
  dateRange: {
    start_date: string;
    end_date: string;
  };
  session_ids: string[];
  recruiter_id: string;
  candidate: {
    timezone: string;
    city: string;
    state: string;
    id: string;
  };
}) => {
  console.log({
    type,
    candidate_name,
    candidate_email,
    rec_user_phone: formatPhoneNumber(rec_user_phone),
  });

  let timezone = null;
  if (!candidate.timezone && (candidate.city || candidate.state)) {
    timezone = await getCandidateTimezone({
      location: `${candidate.city} ${candidate.state}`,
      candidate_id: candidate.id,
    });
  }

  if (
    await checkAvailibility({
      dateRange,
      recruiter_id,
      session_ids,
      task_id,
      timezone,
      type,
    })
  ) {
    if (type === 'email_agent') {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/mail-agent/init-agent`,
        {
          cand_email: candidate_email,
          filter_json_id: filterJsonId,
          interviewer_name: recruiter_user_name,
          task_id: task_id,
        } as InitAgentBodyParams,
      );

      if (res?.status === 200) {
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
  } else {
    console.log('No slots for selected date range');
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
  type: 'phone_agent' | 'email_agent';
  recruiter_user_name: string;
  candidate_name: string;
  supabase: ReturnType<typeof createServerClient<DB>>;
}) => {
  const assignee = type == 'email_agent' ? EmailAgentId : PhoneAgentId;

  const { data: task, error: errorTasks } = await supabase
    .from('new_tasks')
    .insert({
      name: `Schedule interview for ${candidate_name} - ${selectedSessions
        .map((ses) => ses.name)
        .join(' , ')}`,
      //`Schedule interview for ${)} - ${task.session_ids.map((ele) => ele.name).join(', ')}.`
      application_id,
      created_by: rec_user_id,

      status: 'in_progress',
      recruiter_id,
      due_date: dateRange.end_date,
      schedule_date_range: dateRange,
      start_date: new Date(),
      assignee: [assignee],
      filter_id: filter_id,
      session_ids: selectedSessions.map((ses) => {
        return {
          id: ses.id,
          name: ses.name,
          interview_meeting: ses.interview_meeting
            ? {
                id: ses.interview_meeting.id,
                start_time: ses.interview_meeting.start_time,
                end_time: ses.interview_meeting.end_time,
                meeting_link: ses.interview_meeting.meeting_link,
              }
            : null,
          session_order: ses.session_order,
          users: [],
        };
      }),
      trigger_count: 1,
    } as any)
    .select()
    .single();

  if (errorTasks) throw new Error(errorTasks.message);

  await createTaskProgress({
    type: 'create_task',
    data: {
      progress_type: 'standard',
      created_by: { id: rec_user_id, name: recruiter_user_name },
      task_id: task.id,
    },
    optionData: {
      candidateName: candidate_name,
      sessions: selectedSessions.map((ele) => ({
        id: ele.id,
        name: ele.name,
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
  session_id,
  candidate_name,
  session_name,
  rec_user_id,
  application_id,
  filter_id,
}: {
  session_id?: string;
  candidate_name: string;
  session_name: string;
  rec_user_id: string;
  application_id: string;
  filter_id?: string;
}) => {
  try {
    let filterId = filter_id;

    if (!filter_id) {
      const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
        .from('interview_filter_json')
        .select('*')
        .contains('session_ids', [session_id])
        .single();

      if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);
      filterId = checkFilterJson.id;
    }

    if (filterId) {
      const resMail = await mailHandler({
        filter_id: filterId,
        supabase,
        application_id,
      });

      if (resMail.sent) {
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
