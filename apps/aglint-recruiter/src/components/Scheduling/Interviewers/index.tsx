import { RecruiterUserType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AllInterviewers } from '@/devlink2/AllInterviewers';
import { AllInterviewersCard } from '@/devlink2/AllInterviewersCard';
import { EmptyState } from '@/devlink2/EmptyState';
import { TextWithBg } from '@/devlink2/TextWithBg';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
import Filters from './Filters';
type interviewerListType = {
  rec_user: RecruiterUserType;
  qualified_module_names: string[];
  training_module_names: string[];
  upcoming_meeting_count: number;
  completed_meeting_count: number;
};
const InterviewTab = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { data: interviewers, isLoading, isFetched } = useInterviewerList();
  const [filteredInterviewer, setFilteredInterviewer] = useState(interviewers);

  return (
    <ShowCode>
      <ShowCode.When isTrue={isLoading}>
        <Loader />
      </ShowCode.When>
      <ShowCode.When isTrue={isFetched}>
        <Stack position={'relative'}>
          <Filters setFilteredInterviewer={setFilteredInterviewer} />
          {filteredInterviewer?.length > 0 ? (
            <AllInterviewers
              slotAllInterviewesCard={
                filteredInterviewer
                  ? filteredInterviewer
                      .sort(
                        (a, b) =>
                          b.qualified_module_names.filter((ele) => ele).length -
                            a.qualified_module_names.filter((ele) => ele)
                              .length &&
                          b.training_module_names.filter((ele) => ele).length -
                            a.training_module_names.filter((ele) => ele).length,
                      )
                      .map((member) => {
                        return (
                          <Stack
                            key={member.rec_user.user_id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              // setSelectedInterviewer(member);
                              router.push(
                                `${router.route}/interviewer/${member.rec_user.user_id}`,
                              );
                            }}
                          >
                            <AllInterviewersCard
                              textCompletedInterviews={
                                member.completed_meeting_count
                              }
                              textUpcomingInterviews={
                                member.upcoming_meeting_count
                              }
                              slotProfileImage={
                                <MuiAvatar
                                  src={member.rec_user.profile_image}
                                  level={getFullName(
                                    member.rec_user.first_name,
                                    member.rec_user.last_name,
                                  )}
                                  variant='rounded-medium'
                                />
                              }
                              isCalenderNotConnected={
                                recruiter.service_json === null &&
                                recruiter.email.split('@')[1] ===
                                  member.rec_user.email.split('@')[1] &&
                                member.rec_user.schedule_auth === null
                              }
                              isConnectedCalenderVisible={
                                (recruiter.service_json !== null &&
                                  recruiter.email.split('@')[1] ===
                                    member.rec_user.email.split('@')[1]) ||
                                member.rec_user.schedule_auth !== null
                              }
                              slotInterviewModules={
                                <>
                                  <ShowCode>
                                    <ShowCode.When
                                      isTrue={Boolean(
                                        member.qualified_module_names.filter(
                                          (ele) => ele,
                                        ).length,
                                      )}
                                    >
                                      <>
                                        {member.qualified_module_names
                                          .filter((ele) => ele)
                                          ?.slice(0, 2)
                                          .map((item) => {
                                            if (item)
                                              return (
                                                <TextWithBg
                                                  key={item}
                                                  text={item}
                                                />
                                              );
                                            else return '--';
                                          })}
                                        {member.qualified_module_names.filter(
                                          (ele) => ele,
                                        )?.length > 2 && (
                                          <TextWithBg
                                            text={`+${
                                              member.qualified_module_names.filter(
                                                (ele) => ele,
                                              ).length - 2
                                            }`}
                                          />
                                        )}
                                      </>
                                    </ShowCode.When>
                                    <ShowCode.Else>--</ShowCode.Else>
                                  </ShowCode>
                                </>
                              }
                              slotModulesTraining={
                                <>
                                  <ShowCode>
                                    <ShowCode.When
                                      isTrue={Boolean(
                                        member.training_module_names.filter(
                                          (ele) => ele,
                                        ).length,
                                      )}
                                    >
                                      {member.training_module_names
                                        .filter((ele) => ele)
                                        ?.slice(0, 2)
                                        .map((item) => {
                                          if (item)
                                            return (
                                              <TextWithBg
                                                key={item}
                                                text={item}
                                              />
                                            );
                                        })}
                                      {member.training_module_names.filter(
                                        (ele) => ele,
                                      )?.length > 2 && (
                                        <TextWithBg
                                          text={`+${
                                            member.training_module_names.filter(
                                              (ele) => ele,
                                            ).length - 2
                                          }`}
                                        />
                                      )}
                                    </ShowCode.When>
                                    <ShowCode.Else>--</ShowCode.Else>
                                  </ShowCode>
                                </>
                              }
                              textName={`${member.rec_user.first_name} ${
                                member.rec_user.last_name || ''
                              }`}
                              textRole={member.rec_user?.position}
                            />
                          </Stack>
                        );
                      })
                  : ''
              }
            />
          ) : (
            <EmptyState
              textDescription={'No interviewers found'}
              slotIcons={
                <GlobalIcon
                  iconName='person_search'
                  color={'var(--neutral-2)'}
                  size={9}
                />
              }
            />
          )}
        </Stack>
      </ShowCode.When>
    </ShowCode>
  );
};
// InterviewTab.privateProvider = function privateProvider(page) {
//   return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
// };
export default InterviewTab;

export const useInterviewerList = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['interviewer_list'],
    queryFn: () => getInterviewerList(recruiter.id),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['interviewer_list'] });
  return { ...query, refetch };
};

async function getInterviewerList(recruiter_id: string) {
  const { data, error } = await supabase.rpc('get_interviewers', {
    rec_id: recruiter_id,
  });
  if (error) throw Error(error.message);
  else return data as unknown as interviewerListType[];
}
