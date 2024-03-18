import { Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { AllInterviewers, AllInterviewersCard, TextWithBg } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';

import Loader from '../../Common/Loader';
import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
type interviewerListType = {
  rec_user: RecruiterUserType;
  upcoming_meeting_count: number;
  completed_meeting_count: number;
  module_names: any[];
};
const InterviewTab = () => {
  const router = useRouter();
  const { data: interviewers, isLoading, isFetched } = useInterviewerList();
  return (
    <ShowCode>
      <ShowCode.When isTrue={isLoading}>
        <Loader />
      </ShowCode.When>
      <ShowCode.When isTrue={isFetched}>
        <Stack position={'relative'}>
          <AllInterviewers
            slotAllInterviewesCard={
              interviewers &&
              [
                ...interviewers.filter((item) => item.module_names[0]),
                ...interviewers.filter((item) => !item.module_names[0])
              ].map((member) => {
                return (
                  <Stack
                    key={member.rec_user.user_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      // setSelectedInterviewer(member);
                      router.push(
                        `${router.route}/interviewer/${member.rec_user.user_id}`
                      );
                    }}
                  >
                    <AllInterviewersCard
                      textCompletedInterviews={member.completed_meeting_count}
                      textUpcomingInterviews={member.upcoming_meeting_count}
                      slotProfileImage={
                        <MuiAvatar
                          src={member.rec_user.profile_image}
                          level={member.rec_user.first_name}
                          variant='circular'
                          height='100%'
                          width='100%'
                          fontSize='16px'
                        />
                      }
                      slotInterviewModules={
                        <>
                          {member.module_names
                            ?.slice(0, 2)
                            .map((item) => (
                              <TextWithBg key={item} text={item} />
                            ))}
                          {member.module_names?.length > 2 && (
                            <TextWithBg
                              text={`+${member.module_names.length - 2}`}
                            />
                          )}
                        </>
                      }
                      textName={`${member.rec_user.first_name} ${member.rec_user.last_name || ''}`}
                      textRole={member.rec_user?.position}
                    />
                  </Stack>
                );
              })
            }
          />
        </Stack>
      </ShowCode.When>
    </ShowCode>
  );
};
// InterviewTab.getProvider = function getProvider(page) {
//   return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
// };
export default InterviewTab;

const useInterviewerList = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['interviewer_list'],
    queryFn: () => getInterviewerList(recruiter.id)
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['interviewer_list'] });
  return { ...query, refetch };
};

async function getInterviewerList(recruiter_id: string) {
  const { data, error } = await supabase.rpc('get_interviewers', {
    rec_id: recruiter_id
  });
  if (error) throw Error(error.message);
  else return data as unknown as interviewerListType[];
}
