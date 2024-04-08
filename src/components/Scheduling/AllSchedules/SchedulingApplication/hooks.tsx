import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
dayjs.extend(utc);
dayjs.extend(timezone);

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { BodyParams } from '@/src/pages/api/scheduling/v1/find_availability';
import {
  InterviewMeetingTypeDb,
  InterviewPlanTypeDB,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
} from '@/src/types/data.types';
import { PlanCombinationRespType } from '@/src/utils/scheduling_v1/types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { mailHandler } from '../utils';
import {
  SchedulingApplication,
  setFetchingPlan,
  setFetchingSchedule,
  setinitialSessions,
  setNoOptions,
  setScheduleName,
  setSchedulingOptions,
  setSelCoordinator,
  setSelectedApplication,
  setSelectedSchedule,
  setStep,
  setTotalSlots,
} from './store';
import {
  ApplicationDataResponseType,
  InterviewDataResponseType,
} from './types';

export const useGetScheduleOptions = () => {
  const findScheduleOptions = async ({
    session_ids,
    rec_id,
    dateRange,
  }: {
    session_ids: string[];
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
  }) => {
    try {
      setNoOptions(false);
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v1/find_availability', {
        session_ids: session_ids,
        recruiter_id: rec_id,
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        user_tz: dayjs.tz.guess(),
      } as BodyParams);

      if (res.status === 200) {
        const respTyped = res.data as {
          plan_combs: PlanCombinationRespType[];
          total: number;
        };
        if (respTyped.plan_combs.length === 0) {
          setNoOptions(true);
          setStep(1);
        } else {
          setTotalSlots(respTyped.total);
          setSchedulingOptions(respTyped.plan_combs);
          setStep(2);
        }
      } else {
        setStep(1);
        toast.error('Error fetching schedule options');
      }
    } catch (e) {
      toast.error(e.message);
      setStep(1);
      //
    } finally {
      setFetchingPlan(false);
    }
  };

  return { findScheduleOptions };
};

export const useSendInviteForCandidate = () => {
  const sendToCandidate = async ({
    session_ids,
    is_get_more_option,
    application_id,
    allSessions,
    coordinator_id,
    job_title,
    candidate_name,
    dateRange,
    recruiter_id,
    candidate_email,
    is_mail,
  }: {
    session_ids: string[];
    is_get_more_option: boolean;
    application_id: string;
    allSessions: SchedulingApplication['initialSessions'];
    coordinator_id: string;
    job_title: string;
    candidate_name: string;
    dateRange?: {
      start_date: string;
      end_date: string;
    };
    recruiter_id: string;
    candidate_email: string;
    is_mail: boolean;
  }) => {
    try {
      const scheduleName = `Interview for ${job_title} - ${candidate_name}`;
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', application_id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const createCloneRes = await createCloneSession({
          is_get_more_option,
          application_id,
          allSessions,
          session_ids,
          scheduleName,
          coordinator_id,
        });

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: createCloneRes.session_ids,
              recruiter_id: recruiter_id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: createCloneRes.session_ids,
            schedule_id: createCloneRes.schedule.id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        is_mail &&
          mailHandler({
            filter_id: filterJson[0].id,
            rec_id: recruiter_id,
            candidate_name: candidate_name,
            mail: candidate_email,
            position: job_title,
            schedule_name: scheduleName,
            schedule_id: createCloneRes.schedule.id,
          });
      } else {
        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert(
            allSessions
              .filter((ses) => session_ids.includes(ses.id))
              .map((ses) => ({
                status: 'waiting',
                id: ses.interview_meeting.id,
                interview_schedule_id:
                  ses.interview_meeting.interview_schedule_id,
                session_id: ses.interview_meeting.session_id,
              })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: session_ids,
              recruiter_id: recruiter_id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: session_ids,
            schedule_id: checkSch[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        is_mail &&
          mailHandler({
            filter_id: filterJson[0].id,
            rec_id: recruiter_id,
            candidate_name: candidate_name,
            mail: candidate_email,
            position: job_title,
            schedule_name: scheduleName,
            schedule_id: checkSch[0].id,
          });
      }
      return true;
    } catch (e) {
      toast.error(e.message);
    }
  };

  return { sendToCandidate };
};

export const scheduleWithAgent = async ({
  type,
  session_ids,
  application_id,
  dateRange,
  recruiter_id,
  sub_task_id,
  recruiter_user_name,
}: {
  type: 'phone_agent' | 'email_agent';
  session_ids: string[];
  application_id: string;
  dateRange: {
    start_date: string | null;
    end_date: string | null;
  };
  recruiter_id: string;
  sub_task_id: string;
  recruiter_user_name: string;
}) => {
  try {
    if (type) {
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', application_id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const sessionsWithPlan = await fetchInterviewDataJob(application_id);

        const scheduleName = `Interview for ${sessionsWithPlan.application.public_jobs.job_title} - ${sessionsWithPlan.application.candidates.first_name}`;

        const createCloneRes = await createCloneSession({
          is_get_more_option: false,
          application_id,
          allSessions: sessionsWithPlan.sessions,
          session_ids,
          scheduleName,
          coordinator_id: sessionsWithPlan.interviewPlan.coordinator_id,
        });

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: createCloneRes.session_ids,
              recruiter_id: recruiter_id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: createCloneRes.session_ids,
            schedule_id: createCloneRes.schedule.id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        const { error: eroorSubTasks } = await supabase
          .from('sub_tasks')
          .update({
            session_ids: createCloneRes.session_ids,
          })
          .eq('id', sub_task_id);

        if (eroorSubTasks) throw new Error(eroorSubTasks.message);

        await axios.post('/api/scheduling/mail-agent/init-agent', {
          cand_email: sessionsWithPlan.application.candidates.email,
          cand_time_zone: dayjs.tz.guess(),
          filter_json_id: filterJson[0].id,
          interviewer_name: recruiter_user_name,
          organizer_time_zone: dayjs.tz.guess(),
          sub_task_id: sub_task_id,
        } as InitAgentBodyParams);
      } else {
        const sessionsWithPlan = await fetchInterviewDataSchedule(
          checkSch[0].id,
          application_id,
        );

        const { error: errorUpdatedMeetings } = await supabase
          .from('interview_meeting')
          .upsert(
            sessionsWithPlan.sessions
              .filter((ses) => session_ids.includes(ses.id))
              .map((ses) => ({
                status: 'waiting',
                id: ses.interview_meeting.id,
                interview_schedule_id:
                  ses.interview_meeting.interview_schedule_id,
                session_id: ses.interview_meeting.session_id,
              })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: session_ids,
              recruiter_id: recruiter_id,
              start_date:
                dateRange.start_date &&
                dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date:
                dateRange.end_date &&
                dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: session_ids,
            schedule_id: checkSch[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        await axios.post('/api/scheduling/mail-agent/init-agent', {
          cand_email: sessionsWithPlan.application.candidates.email,
          cand_time_zone: dayjs.tz.guess(),
          filter_json_id: filterJson[0].id,
          interviewer_name: recruiter_user_name,
          organizer_time_zone: dayjs.tz.guess(),
          sub_task_id: sub_task_id,
        } as InitAgentBodyParams);
      }
      return true;
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const createCloneSession = async ({
  is_get_more_option,
  application_id,
  allSessions,
  session_ids,
  scheduleName,
  coordinator_id,
}: {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  coordinator_id: string;
}) => {
  const { data, error } = await supabase
    .from('interview_schedule')
    .insert({
      is_get_more_option: is_get_more_option,
      application_id: application_id,
      schedule_name: scheduleName,
      coordinator_id: coordinator_id,
    })
    .select();

  if (error) throw new Error(error.message);

  const refSessions = allSessions.map((session) => ({
    ...session,
    newId: uuidv4(),
    isSelected: session_ids.includes(session.id),
  }));

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
      })) as InterviewSessionTypeDB[],
    );

  if (errorInsertedSessions) throw new Error(errorInsertedSessions.message);

  let insertableUserRelation = [];
  refSessions.map((session) => {
    session.users.map((user) => {
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

  const insertableMeetings = refSessions.map((session) => ({
    status: session.isSelected ? 'waiting' : 'not_scheduled',
    session_id: session.newId,
    instructions: refSessions.find((s) => s.id === session.id)?.interview_module
      ?.instructions,
    interview_schedule_id: data[0].id,
  })) as InterviewMeetingTypeDb[];

  const { error: errorInsertedMeetings } = await supabase
    .from('interview_meeting')
    .insert(insertableMeetings);

  if (errorInsertedMeetings) throw new Error(errorInsertedMeetings.message);

  const newSessionIds = refSessions
    .filter((ses) => ses.isSelected)
    .map((session) => session.newId);

  return {
    schedule: data[0],
    session_ids: newSessionIds,
    refSessions,
  };
};

export const useGetScheduleApplication = () => {
  const router = useRouter();
  const fetchInterviewDataByApplication = async () => {
    try {
      const { data: schedule, error } = await supabase
        .from('interview_schedule')
        .select('*')
        .eq('application_id', router.query.application_id);

      if (!error) {
        setSelectedSchedule(schedule[0]);

        if (schedule.length == 0) {
          const sessionsWithPlan = await fetchInterviewDataJob(
            router.query.application_id as string,
          );
          setSelectedApplication(sessionsWithPlan.application);
          setScheduleName(
            `Interview for ${sessionsWithPlan.application?.public_jobs?.job_title} - ${sessionsWithPlan.application?.candidates?.first_name}`,
          );
          if (sessionsWithPlan.sessions.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );

            if (sessionsWithPlan?.interviewPlan?.coordinator_id) {
              setSelCoordinator(
                sessionsWithPlan?.interviewPlan?.coordinator_id,
              );
            }
          }
        } else {
          const sessionsWithPlan = await fetchInterviewDataSchedule(
            schedule[0].id,
            router.query.application_id as string,
          );
          setSelectedApplication(sessionsWithPlan.application);

          if (sessionsWithPlan.sessions.length > 0) {
            setinitialSessions(
              sessionsWithPlan.sessions.sort(
                (itemA, itemB) =>
                  itemA['session_order'] - itemB['session_order'],
              ),
            );

            setScheduleName(schedule[0].schedule_name);
            if (schedule[0].coordinator_id) {
              setSelCoordinator(schedule[0].coordinator_id);
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setFetchingSchedule(false);
    }
  };
  return { fetchInterviewDataByApplication };
};

export const fetchInterviewDataJob = async (application_id: string) => {
  try {
    const { data, error } = (await supabase.rpc('get_interview_data_job', {
      application_id_param: application_id,
    })) as {
      data: {
        interview_data: InterviewDataResponseType[];
        interview_plan_data: InterviewPlanTypeDB;
        application_data: ApplicationDataResponseType;
      };
      error: any;
    };

    if (error) throw new Error(error.message);

    const sessions = data.interview_data.map((item) => ({
      ...item.interview_session,
      interview_meeting: null as InterviewMeetingTypeDb,
      interview_module: item.interview_module,
      users: item.interview_session_relations.interview_module_relation.map(
        (sesitem) => ({
          ...sesitem.interview_session_relation,
          interview_module_relation: {
            ...sesitem.interview_module_relation,
            recruiter_user: sesitem.recruiter_user,
          },
          recruiter_user: sesitem.debrief_user,
        }),
      ),
    }));

    return {
      sessions: sessions,
      interviewPlan: data.interview_plan_data,
      application: {
        ...data.application_data.application,
        candidate_files: data.application_data.candidate_files,
        candidates: data.application_data.candidate,
        public_jobs: data.application_data.public_jobs,
      } as SchedulingApplication['selectedApplication'],
    };
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewDataSchedule = async (
  schedule_id: string,
  application_id: string,
) => {
  try {
    const { data, error } = (await supabase.rpc('get_interview_data_schedule', {
      schedule_id_param: schedule_id,
      application_id_param: application_id,
    })) as {
      data: {
        interview_data: InterviewDataResponseType[];
        application_data: ApplicationDataResponseType;
      };
      error: any;
    };

    if (error) throw new Error(error.message);

    const sessions = data.interview_data.map((item) => ({
      ...item.interview_session,
      interview_meeting: item.interview_meeting,
      interview_module: item.interview_module,
      users: item.interview_session_relations.interview_module_relation.map(
        (sesitem) => ({
          ...sesitem.interview_session_relation,
          interview_module_relation: {
            ...sesitem.interview_module_relation,
            recruiter_user: sesitem.recruiter_user,
          },
          recruiter_user: sesitem.debrief_user,
        }),
      ),
    }));

    return {
      sessions: sessions,
      application: {
        ...data.application_data.application,
        candidate_files: data.application_data.candidate_files,
        candidates: data.application_data.candidate,
        public_jobs: data.application_data.public_jobs,
      } as SchedulingApplication['selectedApplication'],
    };
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewSessionTask = async ({
  job_id,
  application_id,
}: {
  job_id: string;
  application_id: string;
}) => {
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
          .select('*,interview_module(*),interview_plan!inner(*)')
          .eq('interview_plan.job_id', job_id);

      if (interviewSessionError) throw new Error(interviewSessionError.message);
      const sessions = interviewSession.map(
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
      const { data: interviewMeetings, error: interviewSessionError } =
        await supabase
          .from('interview_meeting')
          .select('*,interview_session!inner(*)')
          .eq('interview_schedule_id', schedule[0].id)
          .or('status.eq.not_scheduled,status.eq.cancelled');

      if (interviewSessionError) throw new Error(interviewSessionError.message);

      const sessions = interviewMeetings.map((meet) => meet.interview_session);

      return sessions.sort(
        (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
      ) as InterviewSessionTypeDB[];
    }
  } catch (e) {
    toast.error(e.message);
  }
};
