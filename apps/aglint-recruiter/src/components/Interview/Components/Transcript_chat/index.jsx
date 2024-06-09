/* eslint-disable jsx-a11y/media-has-caption */
import { useInterviewPrep } from '@context/InterviewPreparation';
import { CircularProgress, Stack } from '@mui/material';
import interviewerList from '@utils/interviewer_list';
import React, { useRef, useState } from 'react';

import { AiCardScript } from '@/Interview_devlink/AiCardScript';
import { InterviewerCardScript } from '@/Interview_devlink/InterviewerCardScript';
import { TranscriptBlock } from '@/Interview_devlink/TranscriptBlock';
import { UserCardScript } from '@/Interview_devlink/UserCardScript';
import PlayStop from '@/src/components/Common/Lotties/playStopLottie';
import { useInterviewDetailsContext } from '@/src/context/InterviewDetails';

function Transcript_chat() {
  const { interviewerIndex, conversations } = useInterviewPrep();
  const { candidateDetails } = useInterviewDetailsContext();
  return (
    <>
      {conversations.map((conv, index) => {
        return (
          <TranscriptBlock
            key={index}
            slotScriptCard={
              <>
                <ConversationsCard
                  roleImage={interviewerList[Number(interviewerIndex)].image}
                  roleName={interviewerList[Number(interviewerIndex)].name}
                  textForSpeach={conv.content}
                  src={conv.aiVoice}
                  index={index}
                  wrapperStyle={{
                    justifyContent: 'space-between',
                    direction: 'row',
                  }}
                />

                {conv.userContent && (
                  <ConversationsCard
                    roleName={conv.userRole}
                    textForSpeach={conv.userContent}
                    src={conv.userVoice}
                    roleImage={candidateDetails.profile_image}
                    index={index}
                    wrapperStyle={{
                      direction: 'row',
                      justifyContent: 'space-between',
                      p: 'var(--space-2)',
                      pr: 0,
                      borderRadius: 'var(--radius-4)',
                      bgcolor: 'var(--neutral-3)',
                    }}
                  />
                )}
              </>
            }
          />
        );
      })}
    </>
  );
}

export default Transcript_chat;

export function ConversationsCard({
  roleImage,
  roleName,
  textForSpeach,
  index,
  src,
  improvemyans,
  isAnsLoading,
}) {
  const [pauseState, setPauseSound] = useState(false);
  const [getIndex, setIndex] = useState(null);
  const audioRef = useRef();
  const lottieRef = useRef();
  function playAudio() {
    setIndex(index);
    setPauseSound(true);
    audioRef.current.play();
  }
  function pauseAudio() {
    setIndex(null);

    setPauseSound(false);
    audioRef.current.pause();
  }
  const handleAudioEnded = () => {
    setIndex(null);

    setPauseSound(false);
  };

  return (
    <>
      <audio
        // controls
        onEnded={handleAudioEnded}
        preload='auto'
        ref={audioRef}
        src={src}
      />
      <TranscriptBlock
        slotScriptCard={
          roleName === 'You' ? (
            <UserCardScript
              slotPlayerButton={
                <Stack
                  onClick={() => {
                    if (!pauseState && index !== getIndex) {
                      playAudio();
                    }
                    if (pauseState && index === getIndex) {
                      pauseAudio();
                    }
                  }}
                >
                  <PlayStop
                    lottieRef={lottieRef}
                    speaking={pauseState && index === getIndex}
                  />
                </Stack>
              }
              isPauseButtonVisible={pauseState && index === getIndex}
              isPlayButtonVisible={!pauseState || index !== getIndex}
              onClickPlay={{ onClick: playAudio }}
              onClickPause={{ onClick: pauseAudio }}
              userImage={roleImage}
              userTranscriptText={textForSpeach}
            />
          ) : roleName === 'Aglint Ai' ? (
            <AiCardScript
              isPauseButtonVisible={false}
              isPlayButtonVisible={false}
              isAiTextVisible={textForSpeach}
              isAiLoaderVisible={isAnsLoading}
              isImproveButonActive={!textForSpeach && !isAnsLoading}
              aiText={textForSpeach}
              isLoadingVisible={isAnsLoading}
              onClickImprove={{ onClick: improvemyans }}
              slotLottie={
                <Stack>
                  <CircularProgress size={15} />
                </Stack>
              }
            />
          ) : (
            <InterviewerCardScript
              slotPlayerButton={
                <Stack
                  onClick={() => {
                    if (!pauseState && index !== getIndex) {
                      playAudio();
                    }
                    if (pauseState && index === getIndex) {
                      pauseAudio();
                    }
                  }}
                >
                  <PlayStop
                    lottieRef={lottieRef}
                    speaking={pauseState && index === getIndex}
                  />
                </Stack>
              }
              name={roleName}
              isPauseButtonVisible={pauseState && index === getIndex}
              isPlayButtonVisible={!pauseState || index !== getIndex}
              onClickPlay={{ onClick: playAudio }}
              onClickPause={{ onClick: pauseAudio }}
              interviewerImage={roleImage}
              interviewerTranscriptText={textForSpeach}
            />
          )
        }
      />
    </>
  );
}
