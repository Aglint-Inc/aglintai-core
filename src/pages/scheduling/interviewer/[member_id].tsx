import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { InterviewerDetailTopRight } from '@/devlink3';
import Seo from '@/src/components/Common/Seo';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import Interviewer from '@/src/components/Scheduling/Interviewers/Interviewer';
import { ModuleType } from '@/src/components/Scheduling/Modules/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';
import {
  InterviewMeetingTypeDb,
  InterviewModuleType,
  InterviewScheduleTypeDB,
  InterviewSessionTypeDB,
  RecruiterUserType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

export interface interviewerDetailsType {
  modules: {
    id: string;
    module_id: string;
    pause_json: {
      start_date: string;
      end_date: string;
      isManual: boolean;
      z;
    };
    training_status: 'qualified' | 'training';
    user_id: string;
    interview_module: InterviewModuleType & {
      settings: ModuleType['settings'];
    };
  }[];
  interviewer: RecruiterUserType;
}
function InterviewerPage() {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  const { data, isLoading, isError, isFetched } = useImrQuery();
  if (isLoading) {
    return <DynamicLoader />;
  } else
    return (
      <>
        <Seo title={`Interviewer`} description='AI for People Products' />
        <PageLayout
          onClickBack={{
            onClick: () => {
              router.back();
            },
          }}
          isBackButton={true}
          slotTopbarLeft={
            <>
              <Breadcrum
                textName={`${data.interviewer?.first_name} ${
                  data.interviewer?.last_name || ''
                }`}
              />
            </>
          }
          slotTopbarRight={
            <ShowCode>
              <ShowCode.When isTrue={isLoading}>
                <DynamicLoader />
              </ShowCode.When>
              <ShowCode.When
                isTrue={
                  (recruiterUser.role === 'recruiter' ||
                    recruiterUser.role === 'recruiting_coordinator') &&
                  data.interviewer.email === recruiter.email
                }
              >
                {null}
              </ShowCode.When>
              <ShowCode.Else>
                <InterviewerDetailTopRight
                  onClickSettings={{
                    onClick: () => {
                      toggleDrawer();
                    },
                  }}
                />
              </ShowCode.Else>
            </ShowCode>
          }
          slotBody={
            <>
              <ShowCode>
                <ShowCode.When isTrue={isLoading}>
                  <DynamicLoader />
                </ShowCode.When>
                <ShowCode.When isTrue={isError}>
                  <>Error...</>
                </ShowCode.When>
                <ShowCode.When isTrue={isFetched}>
                  <Interviewer
                    interviewerDetails={data as interviewerDetailsType}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                  />
                </ShowCode.When>
              </ShowCode>
            </>
          }
        />
      </>
    );
}

InterviewerPage.privateProvider = function privateProvider(page) {
  return (
    <InterviewerContextProvider>
      <SchedulingProvider>{page}</SchedulingProvider>
    </InterviewerContextProvider>
  );
};

export default InterviewerPage;

// Imr =>interview_module_relation
export const useImrQuery = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const member_id = router.query.member_id as string;
  const { queryKey } = imrQueryKeys.imr_member(member_id);
  const query = useQuery({
    queryKey,
    queryFn: () => getInterviewerDetails(member_id),
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

const getInterviewerDetails = async (user_id: string) => {
  const { data } = await axios.post(
    '/api/scheduling/get_interviewer_and_modules',
    {
      user_id: user_id,
    },
  );
  return data as interviewerDetailsType;
};

const imrQueryKeys = {
  all: { queryKey: ['all'] },
  imr: () => ({
    queryKey: [...imrQueryKeys.all.queryKey, 'imr'], // Imr =>interview_module_relation
  }),
  imr_member: (member_id: string) => ({
    queryKey: [...imrQueryKeys.imr().queryKey, { member_id }], // Imr =>interview_module_relation
  }),
  interviewer_schedules: () => ({
    queryKey: [...imrQueryKeys.all.queryKey, 'interviewerSchedules'], // Imr =>interview_module_relation
  }),
  interviewer_schedules_member: (member_id: string) => ({
    queryKey: [...imrQueryKeys.interviewer_schedules().queryKey, { member_id }], // Imr =>interview_module_relation
  }),
} as const;

export const useInterviewerSchedulesQuery = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const member_id = router.query.member_id as string;
  const { queryKey } = imrQueryKeys.interviewer_schedules_member(member_id);
  const query = useQuery({
    queryKey,
    queryFn: () => getSchedules(member_id),
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });

  return { ...query, refetch };
};

async function getSchedules(user_id: string) {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_user_id',
    {
      target_user_id: user_id,
    },
  );
  if (error) throw Error(error.message);
  return data as unknown as {
    interview_session: InterviewSessionTypeDB;
    interview_meeting: InterviewMeetingTypeDb;
    schedule: InterviewScheduleTypeDB;
    users: {
      id: string;
      training_type: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_image: string;
    }[];
  }[];
}
