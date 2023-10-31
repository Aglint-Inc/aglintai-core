/* eslint-disable jsx-a11y/media-has-caption */
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { useRef, useState } from 'react';

import { AssesmentModal, AssesmentSetting, AvatarCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { avatar_list } from '@/src/utils/avatarlist';
import { supabase } from '@/src/utils/supabaseClient';

import MuiPopup from '../../Common/MuiPopup';
let tempObj = avatar_list[0];
function AssessmentSettings() {
  const [openPopup, setPopup] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(null);
  const { recruiter } = useAuthDetails();

  const [selectedAvatar, setSelectedAvatar] = useState(
    recruiter?.ai_avatar || avatar_list[0],
  );
  const videoRef = useRef(null);
  function onVideoPlay() {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  }

  function closePopup() {
    setPopup(false);
    setIndex(null);
  }
  async function handleChangeAvatar() {
    setSelectedAvatar(tempObj);
    const { data, error } = await supabase
      .from('recruiter')
      .update({
        ai_avatar: tempObj,
      })
      .eq('id', recruiter.id)
      .select();
    if (!error) {
      setPopup(false);
      return data[0];
      // console.log(data);
    }
  }
  return (
    <div>
      <MuiPopup
        props={{
          open: openPopup,
          // fullWidth: true,
          // maxWidth: 'md',
          maxWidth: false,
          onClose: closePopup,
        }}
      >
        <Stack height={'100%'} overflow={'auto'} bgcolor={'white.700'}>
          <AssesmentModal
            isWarningVisible={index !== null}
            onClickClose={{
              onClick: closePopup,
            }}
            slotAvatarCard={avatar_list.map((avatar, i) => {
              return (
                <Stack
                  onClick={() => {
                    setIndex(i);
                    tempObj = avatar;
                  }}
                  key={i}
                >
                  <Card
                    index={i}
                    selectedIndex={index}
                    video_url={avatar.video_url}
                    name={avatar.name}
                  />
                </Stack>
              );
            })}
            onClickChoose={{
              onClick: () => {
                handleChangeAvatar();
              },
            }}
          />
        </Stack>
      </MuiPopup>
      <AssesmentSetting
        slotToggleButton={
          <FormControlLabel
            control={
              <Switch
                sx={{
                  '& .MuiSwitch-thumb': {
                    color: 'white.700', // Color of the switching ball
                    height: '13px',
                    width: '13px',
                    opacity: 1,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
                    backgroundColor: '#1F73B7',
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
                defaultChecked
              />
            }
            label=''
          />
        }
        textAvatarName={avatar_list[0].name}
        slotAvatarVideo={
          <Stack bgcolor={'white.700'}>
            <AvatarCard
              isPlay={!playing}
              isPause={playing}
              onClickPlayPause={{ onClick: onVideoPlay }}
              slotAvatarVideo={
                <video
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  //@ts-expect-error
                  src={selectedAvatar.video_url}
                  ref={videoRef}
                />
              }
              //@ts-expect-error
              textAvatarName={selectedAvatar.name}
            />
          </Stack>
        }
        onClickChangeAvatar={{
          onClick: () => {
            setPopup(true);
          },
        }}
      />
    </div>
  );
}

export default AssessmentSettings;

function Card({ selectedIndex, index, video_url, name }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  function onVideoPlay() {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  }
  return (
    <AvatarCard
      isActive={index === selectedIndex}
      onClickPlayPause={{
        onClick: (event: { stopPropagation: () => void }) => {
          event.stopPropagation();
          onVideoPlay();
        },
      }}
      isPlay={!playing}
      isPause={playing}
      slotAvatarVideo={
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={video_url}
          ref={videoRef}
          // onPlay={onVideoPlay}
        />
      }
      textAvatarName={name}
    />
  );
}
