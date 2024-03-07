import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { AllInterviewers, AllInterviewersCard, TextWithBg } from '@/devlink2';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';

import MuiAvatar from '../../Common/MuiAvatar';

const InterviewTab = () => {
  const { interviewerMembers, modulesAndMapping } = useInterviewerContext();
  const router = useRouter();

  return (
    <Stack position={'relative'}>
      <AllInterviewers
        slotAllInterviewesCard={
          <>
            {interviewerMembers.map((member) => {
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
                        fontSize='24px'
                      />
                    }
                    slotInterviewModules={
                      <>
                        {modulesAndMapping.moduleMapping[member.user_id]
                          ?.slice(0, 2)
                          .map((item) => (
                            <TextWithBg
                              key={modulesAndMapping.modules[String(item)].id}
                              text={
                                modulesAndMapping.modules[String(item)].name
                              }
                            />
                          ))}
                        {modulesAndMapping.moduleMapping[member.user_id]
                          ?.length > 2 && (
                          <TextWithBg
                            text={`+${modulesAndMapping.moduleMapping[member.user_id].length - 2}`}
                          />
                        )}
                      </>
                    }
                    textName={`${member.first_name} ${member.last_name || ''}`}
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
