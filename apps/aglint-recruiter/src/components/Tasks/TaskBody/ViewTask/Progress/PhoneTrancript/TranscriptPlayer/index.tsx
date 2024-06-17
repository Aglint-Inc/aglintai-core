import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

import { ShowCode } from '../../../../../../Common/ShowCode';
function TranscriptPlayer({ src }: { src: string }) {
  const [duration, setDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [seekBarValue, setSeekBarValue] = useState(0);
  audioRef.current?.addEventListener('pause', () => {
    setPlaying(false);
  });

  function getAudioDuration(fileUrl: string) {
    // Create an audio element
    var audio = new Audio();

    // Set the audio source to the provided file URL
    audio.src = fileUrl;

    // Once metadata is loaded, get the duration
    audio.onloadedmetadata = function () {
      // Get the duration in seconds
      var duration = audio.duration;
      let durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration) % 60;

      let durationFormattedMinutes =
        durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes;
      let durationFormattedSeconds =
        durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;

      let formattedDuration = `${durationFormattedMinutes}:${durationFormattedSeconds}`;
      // Pass the duration to the callback function
      setDuration(formattedDuration);
    };
  }
  useEffect(() => {
    getAudioDuration(src);
    if (audioRef.current) {
      audioRef.current?.addEventListener('timeupdate', function () {
        const currentTime = audioRef.current?.currentTime as number;
        const duration = audioRef.current?.duration as number;

        let currentDurationMinutes = Math.floor(currentTime / 60);
        let currentDurationSeconds = Math.floor(currentTime) % 60;

        let currentDurationFormattedMinutes =
          currentDurationMinutes < 10
            ? `0${currentDurationMinutes}`
            : currentDurationMinutes;
        let currentDurationFormattedSeconds =
          currentDurationSeconds < 10
            ? `0${currentDurationSeconds}`
            : currentDurationSeconds;

        let formattedCurrentDuration = `${currentDurationFormattedMinutes}:${currentDurationFormattedSeconds}`;
        setCurrentTime(formattedCurrentDuration);

        // for progress
        const progress = (currentTime / duration) * 100;
        setSeekBarValue(progress);
      });
    }
  }, [src]);
  return (
    <Stack
      width={'100%'}
      alignItems={'center'}
      direction={'row'}
      spacing={'var(--space-5)'}
    >
      <ShowCode>
        <ShowCode.When isTrue={!playing}>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              audioRef.current?.play();
              setPlaying(true);
            }}>
            <GlobalIcon
             iconName='play_arrow' 
             size={6} 
             weight='thin'
             color='neutral-8'
            />
          </Box>
        </ShowCode.When>
        <ShowCode.When isTrue={playing}>
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              audioRef.current?.pause();
              setPlaying(false);
            }}>
            <GlobalIcon
              iconName='pause' 
              size={6} 
              weight='thin'
              color='neutral-8'
            />
          </Box>
        </ShowCode.When>
      </ShowCode>

      <Stack width={'100%'}>
        <LinearProgress variant='determinate' value={seekBarValue} />
      </Stack>
      <Typography variant='caption'>{`${currentTime}/${duration}`}</Typography>
      {/* <IconVolume /> */}
      <audio src={src} ref={audioRef}>
        <track kind='captions' src={src} />
      </audio>
    </Stack>
  );
}

export default TranscriptPlayer;
