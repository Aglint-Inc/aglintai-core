import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { InitAgentBodyParams } from '@/src/components/ScheduleAgent/types';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';
import {
  InterviewMeetingTypeDb,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  RecruiterUserType,
} from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../queries/utils';
import { mailHandler } from '../utils';
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
    toast.error(e.message);
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

export const agentTrigger = async ({
  type,
  // eslint-disable-next-line no-unused-vars
  sessionsWithPlan,
  filterJsonId,
  task_id,
  recruiter_user_name,
  candidate_name,
  company_name,
  jobRole,
  rec_user_email,
  rec_user_phone,
  user_tz,
}) => {
  if (type === 'email_agent') {
    await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/mail-agent/init-agent`,
      {
        cand_email: rec_user_email,
        // cand_email: sessionsWithPlan.application.candidates.email,
        cand_time_zone: dayjs.tz.guess(),
        filter_json_id: filterJsonId,
        interviewer_name: recruiter_user_name,
        organizer_time_zone: user_tz,
        task_id: task_id,
      } as InitAgentBodyParams,
    );
  } else if (type === 'phone_agent') {
    await axios.post(
      // 'https://rested-logically-lynx.ngrok-free.app/api/create-phone-call',
      'https://aglint-phone-ngrok-app.ngrok.io/api/create-phone-call',
      {
        begin_sentence_template: `Hi ${candidate_name}, this is ${recruiter_user_name} calling from ${company_name}. We wanted to schedule an interview for the position of ${jobRole}, Is this the right time to talk?`,
        interviewer_name: recruiter_user_name,
        from_phone_no: '+12512066348',
        // to_phone_no: '+919482306657',
        to_phone_no: rec_user_phone
          .replace(' ', '')
          .replace('-', '')
          .replace('(', '')
          .replace(')', ''),
        // retell_agent_id: 'dcc1869a822931ef646f28e185e7402e',
        retell_agent_id: 'd874c616f28ef76fe4eefe45af69cda7',
        filter_json_id: filterJsonId,
        cand_email: rec_user_email,
        // cand_email: sessionsWithPlan.application.candidates.email,
        task_id: task_id,
        // cand_time_zone: 'America/Los_Angeles',
        cand_time_zone: user_tz,
      },
    );
  }
};

export const createCloneSession = async ({
  is_get_more_option,
  application_id,
  allSessions,
  session_ids,
  scheduleName,
  coordinator_id,
  supabase,
  recruiter_id,
}: {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[];
  scheduleName: string;
  coordinator_id: string;
  recruiter_id: string;
  supabase: ReturnType<typeof createServerClient<Database>>;
}) => {
  let new_schedule_id = uuidv4();
  try {
    const { data, error } = await supabase
      .from('interview_schedule')
      .insert({
        is_get_more_option: is_get_more_option,
        application_id: application_id,
        schedule_name: scheduleName,
        coordinator_id: coordinator_id,
        id: new_schedule_id,
        recruiter_id: recruiter_id,
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

    const { error: errorInsertedMeetings } = await supabase
      .from('interview_meeting')
      .insert(
        refSessions.map((ses) => {
          return {
            interview_schedule_id: ses.new_schedule_id,
            status: ses.isSelected ? 'waiting' : 'not_scheduled',
            instructions: refSessions.find((s) => s.id === ses.id)
              ?.interview_module?.instructions,
            id: ses.new_meeting_id,
          } as InterviewMeetingTypeDb;
        }),
      );

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

    return {
      schedule: data[0],
      session_ids: newSessionIds,
      refSessions,
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
  selected_comb_id,
  selectedApplication,
  initialSessions,
  selectedSessionIds,
  selCoordinator,
  recruiter_id,
  dateRange,
  schedulingOptions,
  recruiterUser,
  supabase,
  user_tz,
}: {
  is_mail: boolean;
  is_debrief?: boolean;
  selected_comb_id: string;
  selectedApplication: SchedulingApplication['selectedApplication'];
  initialSessions: SchedulingApplication['initialSessions'];
  selectedSessionIds: SchedulingApplication['selectedSessionIds'];
  selCoordinator: SchedulingApplication['selCoordinator'];
  recruiter_id: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  schedulingOptions: SchedulingApplication['schedulingOptions'];
  recruiterUser: RecruiterUserType;
  supabase: ReturnType<typeof createServerClient<Database>>;
  user_tz: string;
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
        recruiter_id: recruiter_id,
        supabase: supabase,
      });

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            session_ids: createCloneRes.session_ids,
            recruiter_id: recruiter_id,
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            user_tz: user_tz,
            organizer_name: recruiterUser.first_name,
          },
          session_ids: createCloneRes.session_ids,
          schedule_id: createCloneRes.schedule.id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      addScheduleActivity({
        schedule_id: createCloneRes.schedule.id,
        title: `Candidate invited for session ${createCloneRes.refSessions
          .filter((ses) => ses.isSelected)
          .map((ses) => ses.name)
          .join(' , ')}`,
        filter_id: filterJson[0].id,
        user_id: recruiterUser.user_id,
        supabase,
      });

      if (!is_debrief && is_mail) {
        mailHandler({
          filter_id: filterJson[0].id,
          rec_id: recruiter_id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          mail: selectedApplication.candidates.email,
          position: selectedApplication.public_jobs.job_title,
          schedule_name: scheduleName,
          schedule_id: createCloneRes.schedule.id,
          supabase,
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
          recruiter_id: recruiter_id,
          user_tz: user_tz,
          candidate_email: selectedApplication.candidates.email,
          schedule_id: createCloneRes.schedule.id,
        } as ConfirmApiBodyParams;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/confirm_interview_slot`,
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
            })) as InterviewMeetingTypeDb[],
        );

      if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

      const { data: filterJson, error: errorFilterJson } = await supabase
        .from('interview_filter_json')
        .insert({
          filter_json: {
            session_ids: selectedSessionIds,
            recruiter_id: recruiter_id,
            start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
            end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
            user_tz: user_tz,
            organizer_name: recruiterUser.first_name,
          },
          session_ids: selectedSessionIds,
          schedule_id: checkSch[0].id,
        })
        .select();

      if (errorFilterJson) throw new Error(errorFilterJson.message);

      addScheduleActivity({
        schedule_id: checkSch[0].id,
        title: `Candidate invited for session ${initialSessions
          .filter((ses) => selectedSessionIds.includes(ses.id))
          .map((ses) => ses.name)
          .join(' , ')}`,
        filter_id: filterJson[0].id,
        user_id: recruiterUser.user_id,
        supabase,
      });

      if (!is_debrief && is_mail) {
        mailHandler({
          filter_id: filterJson[0].id,
          rec_id: recruiter_id,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          mail: selectedApplication.candidates.email,
          position: selectedApplication.public_jobs.job_title,
          schedule_name: scheduleName,
          schedule_id: checkSch[0].id,
          supabase,
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
          recruiter_id: recruiter_id,
          user_tz: user_tz,
          candidate_email: selectedApplication.candidates.email,
          schedule_id: checkSch[0].id,
        } as ConfirmApiBodyParams;
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/confirm_interview_slot`,
          bodyParams,
        );
        if (res.status === 200) {
          toast.success('Slot confirmed successfully');
        }
      }
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};
