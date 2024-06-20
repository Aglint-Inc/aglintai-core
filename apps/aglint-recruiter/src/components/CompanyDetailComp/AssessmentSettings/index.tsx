/* eslint-disable jsx-a11y/media-has-caption */
import { RecruiterType } from '@aglint/shared-types';
import { Avatar, FormControlLabel, Stack, Switch } from '@mui/material';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useEffect, useRef, useState } from 'react';

import { AssesmentSetting } from '@/devlink/AssesmentSetting';
import { AudioAvatarCard } from '@/devlink/AudioAvatarCard';
import { AvatarCard } from '@/devlink/AvatarCard';
import { AvatarModal } from '@/devlink/AvatarModal';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { updateRecruiter } from '@/src/context/InterviewContext/utils';
import { avatar_list } from '@/src/utils/avatarlist';
import interviewerList from '@/src/utils/interviewer_list';
import { supabase } from '@/src/utils/supabase/client';

import MuiPopup from '../../Common/MuiPopup';
import { copyCompanySetting } from '../../Jobs/Dashboard/JobPostCreateUpdate/copies/copyCompanySetting';

let tempObj = avatar_list[0];
function AssessmentSettings({
  setIsSaving,
  isVideoAssessment,
  setIsVideoAssessment,
}) {
  const [index, setIndex] = useState(null);
  const { recruiter, setRecruiter } = useAuthDetails();

  const [selectedAvatar, setSelectedAvatar] = useState(
    recruiter?.ai_avatar || avatar_list[0],
  );

  async function handleChangeAvatar(avatar: {
    video_url: string;
    voice_id: string;
    normal_preview: string;
    avatar_id: string;
    name: string;
    audio_url: string;
  }) {
    handleChange();
    setSelectedAvatar(tempObj);
    const { data, error } = await supabase
      .from('recruiter')
      .update({
        ai_avatar: avatar,
      })
      .eq('id', recruiter.id)
      .select();
    if (!error) {
      setRecruiter(data[0] as RecruiterType);
      return data[0];
    }
  }
  const handleChange = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  async function handleAudioChangeAvatar(audio_avatar_index: number) {
    handleChange();

    const { data, error } = await supabase
      .from('recruiter')
      .update({
        audio_avatar_id: audio_avatar_index,
      })
      .eq('id', recruiter.id)
      .select();
    if (!error) {
      setRecruiter(data[0] as RecruiterType);
      return data[0];
    }
  }

  const [audioAvatarIndex, setAudioAvatarIndex] = useState(0);

  useEffect(() => {
    setAudioAvatarIndex(recruiter?.audio_avatar_id);
  }, [recruiter]);

  async function handleCheck(value: boolean) {
    updateRecruiter(recruiter?.id, value);
    setIsVideoAssessment(value);
  }

  const isEnableVideoAssesment = useFeatureFlagEnabled(
    'isEnableVideoAssesment',
  );
  return (
    <div>
      <AssesmentSetting
        textChooseAvatar={
          isVideoAssessment
            ? `Choose your avatar; this avatar will be featured in AI-generated videos. By default, an avatar is selected by Aglint.
      `
            : `Choose your avatar; this avatar image will be shown in the assessment process (audio only).`
        }
        slotToggleButton={
          <ToggleBtn
            isVideoAssessment={isVideoAssessment}
            handleCheck={handleCheck}
          />
        }
        isSwitchVisible={isEnableVideoAssesment}
        textDesc={
          isEnableVideoAssesment
            ? copyCompanySetting.assesment.withVideoAssesmentDesc
            : copyCompanySetting.assesment.withoutVideoAssesmentDesc
        }
        textAvatarName={avatar_list[0].name}
        slotAvatarVideo={
          <>
            {isVideoAssessment
              ? avatar_list.map((avatar, i) => {
                  return (
                    <Stack
                      onClick={() => {
                        setIndex(i);
                        tempObj = avatar;
                        handleChangeAvatar(avatar);
                      }}
                      key={i}
                    >
                      <VideoAvatar
                        selectedAvatar={avatar}
                        isActive={
                          index === i ||
                          //@ts-expect-error
                          (avatar.avatar_id === selectedAvatar.avatar_id &&
                            index === null)
                        }
                      />
                    </Stack>
                  );
                })
              : interviewerList.map((avatar, i) => {
                  return (
                    <Stack
                      onClick={() => {
                        setIndex(i);
                        handleAudioChangeAvatar(i);
                      }}
                      key={i}
                    >
                      <AudioAvatar
                        selectedAvatar={avatar}
                        isActive={
                          index === i ||
                          (i === audioAvatarIndex && index === null)
                        }
                      />
                    </Stack>
                  );
                })}
          </>
        }
      />
    </div>
  );
}

export default AssessmentSettings;

function ToggleBtn({ isVideoAssessment, handleCheck }) {
  return (
    <FormControlLabel
      control={
        <Switch
          sx={{
            '& .MuiSwitch-thumb': {
              color: 'var(--white)', // Color of the switching ball
              height: '13px',
              width: '13px',
              opacity: 1,
            },
            '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
              backgroundColor: 'var(--neutral-3)',
              opacity: 1,
            },
            '& .MuiSwitch-switchBase': {
              top: '6px ',
              left: '6px',
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              left: '0px',
            },
            '& .MuiSwitch-track': {
              // backgroundColor: '#1F73B7', // Background color of the switch
              height: '20px',
              width: '34px',
              borderRadius: '20px',
            },
          }}
          onChange={(e, value) => {
            handleCheck(value);
            return e;
          }}
          checked={isVideoAssessment}
          // defaultChecked
        />
      }
      label=''
    />
  );
}

export function VideoAvatar({ selectedAvatar, isActive }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [openPopUp, setOpenPopUP] = useState(false);
  function onVideoPlay() {
    if (!playing) {
      setOpenPopUP(true);
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  }

  function handleVideoEnd() {
    setOpenPopUP(false);
    setPlaying(false);
  }

  return (
    <>
      <Stack
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <MuiPopup
          props={{
            open: openPopUp,
            // onClose: handleVideoEnd,
            maxWidth: 'md',
          }}
        >
          <AvatarModal
            isPauseIconVisible={playing}
            isPlayIconVisible={!playing}
            onClickPlayPause={{
              onClick: (event) => {
                event.stopPropagation();
                onVideoPlay();
              },
            }}
            onClickClose={{
              onClick: (event) => {
                event.stopPropagation();
                handleVideoEnd();
              },
            }}
            textName={selectedAvatar.name}
            slotVideo={
              <video
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={selectedAvatar.video_url}
                ref={videoRef}
                onEnded={handleVideoEnd}
                autoPlay
              />
            }
          />
        </MuiPopup>
      </Stack>

      <AvatarCard
        isChecked={isActive}
        isActive={isActive}
        isPlay={!playing}
        isPause={playing}
        onClickPlayPause={{
          onClick: (event) => {
            event.stopPropagation();
            setOpenPopUP(true);
            setPlaying(true);
          },
        }}
        slotAvatarVideo={
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              '& img': {
                objectFit: 'contain',
              },
            }}
            src={selectedAvatar.normal_preview}
            variant='rounded'
          />
        }
        textAvatarName={selectedAvatar.name}
      />
    </>
  );
}

export function AudioAvatar({ selectedAvatar, isActive }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  function onVideoPlay() {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying((pre) => !pre);
  }

  function handleAudioEnd() {
    setPlaying((pre) => !pre);
  }
  return (
    <>
      <audio
        onEnded={handleAudioEnd}
        ref={audioRef}
        src={selectedAvatar.voice_file}
      />
      <AudioAvatarCard
        isActive={isActive}
        isPauseButtonVisible={playing}
        isPlayButtonVisible={!playing}
        isChecked={isActive}
        onClickPlayPause={{
          onClick: (event) => {
            event.stopPropagation();
            onVideoPlay();
          },
        }}
        slotAvatar={
          <Avatar
            sx={{
              width: '100%',
              height: '100%',
              '& img': {
                objectFit: 'contain',
              },
              bgcolor: 'var(--neutral-1)',
            }}
            variant='rounded'
            src={selectedAvatar?.image}
          />
        }
        textName={selectedAvatar.name}
      />
    </>
  );
}
