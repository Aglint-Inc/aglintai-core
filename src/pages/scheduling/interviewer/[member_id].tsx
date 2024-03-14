import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { InterviewerDetailTopRight } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DynamicLoader from '@/src/components/CompanyDetailComp/Interviewers/DynamicLoader';
import Interviewer from '@/src/components/CompanyDetailComp/Interviewers/Interviewer';
import { InterviewerContextProvider } from '@/src/context/InterviewerContext/InterviewerContext';
import { InterviewModuleType, RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

export interface interviewerDetailsType {
  modules: {
    id: string;
    module_id: string;
    pause_json: {
      start_date: string;
      end_date: string;
      isManual: boolean;
    };
    training_status: 'qualified' | 'training';
    user_id: string;
    interview_module: InterviewModuleType;
  }[];
  interviewer: RecruiterUserType;
}
function InterviewerPage() {
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  const { data, isLoading, isError, isFetched } = useImrQuery();
  if (isLoading) {
    return <DynamicLoader />;
  } else
    return (
      <PageLayout
        onClickBack={{
          onClick: () => {
            router.back();
          }
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum
              textName={`${data.interviewer?.first_name} ${data.interviewer?.last_name || ''}`}
            />
          </>
        }
        slotTopbarRight={
          <InterviewerDetailTopRight
            onClickSettings={{
              onClick: () => {
                toggleDrawer();
              }
            }}
          />
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
    );
}

InterviewerPage.getProvider = function getProvider(page) {
  return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
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
    queryFn: () => getInterviewerDetails(member_id)
  });
  const refetch = () => queryClient.invalidateQueries({ queryKey });
  return { ...query, refetch };
};

const getInterviewerDetails = async (user_id: string) => {
  const { data: interviewer } = await supabase
    .from('recruiter_user')
    .select()
    .eq('user_id', user_id)
    .single();
  const { data, error } = await supabase
    .from('interview_module_relation')
    .select('* , interview_module(*)')
    .eq('user_id', user_id);
  if (error) throw Error(error.message);
  return { modules: data, interviewer };
};

const imrQueryKeys = {
  all: { queryKey: ['all'] },
  imr: () => ({
    queryKey: [...imrQueryKeys.all.queryKey, 'imr'] // Imr =>interview_module_relation
  }),
  imr_member: (member_id: string) => ({
    queryKey: [...imrQueryKeys.imr().queryKey, { member_id }] // Imr =>interview_module_relation
  })
} as const;
