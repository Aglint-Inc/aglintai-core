import { DialogContent } from '@mui/material';
import { useRef, useState } from 'react';

import { AvatarModal } from '@/devlink';

const QuestionVideoPlayer = ({ videoUrl, avatarName, setOpenPopUp }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const handleVideoPlay = () => {
    if (!playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlaying((pre) => !pre);
  };

  return (
    <DialogContent>
      <AvatarModal
        textName={avatarName}
        isPauseIconVisible={playing}
        isPlayIconVisible={!playing}
        onClickPlayPause={{
          onClick: (event: { stopPropagation: () => void }) => {
            event.stopPropagation();
            handleVideoPlay();
          },
        }}
        onClickClose={{
          onClick: (event: { stopPropagation: () => void }) => {
            event.stopPropagation();
            setPlaying(false);
            setOpenPopUp(false);
          },
        }}
        // textName={l.name}
        slotVideo={
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={videoUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            ref={videoRef}
            onEnded={() => {
              setPlaying(false);
            }}
            autoPlay
          />
        }
      />
    </DialogContent>
  );
};

export default QuestionVideoPlayer;
