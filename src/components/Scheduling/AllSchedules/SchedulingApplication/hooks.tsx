import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
dayjs.extend(utc);
dayjs.extend(timezone);

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { BodyParams } from '@/src/pages/api/scheduling/v1/find_availability';
import {
  InterviewMeetingTypeDb,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
} from '@/src/types/data.types';
import { PlanCombinationRespType } from '@/src/utils/scheduling_v1/types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { MemberType } from '../../Modules/types';
import { mailHandler } from '../utils';
import {
  setFetchingPlan,
  setFetchingSchedule,
  setinitialSessions,
  setIsScheduleNowOpen,
  setMembers,
  setNoOptions,
  setScheduleName,
  setSchedulingOptions,
  setSelCoordinator,
  setSelectedApplication,
  setSelectedSchedule,
  setSelectedSessionIds,
  setStep,
  setTotalSlots,
  useSchedulingApplicationStore,
} from './store';
import { getApplicationSchedule, SelectedApplicationTypeDB } from './types';

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
  const { recruiter } = useAuthDetails();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const dateRange = useSchedulingApplicationStore((state) => state.dateRange);
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName,
  );
  const selCoordinator = useSchedulingApplicationStore(
    (state) => state.selCoordinator,
  );
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const sendToCandidate = async ({
    session_ids,
    is_get_more_option,
  }: {
    session_ids: string[];
    is_get_more_option: boolean;
  }) => {
    try {
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', selectedApplication.id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const { data, error } = await supabase
          .from('interview_schedule')
          .insert({
            is_get_more_option: is_get_more_option,
            application_id: selectedApplication.id,
            schedule_name: scheduleName,
            coordinator_id: selCoordinator,
          })
          .select();

        if (error) throw new Error(error.message);

        const refSessions = initialSessions.map((session) => ({
          ...session,
          newId: uuidv4(),
          isSelected: session_ids.includes(session.id),
        }));

        const { error: errorInsertedSessions } = await supabase
          .from('interview_session')
          .insert(
            initialSessions.map((session) => ({
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

        if (errorInsertedSessions)
          throw new Error(errorInsertedSessions.message);

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
          instructions: refSessions.find((s) => s.id === session.id)
            ?.interview_module?.instructions,
          interview_schedule_id: data[0].id,
        })) as InterviewMeetingTypeDb[];

        const { data: insertedMeetings, error: errorInsertedMeetings } =
          await supabase
            .from('interview_meeting')
            .insert(insertableMeetings)
            .select();

        if (errorInsertedMeetings)
          throw new Error(errorInsertedMeetings.message);

        setinitialSessions(
          initialSessions.map((session) => ({
            ...session,
            interview_meeting: insertedMeetings.find(
              (meet) =>
                refSessions.find((s) => s.id === session.id).newId ===
                meet.session_id,
            ),
          })),
        );

        const newSessionIds = refSessions
          .filter((ses) => ses.isSelected)
          .map((session) => session.newId);

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: newSessionIds,
              recruiter_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: newSessionIds,
            schedule_id: data[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);

        mailHandler({
          filter_id: filterJson[0].id,
          rec_id: recruiter.id,
          candidate_name: selectedApplication.candidates.first_name,
          mail: selectedApplication.candidates.email,
          position: selectedApplication.public_jobs.job_title,
          schedule_name: scheduleName,
          schedule_id: data[0].id,
        });
        setSelectedSessionIds([]);
      } else {
        const { data: updatedMeetings, error: errorUpdatedMeetings } =
          await supabase
            .from('interview_meeting')
            .upsert(
              session_ids.map((session_id) => ({
                status: 'waiting',
                id: session_id,
              })) as InterviewMeetingTypeDb[],
            )
            .select();

        if (errorUpdatedMeetings) throw new Error(errorUpdatedMeetings.message);

        setinitialSessions(
          initialSessions.map((session) => ({
            ...session,
            interview_meeting: updatedMeetings.find(
              (meet) => meet.id === session.id,
            ),
          })),
        );

        const { data: filterJson, error: errorFilterJson } = await supabase
          .from('interview_filter_json')
          .insert({
            filter_json: {
              session_ids: session_ids,
              recruiter_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            },
            session_ids: session_ids,
            schedule_id: checkSch[0].id,
          })
          .select();

        if (errorFilterJson) throw new Error(errorFilterJson.message);
        mailHandler({
          filter_id: filterJson[0].id,
          rec_id: recruiter.id,
          candidate_name: selectedApplication.candidates.first_name,
          mail: selectedApplication.candidates.email,
          position: selectedApplication.public_jobs.job_title,
          schedule_name: scheduleName,
          schedule_id: checkSch[0].id,
        });
        setSelectedSessionIds([]);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsScheduleNowOpen(false);
    }
  };

  return { sendToCandidate };
};

export const useGetScheduleApplication = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const fetchInterviewDataByApplication = async () => {
    try {
      setFetchingSchedule(true);

      const { data: schedule, error } = await supabase
        .from('interview_schedule')
        .select('*')
        .eq('application_id', router.query.application_id);

      if (!error) {
        setSelectedSchedule(schedule[0]);

        const resMem = (await axios.post('/api/scheduling/fetchUserDetails', {
          recruiter_id: recruiter.id,
        })) as { data: MemberType[] };

        if (resMem?.data?.length > 0) {
          setMembers(resMem.data);
        }

        const res = await getApplicationSchedule({
          application_id: router.query.application_id as string,
        });

        const typedApplication = res as SelectedApplicationTypeDB;

        setSelectedApplication(typedApplication);

        if (schedule.length == 0) {
          const sessionsWithPlan = await fetchInterviewDataJob(
            typedApplication.public_jobs.id,
          );
          setinitialSessions(
            sessionsWithPlan.sessions.sort(
              (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
            ),
          );
          setScheduleName(
            `Interview for ${typedApplication?.public_jobs?.job_title} - ${typedApplication?.candidates?.first_name}`,
          );
          if (sessionsWithPlan?.interviewPlan?.coordinator_id) {
            setSelCoordinator(sessionsWithPlan?.interviewPlan?.coordinator_id);
          } else {
            const adminUserId = resMem.data.filter(
              (member) => member.role === 'admin',
            )[0]?.user_id;
            adminUserId && setSelCoordinator(adminUserId);
          }
        } else {
          const sessionsWithPlan = await fetchInterviewDataSchedule(
            schedule[0].id,
          );
          setinitialSessions(
            sessionsWithPlan.sort(
              (itemA, itemB) => itemA['session_order'] - itemB['session_order'],
            ),
          );
          setScheduleName(schedule[0].schedule_name);
          if (schedule[0].coordinator_id) {
            setSelCoordinator(schedule[0].coordinator_id);
          } else {
            const adminUserId = resMem.data.filter(
              (member) => member.role === 'admin',
            )[0]?.user_id;
            adminUserId && setSelCoordinator(adminUserId);
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

export const fetchInterviewDataJob = async (job_id: string) => {
  try {
    const { data: interviewPlan, error: interviewPlanError } = await supabase
      .from('interview_plan')
      .select('*')
      .eq('job_id', job_id);

    if (interviewPlanError) throw new Error(interviewPlanError.message);

    const { data: interviewSession, error: interviewSessionError } =
      await supabase
        .from('interview_session')
        .select('*,interview_module(*)')
        .eq('interview_plan_id', interviewPlan[0].id);

    if (interviewSessionError) throw new Error(interviewSessionError.message);

    const {
      data: interviewSessionRelations,
      error: interviewSessionRelationsError,
    } = await supabase
      .from('interview_session_relation')
      .select(
        '*,interview_module_relation(*,recruiter_user(user_id,first_name,last_name,email,profile_image,position)),recruiter_user(user_id,first_name,last_name,email,profile_image,position)',
      )
      .in(
        'session_id',
        interviewSession.map((session) => session.id),
      );

    if (interviewSessionRelationsError)
      throw new Error(interviewSessionRelationsError.message);

    const sessions = interviewSession.map((session) => ({
      ...session,
      interview_meeting: null as InterviewMeetingTypeDb,
      users: interviewSessionRelations.filter(
        (relation) => relation.session_id === session.id,
      ),
    }));

    return {
      sessions,
      interviewPlan: interviewPlan[0],
    };
  } catch (e) {
    toast.error(e.message);
  }
};

export const fetchInterviewDataSchedule = async (schedule_id: string) => {
  try {
    const { data: interviewMeetings, error: interviewSessionError } =
      await supabase
        .from('interview_meeting')
        .select('*,interview_session(*,interview_module(*))')
        .eq('interview_schedule_id', schedule_id);

    if (interviewSessionError) throw new Error(interviewSessionError.message);

    const {
      data: interviewSessionRelations,
      error: interviewSessionRelationsError,
    } = await supabase
      .from('interview_session_relation')
      .select(
        '*,interview_module_relation(*,recruiter_user(user_id,first_name,last_name,email,profile_image,position)),recruiter_user(user_id,first_name,last_name,email,profile_image,position)',
      )
      .in(
        'session_id',
        interviewMeetings.map((meet) => meet.interview_session.id),
      );

    if (interviewSessionRelationsError)
      throw new Error(interviewSessionRelationsError.message);

    const sessions = interviewMeetings.map((meet) => ({
      ...meet.interview_session,
      interview_meeting: {
        end_time: meet.end_time,
        id: meet.id,
        instructions: meet.instructions,
        session_id: meet.session_id,
        start_time: meet.start_time,
        status: meet.status,
        interview_schedule_id: meet.interview_schedule_id,
        meeting_json: meet.meeting_json,
        meeting_link: meet.meeting_link,
        created_at: meet.created_at,
      } as InterviewMeetingTypeDb,
      users: interviewSessionRelations.filter(
        (relation) => relation.session_id === meet.interview_session.id,
      ),
    }));

    return sessions;
  } catch (e) {
    toast.error(e.message);
  }
};
