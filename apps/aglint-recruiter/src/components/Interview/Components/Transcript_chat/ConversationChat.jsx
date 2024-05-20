import { ConversationsCard } from '@components/InterviewPrep/Components/Transcript_chat';
import { useAuthDetails } from '@context/AuthContext';
import { useInterviewPrep } from '@context/InterviewPreparation';
import { Stack } from '@mui/material';
import interviewerList from '@utils/interviewer_list';
import React, { useEffect } from 'react';

import { TranscriptBlock } from '@/devlink/TranscriptBlock';

function ConversationChat() {
  const {
    loadingRes,
    conversations,
    convIndex,
    setConvIndex,
    improvemyans,
    interviewerIndex,
  } = useInterviewPrep();

  const { employeeDtails } = useAuthDetails();

  useEffect(() => {
    setConvIndex(conversations?.length - 1);
  }, [conversations]);
  return (
    <Stack spacing={'40px'}>
      {conversations.map((conv, index) => {
        if (conv.userContent)
          return (
            <>
              {/* <Divider sx={{ bgcolor: 'grey.600' }} /> */}
              {/* <Typography component={'span'} color={'white.700'}>
                Question-{index + 1}
              </Typography> */}
              <TranscriptBlock
                slotScriptCard={
                  <>
                    <ConversationsCard
                      roleImage={
                        interviewerList[Number(interviewerIndex)].image
                      }
                      roleName={interviewerList[Number(interviewerIndex)].name}
                      textForSpeach={conv.content}
                      src={conv.aiVoice}
                      index={index}
                    />

                    <ConversationsCard
                      roleImage={employeeDtails[0]?.image}
                      roleName={conv.userRole}
                      textForSpeach={conv.userContent}
                      src={conv.userVoice}
                      index={index}
                    />
                    <ConversationsCard
                      roleName={'Aglint Ai'}
                      textForSpeach={conv.aiAnswer}
                      isAnsLoading={convIndex === index && loadingRes}
                      improvemyans={() => {
                        if (!(convIndex === index && loadingRes)) {
                          setConvIndex(index);
                          improvemyans(index, conv.content, conv.userContent);
                        }
                      }}
                    />
                  </>
                }
              />
            </>
          );
      })}
    </Stack>
  );
}

export default ConversationChat;
