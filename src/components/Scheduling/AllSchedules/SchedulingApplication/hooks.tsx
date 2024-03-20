import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setDateRange,
  setFetchingPlan,
  setFetchingSchedule,
  setInterviewModules,
  setMembers,
  setScheduleName,
  setSchedulingOptions,
  setSelCoordinator,
  setSelectedApplication,
  setStep,
  useSchedulingApplicationStore,
} from './store';
import { ApplicationList } from '../store';
import { mailHandler } from '../utils';

export const useGetScheduleOptions = () => {
  const [noOptions, setNoOptions] = useState(false);
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
      setNoOptions(true);
      setFetchingPlan(true);
      const res = await axios.post('/api/scheduling/v2/find_availability', {
        job_id: selectedApplication.public_jobs.id,
        company_id: rec_id,
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      });
      if (res.data) {
        if (res.data.length === 0) {
          setNoOptions(true);
          setStep(1);
        } else {
          setSchedulingOptions(res.data);
          setStep(2);
        }
        setFetchingPlan(false);
      } else {
        setStep(1);
        toast.error('Error fetching schedule options');
        setFetchingPlan(false);
      }
    } catch (e) {
      setStep(1);
      //
    }
  };

  return { findScheduleOptions, noOptions };
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
  }: {
    allPlans: InterviewModuleDbType[];
  }) => {
    try {
      const { data: checkSch, error: errorCheckSch } = await supabase
        .from('interview_schedule')
        .select('id')
        .eq('application_id', selectedApplication.applications.id);

      if (errorCheckSch) throw new Error(errorCheckSch.message);

      if (checkSch.length === 0) {
        const { data, error } = await supabase
          .from('interview_schedule')
          .insert({
            application_id: selectedApplication.applications.id,
            schedule_name: scheduleName,
            schedule_type: 'google_meet',
            interview_plan: allPlans,
            status: 'pending',
            filter_json: {
              job_id: selectedApplication.public_jobs.id,
              company_id: recruiter.id,
              start_date: dateRange.start_date,
              end_date: dateRange.end_date,
            },
            coordinator_id: selCoordinator,
          })
          .select();

        if (!error) {
          mailHandler({
            id: data[0].id,
            candidate_name: selectedApplication.candidates.first_name,
            company_logo: recruiter.logo,
            company_name: recruiter.name,
            schedule_name: scheduleName,
          });
          setSelectedApplication({
            ...selectedApplication,
            schedule: data[0] as any,
          });
        }
      }
    } catch (e) {
      toast.error('Error sending schedule to candidate');
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
      const { data, error } = await supabase.rpc(
        'fetch_interview_data_by_application_id',
        {
          app_id: router.query.application_id as string,
        },
      );

      if (!error && data.length > 0) {
        const application = data[0] as unknown as ApplicationList;
        setScheduleName(
          `Interview for ${application?.public_jobs?.job_title} - ${application?.candidates?.first_name}`,
        );
        setDateRange({
          start_date: currentDate.toISOString(),
          end_date: threeDays.toISOString(),
        });
        const moduleIds = application?.public_jobs?.interview_plan?.plan
          ?.filter((plan) => !plan.isBreak)
          ?.map((plan) => plan.module_id);

        if (moduleIds?.length > 0) {
          const { data: modules, error: moduleError } = await supabase
            .from('interview_module')
            .select('*')
            .in('id', moduleIds);

          if (!moduleError) {
            setInterviewModules(modules);
          }
        }
        let userIds = [];
        application?.public_jobs?.interview_plan?.plan.map((plan) => {
          plan.selectedIntervs.map((interv) => {
            userIds.push(interv.interv_id);
          });
          plan.revShadowInterv.map((interv) => {
            userIds.push(interv.interv_id);
          });
          plan.shadowIntervs.map((interv) => {
            userIds.push(interv.interv_id);
          });
        });
        userIds.push(
          application?.public_jobs?.interview_plan.coordinator.interv_id,
        );

        const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
          recruiter_id: recruiter.id,
        });

        if (resMem?.data?.length > 0) {
          setMembers(resMem.data);
        }
        setSelectedApplication(application);
        setSelCoordinator(
          application.public_jobs.interview_plan.coordinator.interv_id,
        );
      }
    } catch (error) {
      toast.error('Error fetching interview data');
    } finally {
      setFetchingSchedule(false);
    }
  };
  return { fetchInterviewDataByApplication };
};
