import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { BodyParams } from '@/src/pages/api/scheduling/v2/find_availability';
import { InterviewMeetingTypeDb } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { MemberType } from '../../Modules/types';
import { ApplicationList } from '../store';
import { mailHandler } from '../utils';
import {
  setDateRange,
  setFetchingPlan,
  setFetchingSchedule,
  setInitialPlan,
  setInitialPlans,
  setinitialSessions,
  setInterviewModules,
  setIsSendToCandidateOpen,
  setMembers,
  setNoOptions,
  setScheduleName,
  setSchedulingOptions,
  setSelCoordinator,
  setSelectedApplication,
  setSelectedSchedule,
  setStep,
  useSchedulingApplicationStore,
} from './store';
import { getApplicationSchedule, SelectedApplicationTypeDB } from './types';

export const useGetScheduleOptions = () => {
  const findScheduleOptions = async ({
    selectedApplication,
    rec_id,
    dateRange,
  }: {
    selectedApplication: ApplicationList;
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
  }) => {
    try {
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v2/find_availability', {
        job_id: selectedApplication.public_jobs.id,
        company_id: rec_id,
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        user_tz: dayjs.tz.guess(),
      } as BodyParams);
      if (res.data) {
        if (res.data.length === 0) {
          setNoOptions(true);
          setStep(1);
        } else {
          setSchedulingOptions(res.data);
          setStep(2);
        }
      } else {
        setStep(1);
        toast.error('Error fetching schedule options');
      }
    } catch (e) {
      toast.error('Error fetching schedule options');
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

  const sendToCandidate = async ({
    allPlans,
    is_get_more_option,
  }: {
    allPlans: InterviewModuleDbType[];
    is_get_more_option: boolean;
  }) => {
    try {
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id,status')
        .eq('application_id', selectedApplication.applications.id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0 || checkSch[0].status !== 'reschedule') {
        const { data, error } = await supabase
          .from('interview_schedule')
          .insert({
            is_get_more_option: is_get_more_option,
            application_id: selectedApplication.applications.id,
            schedule_name: scheduleName,
            schedule_type: 'google_meet',
            interview_plan: allPlans,
            status: 'pending',
            filter_json: {
              job_id: selectedApplication.public_jobs.id,
              company_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            } as BodyParams,
            coordinator_id: selCoordinator,
          })
          .select();

        if (!error) {
          mailHandler({
            rec_id: recruiter.id,
            candidate_name: selectedApplication.candidates.first_name,
            mail: selectedApplication.candidates.email,
            position: selectedApplication.public_jobs.job_title,
            schedule_name: scheduleName,
            schedule_id: data[0].id,
          });
          setSelectedApplication({
            ...selectedApplication,
            schedule: data[0] as any,
          });
        }
      } else if (checkSch[0].status === 'reschedule') {
        const { data, error } = await supabase
          .from('interview_schedule')
          .update({
            is_get_more_option: is_get_more_option,
            application_id: selectedApplication.applications.id,
            schedule_name: scheduleName,
            schedule_type: 'google_meet',
            interview_plan: allPlans,
            status: 'pending',
            filter_json: {
              job_id: selectedApplication.public_jobs.id,
              company_id: recruiter.id,
              start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
              end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
              user_tz: dayjs.tz.guess(),
            } as BodyParams,
            coordinator_id: selCoordinator,
          })
          .eq('id', checkSch[0].id)
          .select();
        if (!error) {
          mailHandler({
            rec_id: recruiter.id,
            candidate_name: selectedApplication.candidates.first_name,
            mail: selectedApplication.candidates.email,
            position: selectedApplication.public_jobs.job_title,
            schedule_name: scheduleName,
            schedule_id: data[0].id,
          });
          setSelectedApplication({
            ...selectedApplication,
            schedule: data[0] as any,
          });
        }
      }
    } catch (e) {
      toast.error('Error sending schedule to candidate');
    } finally {
      setIsSendToCandidateOpen(false);
    }
  };

  return { sendToCandidate };
};

export const useGetScheduleApplication = () => {
  const router = useRouter();
  const currentDate = dayjs();
  const { recruiter } = useAuthDetails();
  const threeDays = currentDate.add(1, 'day');
  const fetchInterviewDataByApplication = async () => {
    try {
      setFetchingSchedule(true);

      const { data, error } = await supabase
        .from('interview_schedule')
        .select('*')
        .eq('application_id', router.query.application_id);

      if (!error) {
        setSelectedSchedule(data[0]);

        const resMem = (await axios.post('/api/scheduling/fetchUserDetails', {
          recruiter_id: recruiter.id,
        })) as { data: MemberType[] };

        if (resMem?.data?.length > 0) {
          setMembers(resMem.data);
        }

        const { data: application, error: errorApplication } =
          await getApplicationSchedule.eq('id', router.query.application_id);

        if (!errorApplication && data.length == 0) {
          const typedApplication = application[0] as SelectedApplicationTypeDB;
          setSelectedApplication(typedApplication);

          const sessionsWithPlan = await fetchInterviewData(
            typedApplication.public_jobs.id,
          );
          setinitialSessions(sessionsWithPlan.sessions);

          setScheduleName(
            `Interview for ${typedApplication?.public_jobs?.job_title} - ${typedApplication?.candidates?.first_name}`,
          );
          setDateRange({
            start_date: currentDate.toISOString(),
            end_date: threeDays.toISOString(),
          });
          if (sessionsWithPlan?.interviewPlan?.coordinator_id) {
            setSelCoordinator(sessionsWithPlan?.interviewPlan?.coordinator_id);
          } else {
            const adminUserId = resMem.data.filter(
              (member) => member.role === 'admin',
            )[0]?.user_id;
            adminUserId && setSelCoordinator(adminUserId);
          }
        }
      }
    } catch (error) {
      toast.error('Error fetching interview data');
    } finally {
      setFetchingSchedule(false);
    }
  };
  return { fetchInterviewDataByApplication };
};

export const fetchInterviewData = async (job_id: string) => {
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
        '*,interview_module_relation(*,recruiter_user(user_id,first_name,last_name,email,profile_image,position))',
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
