/* eslint-disable no-undef */
import { Stack } from '@mui/material';
import React, { useRef, useState } from 'react';

import {
  AiTranscript,
  InterviewTranscriptCard,
  UserTranscript,
} from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

import PlayStop from '../../../Common/PlayStop';

function ConversationCard({
  roleImage,
  roleName,
  textForSpeech,
  src,
  index,
  cardFor,
}) {
  const [pauseState, setPauseSound] = useState(false);

  const [getIndex, setIndex] = useState(null);
  const audioRef = useRef(null);
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
      >
        <track kind='captions' />
      </audio>
      <InterviewTranscriptCard
        slotAiTranscript={<></>}
        slotUserTranscript={
          <>
            {cardFor !== 'ai' ? (
              <UserTranscript
                slotUserImage={
                  <MuiAvatar
                    src={roleImage}
                    level={roleName}
                    height={'24px'}
                    width={'24px'}
                    fontSize={'15px'}
                    variant={'circular'}
                  />
                }
                textAnswer={textForSpeech}
                userTextName={roleName}
                slotUserPlayButton={
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
              />
            ) : (
              <AiTranscript
                slotAiImage={
                  <MuiAvatar
                    src={roleImage}
                    level={roleName}
                    height={'24px'}
                    width={'24px'}
                    fontSize={'15px'}
                    variant={'circular'}
                  />
                }
                textQuestion={textForSpeech}
                textAiName={roleName}
                slotPlayButton={
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
              />
            )}
          </>
        }
      />
    </>
  );
}

export default ConversationCard;
