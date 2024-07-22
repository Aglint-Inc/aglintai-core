import { RecruiterUserType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
                <svg
                  width='60'
                  height='60'
                  viewBox='0 0 25 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.1998 3.9C10.5498 3.9 9.9498 4.0625 9.3998 4.3875C8.8498 4.7125 8.4123 5.15 8.0873 5.7C7.7623 6.275 7.5998 6.875 7.5998 7.5C7.5998 8.125 7.7623 8.725 8.0873 9.3C8.4123 9.85 8.8498 10.2875 9.3998 10.6125C9.9498 10.9375 10.5498 11.1 11.1998 11.1C11.8498 11.1 12.4498 10.9375 12.9998 10.6125C13.5498 10.2875 13.9873 9.85 14.3123 9.3C14.6373 8.725 14.7998 8.125 14.7998 7.5C14.7998 6.875 14.6373 6.275 14.3123 5.7C13.9873 5.15 13.5498 4.7125 12.9998 4.3875C12.4498 4.0625 11.8498 3.9 11.1998 3.9ZM6.3998 7.5C6.3998 6.625 6.6123 5.825 7.0373 5.1C7.4623 4.375 8.0498 3.7875 8.7998 3.3375C9.5498 2.9125 10.3498 2.7 11.1998 2.7C12.0498 2.7 12.8498 2.9125 13.5998 3.3375C14.3498 3.7875 14.9373 4.375 15.3623 5.1C15.7873 5.825 15.9998 6.625 15.9998 7.5C15.9998 8.375 15.7873 9.175 15.3623 9.9C14.9373 10.625 14.3498 11.2125 13.5998 11.6625C12.8498 12.0875 12.0498 12.3 11.1998 12.3C10.3498 12.3 9.5498 12.0875 8.7998 11.6625C8.0498 11.2125 7.4623 10.625 7.0373 9.9C6.6123 9.175 6.3998 8.375 6.3998 7.5ZM9.9998 14.1H11.1998H12.3998C12.7748 14.125 12.9748 14.325 12.9998 14.7C12.9748 15.075 12.7748 15.275 12.3998 15.3H12.0248L12.8498 17.7375L14.0498 15.1125C14.1748 14.8625 14.3748 14.7625 14.6498 14.8125C16.0998 15.0875 17.2748 15.775 18.1748 16.875C19.0998 17.95 19.5748 19.2375 19.5998 20.7375C19.5998 21.0625 19.4873 21.3375 19.2623 21.5625C19.0373 21.7875 18.7623 21.9 18.4373 21.9H3.9623C3.6373 21.9 3.3623 21.7875 3.1373 21.5625C2.9123 21.3375 2.7998 21.0625 2.7998 20.7375C2.8248 19.2375 3.2998 17.95 4.2248 16.875C5.1248 15.775 6.2998 15.0875 7.7498 14.8125C8.0248 14.7625 8.2248 14.875 8.3498 15.15L9.5498 17.7375L10.3748 15.3H9.9998C9.6248 15.275 9.4248 15.075 9.3998 14.7C9.4248 14.325 9.6248 14.125 9.9998 14.1ZM10.6748 20.1375C10.7998 20.3625 10.9748 20.475 11.1998 20.475C11.4498 20.475 11.6373 20.3625 11.7623 20.1375L12.0998 19.3125L11.1998 16.6125L10.2998 19.3125L10.6748 20.1375ZM9.5498 20.625L7.4873 16.0875C6.4623 16.4125 5.6373 16.9875 5.0123 17.8125C4.3623 18.6375 4.0248 19.6 3.9998 20.7H9.5873C9.5873 20.675 9.5873 20.6625 9.5873 20.6625C9.5873 20.6375 9.5748 20.625 9.5498 20.625ZM18.3998 20.7C18.3748 19.6 18.0373 18.6375 17.3873 17.8125C16.7623 16.9875 15.9373 16.4125 14.9123 16.0875L12.8498 20.625C12.8248 20.625 12.8123 20.6375 12.8123 20.6625C12.8123 20.6625 12.8123 20.675 12.8123 20.7H18.3998Z'
                    fill='var(--neutral-7)'
                  ></path>
                </svg>
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
