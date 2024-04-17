import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
dayjs.extend(utc);
dayjs.extend(timezone);

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';
import {
  InterviewMeetingTypeDb,
  InterviewPlanTypeDB,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
} from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { mailHandler } from '../utils';
import {
  SchedulingApplication,
  setFetchingSchedule,
  setinitialSessions,
  setScheduleName,
  setSelCoordinator,
  setSelectedApplication,
  setSelectedSchedule,
  useSchedulingApplicationStore,
} from './store';
import {
  ApplicationDataResponseType,
  InterviewDataResponseType,
} from './types';

export const useSendInviteForCandidate = () => {
  const { recruiter } = useAuthDetails();
  const {
    selCoordinator,
    dateRange,
    selectedApplication,
    initialSessions,
    selectedSessionIds,
    schedulingOptions,
  } = useSchedulingApplicationStore((state) => ({
    selCoordinator: state.selCoordinator,
    dateRange: state.dateRange,
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    schedulingOptions: state.schedulingOptions,
  }));

  const sendToCandidate = async ({
    is_mail,
    is_debrief = false,
    selected_comb_id,
  }: {
    is_mail: boolean;
    is_debrief?: boolean;
    selected_comb_id: string;
  }) => {
    try {
      const scheduleName = `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`;
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', selectedApplication.id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const createCloneRes = await createCloneSession({
          is_get_more_option: false,
          application_id: selectedApplication.id,
          allSessions: initialSessions,
          session_ids: selectedSessionIds,
          scheduleName: scheduleName,
          coordinator_id: selCoordinator,
        });

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: createCloneRes.session_ids,
              recruiter_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: createCloneRes.session_ids,
            schedule_id: createCloneRes.schedule.id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        if (!is_debrief && is_mail) {
          mailHandler({
            filter_id: filterJson[0].id,
            rec_id: recruiter.id,
            candidate_name: getFullName(
              selectedApplication.candidates.first_name,
              selectedApplication.candidates.last_name,
            ),
            mail: selectedApplication.candidates.email,
            position: selectedApplication.public_jobs.job_title,
            schedule_name: scheduleName,
            schedule_id: createCloneRes.schedule.id,
          });
        }

        if (is_debrief && selected_comb_id) {
          const selectedSchedule = schedulingOptions.filter(
            (ses) => ses.plan_comb_id === selected_comb_id,
          );
          const bodyParams = {
            candidate_plan: [
              {
                sessions: selectedSchedule[0].sessions.map((ses) => {
                  return {
                    session_id: createCloneRes.refSessions.find(
                      (sesRef) => sesRef.id === ses.session_id,
                    ).newId,
                    start_time: ses.start_time,
                    end_time: ses.end_time,
                  };
                }),
              },
            ],
            recruiter_id: recruiter.id,
            user_tz: dayjs.tz.guess(),
            candidate_email: selectedApplication.candidates.email,
            schedule_id: createCloneRes.schedule.id,
          } as ConfirmApiBodyParams;
          const res = await axios.post(
            '/api/scheduling/v1/confirm_interview_slot',
            bodyParams,
          );
          if (res.status === 200) {
            toast.success('Slot confirmed successfully');
          }
        }
      } else {
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
                session_id: ses.interview_meeting.session_id,
              })) as InterviewMeetingTypeDb[],
          );

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: selectedSessionIds,
              recruiter_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: selectedSessionIds,
            schedule_id: checkSch[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        if (!is_debrief && is_mail) {
          mailHandler({
            filter_id: filterJson[0].id,
            rec_id: recruiter.id,
            candidate_name: getFullName(
              selectedApplication.candidates.first_name,
              selectedApplication.candidates.last_name,
            ),
            mail: selectedApplication.candidates.email,
            position: selectedApplication.public_jobs.job_title,
            schedule_name: scheduleName,
            schedule_id: checkSch[0].id,
          });
        }

        if (is_debrief && selected_comb_id) {
          const selectedSchedule = schedulingOptions.filter(
            (ses) => ses.plan_comb_id === selected_comb_id,
          );
          const bodyParams = {
            candidate_plan: [
              {
                sessions: selectedSchedule[0].sessions.map((ses) => {
                  return {
                    session_id: ses.session_id,
                    start_time: ses.start_time,
                    end_time: ses.end_time,
                  };
                }),
              },
            ],
            recruiter_id: recruiter.id,
            user_tz: dayjs.tz.guess(),
            candidate_email: selectedApplication.candidates.email,
            schedule_id: checkSch[0].id,
          } as ConfirmApiBodyParams;
          const res = await axios.post(
            '/api/scheduling/v1/confirm_interview_slot',
            bodyParams,
          );
          if (res.status === 200) {
            toast.success('Slot confirmed successfully');
          }
        }
      }
      return true;
    } catch (e) {
      toast.error(e.message);
    }
  };

  return { sendToCandidate };
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

    const sessions =
      data.interview_data?.map((item) => ({
        ...item.interview_session,
        interview_meeting: null as InterviewMeetingTypeDb,
        interview_module: item.interview_module,
        users: item.interview_session_relations?.interview_module_relation?.map(
          (sesitem) => ({
            ...sesitem.interview_session_relation,
            interview_module_relation: {
              ...sesitem.interview_module_relation,
              recruiter_user: sesitem.recruiter_user,
            },
            recruiter_user: sesitem.debrief_user,
          }),
        ),
      })) || [];

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

    const sessions = data.interview_data?.map((item) => ({
      ...item.interview_session,
      interview_meeting: item.interview_meeting,
      interview_module: item.interview_module,
      users:
        item.interview_session_relations?.interview_module_relation?.map(
          (sesitem) => ({
            ...sesitem.interview_session_relation,
            interview_module_relation: {
              ...sesitem.interview_module_relation,
              recruiter_user: sesitem.recruiter_user,
            },
            recruiter_user: sesitem.debrief_user,
          }),
        ) || [],
    }));

    return {
      sessions: sessions,
      application: {
        ...data.application_data?.application,
        candidate_files: data.application_data?.candidate_files,
        candidates: data.application_data?.candidate,
        public_jobs: data.application_data?.public_jobs,
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
          .eq('interview_plan.job_id', job_id)
          .neq('session_type', 'debrief');

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
          .neq('interview_session.session_type', 'debrief')
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

export const scheduleWithAgent = async ({
  type,
  session_ids,
  application_id,
  dateRange,
  recruiter_id,
  sub_task_id,
  recruiter_user_name,
  candidate_name = 'chinmai',
  company_name = 'aglint',
  rec_user_email,
  rec_user_phone,
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
  candidate_name?: string;
  company_name?: string;
  rec_user_email: string;
  rec_user_phone: string;
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

        if (sub_task_id) {
          const { error: eroorSubTasks } = await supabase
            .from('sub_tasks')
            .update({
              session_ids: createCloneRes.session_ids,
            })
            .eq('id', sub_task_id);
          if (eroorSubTasks) throw new Error(eroorSubTasks.message);
        }

        agentTrigger({
          type,
          sessionsWithPlan,
          filterJsonId: filterJson[0].id,
          sub_task_id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          rec_user_email,
          rec_user_phone,
        });
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

        agentTrigger({
          type,
          sessionsWithPlan,
          filterJsonId: filterJson[0].id,
          sub_task_id,
          recruiter_user_name,
          candidate_name,
          company_name,
          jobRole: sessionsWithPlan.application.public_jobs.job_title,
          rec_user_email,
          rec_user_phone,
        });
      }
      return true;
    }
  } catch (e) {
    toast.error(e.message);
  }
};

const agentTrigger = async ({
  type,
  // eslint-disable-next-line no-unused-vars
  sessionsWithPlan,
  filterJsonId,
  sub_task_id,
  recruiter_user_name,
  candidate_name,
  company_name,
  jobRole,
  rec_user_email,
  rec_user_phone,
}) => {
  try {
    if (type === 'email_agent') {
      await axios.post('/api/scheduling/mail-agent/init-agent', {
        cand_email: rec_user_email,
        // cand_email: sessionsWithPlan.application.candidates.email,
        cand_time_zone: dayjs.tz.guess(),
        filter_json_id: filterJsonId,
        interviewer_name: recruiter_user_name,
        organizer_time_zone: dayjs.tz.guess(),
        sub_task_id: sub_task_id,
      } as InitAgentBodyParams);
    } else if (type === 'phone_agent') {
      await axios.post(
        // 'https://rested-logically-lynx.ngrok-free.app/api/create-phone-call',
        'https://aglint-phone-ngrok-app.ngrok.io/api/create-phone-call',
        {
          begin_sentence_template: `Hi ${candidate_name}, this is ${recruiter_user_name} calling from ${company_name}. We wanted to schedule an interview for the position of ${jobRole}, Is this the right time to talk?`,
          interviewer_name: recruiter_user_name,
          from_phone_no: '+12512066348',
          // to_phone_no: '+919482306657',
          to_phone_no: rec_user_phone.replace(' ', '').replace('-', ''),
          // retell_agent_id: 'dcc1869a822931ef646f28e185e7402e',
          retell_agent_id: 'd874c616f28ef76fe4eefe45af69cda7',
          filter_json_id: filterJsonId,
          cand_email: rec_user_email,
          // cand_email: sessionsWithPlan.application.candidates.email,
          sub_task_id: sub_task_id,
          // cand_time_zone: 'America/Los_Angeles',
          cand_time_zone: dayjs.tz.guess(),
        },
      );
    }
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewMeetingProgresstask = async ({
  session_ids,
}: {
  session_ids: string[];
}) => {
  try {
    const { data: intSes, error: errSes } = await supabase
      .from('interview_session')
      .select('*')
      .in('id', session_ids);

    if (errSes) throw new Error(errSes.message);

    const { data: intSesRel, error: errSesRel } = await supabase
      .from('interview_session_relation')
      .select('*,interview_module_relation(*,recruiter_user(*))')
      .in('session_id', session_ids);

    if (errSesRel) throw new Error(errSesRel.message);

    const { data: intMeet, error: errMeet } = await supabase
      .from('interview_meeting')
      .select('*')
      .in('session_id', session_ids);

    if (errMeet) throw new Error(errMeet.message);

    const resMeetings = intSes.map((session) => ({
      interview_session: session,
      interview_meeting: intMeet.filter(
        (meeting) => meeting.session_id === session.id,
      )[0],
      interview_session_relation: intSesRel.filter(
        (rel) => rel.session_id === session.id,
      ),
    }));

    return resMeetings;
  } catch (e) {
    toast.error(e.message);
  }
};

export const updateProgress = async ({
  interview_session_relation_ids,
}: {
  interview_session_relation_ids: string[]; // interview_module_relation_id
}) => {
  const { data: intSesRel, error: errSelRel } = await supabase
    .from('interview_session_relation')
    .select(
      '*,interview_session!inner(*,interview_plan(*),interview_module(*))',
    )
    .in('id', interview_session_relation_ids)
    .eq('is_confirmed', true);

  if (errSelRel) throw new Error(errSelRel.message);

  const filteredIntSesRel = intSesRel.filter(
    (ses) => !ses.interview_session?.interview_plan?.id,
  );

  const uniqueSessionIds = [
    ...new Set(
      filteredIntSesRel.map((sesrel) => sesrel.interview_module_relation_id),
    ),
  ];

  const { data, error } = await supabase
    .from('interview_meeting')
    .select('*,interview_session!inner(*)')
    .in('interview_session.id', uniqueSessionIds);
  // .eq('status', 'completed');

  const resRel = filteredIntSesRel
    .map((sesRel) => ({
      ...sesRel,
      interview_meeting: data.find(
        (meet) => meet.interview_session.id === sesRel.interview_session.id,
      ),
    }))
    .filter((sesRel) => sesRel?.interview_meeting?.id);

  if (error) throw new Error(error.message);
  return resRel;
};
