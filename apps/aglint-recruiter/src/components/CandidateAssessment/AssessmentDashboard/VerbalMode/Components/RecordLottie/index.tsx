import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
let stopRecording;
import { useEffect } from 'react';

import { recordLottie } from './record-lottie';
function RecordLottie({ lottieRef, listening }) {
  useEffect(() => {
    if (listening) {
      lottieRef.current.goToAndPlay(0, true);
      setTimeout(() => {
        stopRecording = setInterval(() => {
          lottieRef.current.goToAndPlay(70, true);
        }, 235);
      }, 833);
    } else {
      clearInterval(stopRecording);
      lottieRef.current.goToAndPlay(146, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(0, true);
      }, 650);
    }
  }, [listening]);
  return (
    <Stack height={21} position={'relative'}>
      <Stack left={-18} top={-25} position={'absolute'} width={65}>
        <Lottie
          lottieRef={lottieRef}
          animationData={recordLottie}
          loop={true}
          autoplay={false}
        />
      </Stack>
    </Stack>
  );
}

export default RecordLottie;
