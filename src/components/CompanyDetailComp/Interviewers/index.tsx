import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { AllInterviewers, AllInterviewersCard } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import MuiAvatar from '../../Common/MuiAvatar';

const InterviewTab = () => {
  const { members } = useAuthDetails();
  const router = useRouter();

  return (
    <Stack position={'relative'}>
      <AllInterviewers
        slotAllInterviewesCard={
          <>
            {members.map((member) => {
              return (
                <Stack
                  key={member.user_id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    // setSelectedInterviewer(member);
                    router.push(
                      `${router.route}/interviewer/${member.user_id}`
                    );
                  }}
                >
                  <AllInterviewersCard
                    slotProfileImage={
                      <MuiAvatar
                        src={member.profile_image}
                        level={member.first_name}
                        variant='circular'
                        height='100%'
                        width='100%'
                        fontSize='14px'
                      />
                    }
                    slotInterviewModules={<></>}
                    textName={`${member.first_name} ${member.last_name || ''}`}
                    textRole={member?.position}
                  />
                </Stack>
              );
            })}
          </>
        }
      />
    </Stack>
  );
};
// InterviewTab.getProvider = function getProvider(page) {
//   return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
// };
export default InterviewTab;
