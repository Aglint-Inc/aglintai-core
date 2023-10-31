/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';

import { AssesmentModal, AssesmentSetting, AvatarCard } from '@/devlink';
import { avatar_list } from '@/src/utils/avatarlist';

import MuiPopup from '../../Common/MuiPopup';
let tempObj = avatar_list[0];
function AssessmentSettings() {
  const [openPopup, setPopup] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar_list[0]);
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
  return (
    <div>
      <Button
        onClick={async () => {
          // console.log('dheeraj');
          const data = await axios.post('/api/generateVideo', {
            text: 'Hello world',
          });
          console.log(data);
        }}
      >
        onClick
      </Button>
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
                setSelectedAvatar(tempObj);
              },
            }}
          />
        </Stack>
      </MuiPopup>
      <AssesmentSetting
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
                  src={selectedAvatar.video_url}
                  ref={videoRef}
                />
              }
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
        onClick: onVideoPlay,
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
