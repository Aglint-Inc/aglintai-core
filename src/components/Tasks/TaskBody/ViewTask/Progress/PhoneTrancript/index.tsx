import { Collapse, Stack } from '@mui/material';
import { useState } from 'react';

import {
  AgentPill,
  AvatarWithName,
  ListCard,
  SoundTask,
  TranscriptCard,
} from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TranscriptPlayer from '@/src/components/Tasks/TaskBody/ViewTask/Progress/PhoneTrancript/TranscriptPlayer';
import { PhoneAgentId } from '@/src/components/Tasks/utils';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { capitalizeAll } from '@/src/utils/text/textUtils';

function PhoneTranscript({
  audio_url,
  transcript,
}: {
  audio_url: string;
  transcript: { id: string; message: string }[];
}) {
  const { tasks } = useTasksContext();
  const [openTranscript, setOpenTranscript] = useState(false);
  return (
    <SoundTask
      isHideVisible={openTranscript}
      isShowVisible={!openTranscript}
      onClickHide={{
        onClick: () => {
          setOpenTranscript(false);
        },
      }}
      onClickShow={{
        onClick: () => {
          setOpenTranscript(true);
        },
      }}
      slotAudioPlay={<TranscriptPlayer src={audio_url} />}
      slotTranscript={
        <Collapse
          sx={{
            '& .MuiCollapse-wrapperInner': {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            },
          }}
          in={openTranscript}
          collapsedSize={0}
        >
          {transcript &&
            transcript.length &&
            transcript.map((ele, i) => {
              const receiver = tasks
                .map((item) => item.applications.candidates)
                .find((item) => item.id === ele.id);
              if (ele.message && ele.message.trim())
                return (
                  <Stack width={'100%'} gap={1} key={i}>
                    <TranscriptCard
                      isBackgroundActive={ele.id !== PhoneAgentId}
                      slotAgent={
                        <Stack width={'100%'}>
                          <ShowCode>
                            <ShowCode.When isTrue={ele.id === PhoneAgentId}>
                              <AgentPill
                                isPhoneAgentVisible={true}
                                isEmailAgentVisible={false}
                              />
                            </ShowCode.When>
                            <ShowCode.Else>
                              <ListCard
                                isAvatarWithNameVisible={true}
                                isListVisible={false}
                                slotAvatarWithName={
                                  receiver && (
                                    <AvatarWithName
                                      isAvatarVisible={false}
                                      isCandidateIconVisible={true}
                                      isRoleVisible={false}
                                      isReverseShadowVisible={false}
                                      isShadowVisible={false}
                                      slotAvatar={<></>}
                                      isTickVisible={false}
                                      textName={capitalizeAll(
                                        receiver?.first_name +
                                          ' ' +
                                          (receiver?.last_name ?? ''),
                                      )}
                                    />
                                  )
                                }
                              />
                            </ShowCode.Else>
                          </ShowCode>
                        </Stack>
                      }
                      textScript={ele.message}
                    />
                  </Stack>
                );
            })}
        </Collapse>
      }
    />
  );
}

export default PhoneTranscript;
