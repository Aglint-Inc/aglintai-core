// this file is not in use
import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { useInterviewPrep } from '@/src/context/InterviewPreparation';

function MicLevelLottie({ children }) {
  const { mediaRecorder, animationFrameId, micLevel, blinkLayer } =
    useInterviewPrep();

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Stack
      borderRadius={{ xs: '10px', md: '50%' }}
      height={{ xs: '80px', md: '140px' }}
      width={{ xs: '80px', md: '140px' }}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'relative'}
    >
      <Stack
        borderRadius={{ xs: '10px', md: '50%' }}
        bgcolor={'green.200'}
        sx={{
          width: `${130 + micLevel}px`,
          height: ` ${130 + micLevel}px`,
          maxWidth: 200,
          maxHeight: 200,
        }}
        position={'absolute'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        border={'15px solid'}
        borderColor={'green.100'}
      ></Stack>

      <Stack position={'absolute'} zIndex={3}>
        {children}
      </Stack>
      <Stack
        borderRadius={{ xs: '10px', md: '50%' }}
        className={micLevel > 2 ? blinkLayer : ''}
        border={'1px solid'}
        borderColor={'green.300'}
        position={'absolute'}
        zIndex={2}
        bgcolor={'var(--neutral-1)'}
      ></Stack>
      <style>{`
      .blink-layer{
        animation: blinkLayer 2s infinite;
      }
      @keyframes blinkLayer {
       0%{width: 50px; height: 50px; opacity:1;}
       70%{opacity:0.5;}
        100%{width: 200px; height: 200px; opacity:0;} 
      }`}</style>
    </Stack>
  );
}

export default MicLevelLottie;
